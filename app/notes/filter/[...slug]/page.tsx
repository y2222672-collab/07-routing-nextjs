import NotesClient from "../../Notes.client";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string[] }>;
}) {
  const resolvedParams = await params;

  const tag = resolvedParams.tag?.[0];
  const activeFilter = tag === "all" ? undefined : tag;

  return (
    <main>
      <NotesClient activeTag={activeFilter} />
    </main>
  );
}
