import NotesClient from "../../Notes.client";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const activeTag = slug[0] === "all" ? undefined : slug[0];

  return <NotesClient activeTag={activeTag} />;
}
