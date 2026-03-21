'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import type { Order, Project } from "@/lib/api";
import { getProjects } from "@/lib/api";
import { getProjectHref } from "@/lib/project-links";
import {
  ApiError,
  adminCreateProject,
  adminDeleteOrder,
  adminDeleteProject,
  adminGetProject,
  adminListOrders,
  adminListProjects,
  adminLogin,
  adminLogout,
  adminUpdateOrderStatus,
  adminUpdateProject,
  deleteGalleryImage,
  uploadGalleryImage,
  uploadHeroImage,
} from "@/lib/admin-client";

type Section = "projects" | "orders";
type ViewState = "loading" | "login" | "ready";
type ProjectPhase = "realizovani" | "u_realizaciji" | "planirani";
type SaveState = "idle" | "saving" | "saved" | "error";

type AdminPanelProps = {
  defaultSection?: Section;
  showSectionSwitcher?: boolean;
};

const projectStatusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Objavljeno" },
];

const projectPhaseOptions: { value: ProjectPhase; label: string }[] = [
  { value: "realizovani", label: "Realizovani projekti" },
  { value: "u_realizaciji", label: "Projekti u realizaciji" },
  { value: "planirani", label: "Planirani projekti" },
];

function normalizeTags(input: Project["tags"]): Record<string, unknown> {
  if (input && typeof input === "object" && !Array.isArray(input)) {
    return { ...(input as Record<string, unknown>) };
  }
  if (Array.isArray(input)) {
    return { values: input };
  }
  return {};
}

function getProjectPhase(tags: Project["tags"]): ProjectPhase {
  const fallback: ProjectPhase = "realizovani";
  if (!tags) return fallback;
  if (Array.isArray(tags)) {
    if (tags.includes("u_realizaciji")) return "u_realizaciji";
    if (tags.includes("planirani")) return "planirani";
    if (tags.includes("realizovani")) return "realizovani";
    return fallback;
  }
  const value = (tags as Record<string, unknown>).phase;
  if (
    value === "realizovani" ||
    value === "u_realizaciji" ||
    value === "planirani"
  ) {
    return value;
  }
  return fallback;
}

function tagsWithPhase(tags: Project["tags"], phase: ProjectPhase): Record<string, unknown> {
  const next = normalizeTags(tags);
  next.phase = phase;
  return next;
}

function isGroupCover(tags: Project["tags"]): boolean {
  if (!tags) return false;
  if (Array.isArray(tags)) {
    return tags.includes("group_cover");
  }
  return (tags as Record<string, unknown>).group_cover === true;
}

function tagsWithGroupCover(tags: Project["tags"], value: boolean): Record<string, unknown> {
  const next = normalizeTags(tags);
  if (value) {
    next.group_cover = true;
  } else {
    delete next.group_cover;
  }
  return next;
}

const orderStatusOptions: { value: Order["status"]; label: string }[] = [
  { value: "new", label: "Nova" },
  { value: "in_progress", label: "U obradi" },
  { value: "done", label: "Zatvorena" },
];

