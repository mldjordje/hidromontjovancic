import { redirect } from "next/navigation";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
  searchParams?: { id?: string } | Promise<{ id?: string }>;
};

export default async function LegacyProjectDetailsRedirect({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const slug = encodeURIComponent(resolvedParams.slug);
  const id = (resolvedSearchParams?.id || "").trim();
  const query = id ? `slug=${slug}&id=${encodeURIComponent(id)}` : `slug=${slug}`;
  redirect(`/projekat?${query}`);
}
