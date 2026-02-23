import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams?: { id?: string };
};

export default function LegacyProjectDetailsRedirect({ params, searchParams }: Props) {
  const slug = encodeURIComponent(params.slug);
  const id = (searchParams?.id || "").trim();
  const query = id ? `slug=${slug}&id=${encodeURIComponent(id)}` : `slug=${slug}`;
  redirect(`/projekat?${query}`);
}