export default function AdminPanel({
  defaultSection = "projects",
  showSectionSwitcher = true,
}: AdminPanelProps) {
  const [view, setView] = useState<ViewState>("loading");
  const [section, setSection] = useState<Section>(defaultSection);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [loginEmail, setLoginEmail] = useState("admin@hidromontjovancic.rs");
  const [loginPassword, setLoginPassword] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectDetails, setProjectDetails] = useState<Record<number, Project>>({});
  const [projectDrafts, setProjectDrafts] = useState<Record<number, Partial<Project>>>({});
  const [projectSaveState, setProjectSaveState] = useState<Record<number, SaveState>>({});
  const [uploadingProject, setUploadingProject] = useState<number | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    status: "published",
    phase: "realizovani" as ProjectPhase,
    groupCover: false,
  });
  const [newHero, setNewHero] = useState<File | null>(null);
  const [newGallery, setNewGallery] = useState<File[]>([]);
  const [createState, setCreateState] = useState<SaveState>("idle");

  const createFormRef = useRef<HTMLFormElement | null>(null);
  const projectListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void refreshProjects();
  }, []);

  useEffect(() => {
    if (view === "ready" && section === "orders") {
      void refreshOrders();
    }
  }, [view, section]);

  const mergedProjects = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        ...(projectDetails[project.id] || {}),
      })),
    [projects, projectDetails]
  );

  async function refreshProjects() {
    setBusy(true);
    setMessage(null);
    try {
      const response = await adminListProjects("all");
      setProjects(response.data);
      setView("ready");
      await hydrateProjects(response.data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        try {
          const publicProjects = await getProjects(50, 0);
          setProjects(publicProjects.data);
        } catch {
          setProjects([]);
        }
        setView("login");
      } else {
        setMessage("Neuspesno ucitavanje projekata.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function hydrateProjects(list: Project[]) {
    const details = await Promise.all(
      list.map(async (project) => {
        try {
          return await adminGetProject(project.id);
        } catch {
          return null;
        }
      })
    );

    setProjectDetails((prev) => {
      const next = { ...prev };
      for (const detail of details) {
        if (detail) next[detail.id] = detail;
      }
      return next;
    });
  }

  async function refreshProjectDetail(id: number) {
    try {
      const detail = await adminGetProject(id);
      setProjectDetails((prev) => ({ ...prev, [id]: detail }));
    } catch {
      // ignore
    }
  }

  async function refreshOrders() {
    setOrdersLoading(true);
    try {
      const response = await adminListOrders("all");
      setOrders(response.data);
    } catch {
      setMessage("Neuspesno ucitavanje upita.");
    } finally {
      setOrdersLoading(false);
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    try {
      await adminLogin(loginEmail, loginPassword);
      setLoginPassword("");
      await refreshProjects();
      setSection(defaultSection);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setMessage("Pogresan email ili lozinka.");
      } else {
        setMessage("Greska pri prijavi.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    setMessage(null);
    try {
      await adminLogout();
      setView("login");
      setProjectDrafts({});
      setOrders([]);
      setMessage("Odjava uspesna.");
    } catch {
      setMessage("Neuspesna odjava.");
    } finally {
      setBusy(false);
    }
  }

  async function handleCreateProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newProject.title.trim()) {
      setMessage("Naslov je obavezan.");
      setCreateState("error");
      return;
    }

    setBusy(true);
    setMessage(null);
    setCreateState("saving");

    try {
      const created = await adminCreateProject({
        title: newProject.title,
        slug: newProject.slug || undefined,
        excerpt: newProject.excerpt,
        body: newProject.body,
        status: newProject.status,
        tags: tagsWithGroupCover(tagsWithPhase(null, newProject.phase), newProject.groupCover),
      });

      if (newHero) {
        await uploadHeroImage(created.id, newHero);
      }

      for (const file of newGallery) {
        await uploadGalleryImage(created.id, file);
      }

      setNewProject({
        title: "",
        slug: "",
        excerpt: "",
        body: "",
        status: "published",
        phase: "realizovani",
        groupCover: false,
      });
      setNewHero(null);
      setNewGallery([]);

      await refreshProjects();
      setMessage("Projekat je uspesno dodat.");
      setCreateState("saved");
      window.setTimeout(() => setCreateState("idle"), 2000);
    } catch (error) {
      if (error instanceof ApiError) {
        const bodyError =
          typeof error.body === "string" ? error.body : (error.body as { error?: string } | undefined)?.error;
        setMessage(bodyError ? `Greska: ${bodyError}` : "Neuspesno dodavanje projekta.");
      } else {
        setMessage("Neuspesno dodavanje projekta.");
      }
      setCreateState("error");
    } finally {
      setBusy(false);
    }
  }

  async function handleSaveProject(id: number) {
    const draft = projectDrafts[id];
    if (!draft) {
      setMessage("Nema izmena za cuvanje.");
      return;
    }

    setBusy(true);
    setMessage(null);
    setProjectSaveState((prev) => ({ ...prev, [id]: "saving" }));
    try {
      await adminUpdateProject(id, draft);
      setProjectDrafts((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      await refreshProjectDetail(id);
      await refreshProjects();
      setMessage("Projekat je sacuvan.");
      setProjectSaveState((prev) => ({ ...prev, [id]: "saved" }));
      window.setTimeout(() => {
        setProjectSaveState((prev) => ({ ...prev, [id]: "idle" }));
      }, 2200);
    } catch (error) {
      if (error instanceof ApiError) {
        const bodyError =
          typeof error.body === "string" ? error.body : (error.body as { error?: string } | undefined)?.error;
        setMessage(bodyError ? `Greska: ${bodyError}` : "Neuspesno cuvanje projekta.");
      } else {
        setMessage("Neuspesno cuvanje projekta.");
      }
      setProjectSaveState((prev) => ({ ...prev, [id]: "error" }));
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteProject(project: Project) {
    if (!confirm(`Obrisati projekat \"${project.title}\"?`)) return;
    setBusy(true);
    setMessage(null);
    try {
      await adminDeleteProject(project.id);
      await refreshProjects();
      setMessage("Projekat je obrisan.");
    } catch {
      setMessage("Neuspesno brisanje projekta.");
    } finally {
      setBusy(false);
    }
  }

  function changeProjectDraft(id: number, field: keyof Project, value: string) {
    setProjectDrafts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  }

  function changeProjectPhaseDraft(id: number, phase: ProjectPhase) {
    setProjectDrafts((prev) => {
      const base = projectDetails[id] || projects.find((item) => item.id === id);
      const currentTags = (prev[id]?.tags as Project["tags"]) ?? base?.tags ?? null;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          tags: tagsWithPhase(currentTags, phase),
        },
      };
    });
  }

  function changeProjectGroupCoverDraft(id: number, value: boolean) {
    setProjectDrafts((prev) => {
      const base = projectDetails[id] || projects.find((item) => item.id === id);
      const currentTags = (prev[id]?.tags as Project["tags"]) ?? base?.tags ?? null;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          tags: tagsWithGroupCover(currentTags, value),
        },
      };
    });
  }

  async function handleProjectHeroUpload(id: number, files: FileList | null) {
    if (!files?.length) return;
    setUploadingProject(id);
    setMessage(null);
    try {
      await uploadHeroImage(id, files[0]);
      await refreshProjectDetail(id);
      await refreshProjects();
      setMessage("Hero slika je sacuvana.");
    } catch {
      setMessage("Neuspesno slanje hero slike.");
    } finally {
      setUploadingProject(null);
    }
  }

  async function handleProjectGalleryUpload(id: number, files: FileList | null) {
    if (!files?.length) return;
    setUploadingProject(id);
    setMessage(null);
    try {
      for (const file of Array.from(files)) {
        await uploadGalleryImage(id, file);
      }
      await refreshProjectDetail(id);
      setMessage("Galerija je sacuvana.");
    } catch {
      setMessage("Neuspesno slanje galerije.");
    } finally {
      setUploadingProject(null);
    }
  }

  async function handleDeleteProjectImage(projectId: number, mediaId?: number) {
    if (!mediaId) return;
    if (!confirm("Obrisati sliku iz galerije?")) return;
    setUploadingProject(projectId);
    setMessage(null);
    try {
      await deleteGalleryImage(projectId, mediaId);
      await refreshProjectDetail(projectId);
      setMessage("Slika je obrisana.");
    } catch {
      setMessage("Neuspesno brisanje slike.");
    } finally {
      setUploadingProject(null);
    }
  }

  async function handleOrderStatus(order: Order, status: Order["status"]) {
    if (order.status === status) return;
    setOrdersLoading(true);
    setMessage(null);
    try {
      const updated = await adminUpdateOrderStatus(order.id, status);
      setOrders((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch {
      setMessage("Neuspesna promena statusa upita.");
    } finally {
      setOrdersLoading(false);
    }
  }

  async function handleDeleteOrder(order: Order) {
    if (!confirm(`Obrisati upit korisnika \"${order.name}\"?`)) return;
    setOrdersLoading(true);
    setMessage(null);
    try {
      await adminDeleteOrder(order.id);
      setOrders((prev) => prev.filter((item) => item.id !== order.id));
      setMessage("Upit je obrisan.");
    } catch {
      setMessage("Neuspesno brisanje upita.");
    } finally {
      setOrdersLoading(false);
    }
  }

  const isReady = view === "ready";

  return (
    <div className="space-y-6">
      {message && (
        <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-gray-700">
          {message}
        </div>
      )}

      {view === "loading" && <p className="text-sm text-gray-600">Ucitavanje...</p>}

      {view === "login" && (
        <form onSubmit={handleLogin} className="grid gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-dark">Admin prijava</h2>
          <label className="grid gap-1 text-sm">
            Email
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="rounded-lg border border-black/10 px-3 py-2"
              required
            />
          </label>
          <label className="grid gap-1 text-sm">
            Lozinka
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="rounded-lg border border-black/10 px-3 py-2"
              required
            />
          </label>
          <button type="submit" disabled={busy} className="w-fit rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white">
            {busy ? "Prijava..." : "Prijavi se"}
          </button>
        </form>
      )}

      {isReady && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            {showSectionSwitcher && (
              <>
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${section === "projects" ? "bg-primary text-white" : "bg-white border border-black/10"}`}
                  onClick={() => setSection("projects")}
                >
                  Projekti
                </button>
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${section === "orders" ? "bg-primary text-white" : "bg-white border border-black/10"}`}
                  onClick={() => setSection("orders")}
                >
                  Upiti
                </button>
              </>
            )}
            <button
              type="button"
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold"
              onClick={handleLogout}
              disabled={busy}
            >
              Odjavi se
            </button>
          </div>

          {section === "projects" && (
            <section className="space-y-6">
              <div className="sticky top-[70px] z-10 flex flex-wrap gap-2 rounded-2xl border border-black/5 bg-white/95 p-3 backdrop-blur">
                <button
                  type="button"
                  onClick={() => createFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="rounded-full bg-dark px-4 py-2 text-sm font-semibold text-white"
                >
                  + Dodaj projekat
                </button>
                <button
                  type="button"
                  onClick={() => projectListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-dark"
                >
                  Lista projekata ({mergedProjects.length})
                </button>
                {createState === "saved" && (
                  <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700">
                    Projekat je uspesno dodat
                  </span>
                )}
              </div>

              <form
                ref={createFormRef}
                onSubmit={handleCreateProject}
                className="grid gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-dark">Dodaj novi projekat</h3>
                  <span className="text-xs font-semibold text-gray-500">Obavezno polje: Naslov</span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    placeholder="Naslov*"
                    value={newProject.title}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                    className="rounded-lg border border-black/10 px-3 py-2"
                    required
                  />
                  <input
                    placeholder="Slug (opciono)"
                    value={newProject.slug}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, slug: e.target.value }))}
                    className="rounded-lg border border-black/10 px-3 py-2"
                  />
                </div>

                <textarea
                  placeholder="Kratak opis"
                  value={newProject.excerpt}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="min-h-[80px] rounded-lg border border-black/10 px-3 py-2"
                />
                <textarea
                  placeholder="Tekst projekta"
                  value={newProject.body}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, body: e.target.value }))}
                  className="min-h-[140px] rounded-lg border border-black/10 px-3 py-2"
                />

                <div className="grid gap-3 md:grid-cols-2">
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, status: e.target.value }))}
                    className="rounded-lg border border-black/10 px-3 py-2"
                  >
                    {projectStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={newProject.phase}
                    onChange={(e) =>
                      setNewProject((prev) => ({ ...prev, phase: e.target.value as ProjectPhase }))
                    }
                    className="rounded-lg border border-black/10 px-3 py-2"
                  >
                    {projectPhaseOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={newProject.groupCover}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, groupCover: e.target.checked }))}
                  />
                  Koristi hero sliku kao naslovnu za grupu
                </label>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-black/20 bg-gray-50 px-4 py-3 text-sm font-semibold text-dark transition hover:border-primary/60 hover:bg-white">
                    <span>{newHero ? `Hero: ${newHero.name}` : "Izaberi hero sliku"}</span>
                    <span className="rounded-full bg-dark px-3 py-1 text-xs text-white">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewHero(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-black/20 bg-gray-50 px-4 py-3 text-sm font-semibold text-dark transition hover:border-primary/60 hover:bg-white">
                    <span>{newGallery.length ? `Galerija: ${newGallery.length} slika` : "Izaberi galeriju slika"}</span>
                    <span className="rounded-full bg-dark px-3 py-1 text-xs text-white">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setNewGallery(Array.from(e.target.files || []))}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={busy}
                    className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white"
                  >
                    {createState === "saving" ? "Cuvanje..." : "Dodaj projekat"}
                  </button>
                  {createState === "error" && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      Nije sacuvano
                    </span>
                  )}
                </div>
              </form>

              <div ref={projectListRef} className="grid gap-4">
                {mergedProjects.map((project) => {
                  const value = projectDrafts[project.id] || {};
                  const live = { ...project, ...value };
                  const phase = getProjectPhase(live.tags);
                  const groupCover = isGroupCover(live.tags);
                  const saveState = projectSaveState[project.id] || "idle";
                  const hasDraftChanges = Boolean(projectDrafts[project.id]);

                  return (
                    <article key={project.id} className="grid gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="space-y-1">
                          <h4 className="text-lg font-semibold text-dark">{project.title}</h4>
                          <p className="text-xs text-gray-500">ID: {project.id}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {projectPhaseOptions.find((option) => option.value === phase)?.label}
                          </span>
                          {saveState === "saving" && (
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                              Cuvanje...
                            </span>
                          )}
                          {saveState === "saved" && (
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                              Sacuvano
                            </span>
                          )}
                          {saveState === "error" && (
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                              Greska pri cuvanju
                            </span>
                          )}
                          {hasDraftChanges && saveState !== "saving" && (
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                              Nesacuvane izmene
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          value={String(live.title || "")}
                          onChange={(e) => changeProjectDraft(project.id, "title", e.target.value)}
                          className="rounded-lg border border-black/10 px-3 py-2"
                        />
                        <input
                          value={String(live.slug || "")}
                          onChange={(e) => changeProjectDraft(project.id, "slug", e.target.value)}
                          className="rounded-lg border border-black/10 px-3 py-2"
                        />
                      </div>
                      <textarea
                        value={String(live.excerpt || "")}
                        onChange={(e) => changeProjectDraft(project.id, "excerpt", e.target.value)}
                        className="min-h-[80px] rounded-lg border border-black/10 px-3 py-2"
                      />
                      <textarea
                        value={String(live.body || "")}
                        onChange={(e) => changeProjectDraft(project.id, "body", e.target.value)}
                        className="min-h-[140px] rounded-lg border border-black/10 px-3 py-2"
                      />
                      <div className="grid gap-3 md:grid-cols-2">
                        <select
                          value={String(live.status || "draft")}
                          onChange={(e) => changeProjectDraft(project.id, "status", e.target.value)}
                          className="rounded-lg border border-black/10 px-3 py-2"
                        >
                          {projectStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <select
                          value={phase}
                          onChange={(e) => changeProjectPhaseDraft(project.id, e.target.value as ProjectPhase)}
                          className="rounded-lg border border-black/10 px-3 py-2"
                        >
                          {projectPhaseOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          checked={groupCover}
                          onChange={(e) => changeProjectGroupCoverDraft(project.id, e.target.checked)}
                        />
                        Koristi hero sliku kao naslovnu za grupu ({phase})
                      </label>

                      {live.hero_image && (
                        <img src={live.hero_image} alt={live.title || "Project hero"} className="h-44 w-full rounded-xl object-cover" />
                      )}

                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-black/20 bg-gray-50 px-4 py-3 text-sm font-semibold text-dark transition hover:border-primary/60 hover:bg-white">
                          <span>{uploadingProject === project.id ? "Upload u toku..." : "Promeni hero sliku"}</span>
                          <span className="rounded-full bg-dark px-3 py-1 text-xs text-white">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => void handleProjectHeroUpload(project.id, e.target.files)}
                            disabled={uploadingProject === project.id}
                            className="hidden"
                          />
                        </label>

                        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-black/20 bg-gray-50 px-4 py-3 text-sm font-semibold text-dark transition hover:border-primary/60 hover:bg-white">
                          <span>{uploadingProject === project.id ? "Upload u toku..." : "Dodaj slike u galeriju"}</span>
                          <span className="rounded-full bg-dark px-3 py-1 text-xs text-white">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => void handleProjectGalleryUpload(project.id, e.target.files)}
                            disabled={uploadingProject === project.id}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {projectDetails[project.id]?.gallery && projectDetails[project.id]?.gallery?.length ? (
                        <div className="grid gap-2 sm:grid-cols-3">
                          {projectDetails[project.id]?.gallery?.map((image) => (
                            <div key={image.id || image.src} className="relative overflow-hidden rounded-xl border border-black/10">
                              <img src={image.src} alt={image.alt || live.title || "Slika"} className="h-24 w-full object-cover" />
                              <button
                                type="button"
                                onClick={() => void handleDeleteProjectImage(project.id, image.id)}
                                className="absolute right-2 top-2 rounded bg-white px-2 py-1 text-xs font-semibold"
                              >
                                Obrisi
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      <div className="flex flex-wrap gap-2">
                        {live.status === "published" ? (
                          <a
                            href={getProjectHref({ id: project.id, slug: live.slug || "" })}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-dark"
                          >
                            Pregled
                          </a>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => void handleSaveProject(project.id)}
                          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                          disabled={busy || !hasDraftChanges || saveState === "saving"}
                        >
                          {saveState === "saving" ? "Cuvanje..." : "Sacuvaj"}
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDeleteProject(project)}
                          className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
                          disabled={busy}
                        >
                          Obrisi projekat
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {section === "orders" && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-dark">Upiti sa sajta</h3>
                <button
                  type="button"
                  onClick={() => void refreshOrders()}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold"
                  disabled={ordersLoading}
                >
                  Osvezi
                </button>
              </div>

              {orders.length === 0 ? (
                <p className="text-sm text-gray-600">Trenutno nema upita.</p>
              ) : (
                <div className="grid gap-3">
                  {orders.map((order) => (
                    <article key={order.id} className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                      <div className="grid gap-2 md:grid-cols-2">
                        <div>
                          <p className="font-semibold text-dark">{order.name}</p>
                          <p className="text-sm text-gray-600">{order.email}</p>
                          {order.phone && <p className="text-sm text-gray-600">{order.phone}</p>}
                          <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleString("sr-RS")}</p>
                        </div>
                        <div>
                          {order.subject && <p className="text-sm text-gray-700">Tema: {order.subject}</p>}
                          {order.concrete_type && <p className="text-sm text-gray-700">Tip: {order.concrete_type}</p>}
                          <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{order.message}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {orderStatusOptions.map((status) => (
                          <button
                            key={status.value}
                            type="button"
                            onClick={() => void handleOrderStatus(order, status.value)}
                            disabled={ordersLoading}
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              order.status === status.value ? "bg-primary text-white" : "border border-black/10 bg-white"
                            }`}
                          >
                            {status.label}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => void handleDeleteOrder(order)}
                          className="rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                          disabled={ordersLoading}
                        >
                          Obrisi
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}
