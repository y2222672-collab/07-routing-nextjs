import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import FilteredNotesClient from "./Notes.client";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: PageProps) {
  const { slug } = await params;
  const tagFromUrl = slug[0];

  const activeTag = (tagFromUrl === "all" ? undefined : tagFromUrl) as
    | NoteTag
    | undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, activeTag, ""],
    queryFn: () => fetchNotes({ page: 1, tag: activeTag, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main style={{ padding: "0 20px" }}>
        <h1 style={{ fontSize: "24px", margin: "20px 0" }}>
          Notes: {tagFromUrl === "all" ? "All" : tagFromUrl}
        </h1>

        <FilteredNotesClient activeTag={activeTag} />
      </main>
    </HydrationBoundary>
  );
}
// import React from "react";
// import { fetchNotes } from "@/lib/api";
// import type { NoteTag } from "@/types/note";
// import FilteredNotesClient from "./Notes.client";

// interface PageProps {
//   params: Promise<{ slug: string[] }>;
// }

// export default async function FilterPage({ params }: PageProps) {
//   const { slug } = await params;
//   const tagFromUrl = slug[0];
//   const filterTag = (tagFromUrl === "all" ? undefined : tagFromUrl) as
//     | NoteTag
//     | undefined;

//   let data;
//   let errorOccurred = false;
//   try {
//     data = await fetchNotes(1, 12, "", filterTag);
//   } catch (err) {
//     console.error("Помилка завантаження:", err);
//     errorOccurred = true;
//   }
//   if (errorOccurred || !data) {
//     return <div>Помилка завантаження нотаток.</div>;
//   }
//   return (
//     <main style={{ padding: "0 20px" }}>
//       <h1 style={{ fontSize: "24px", margin: "20px 0" }}>
//         Notes: {tagFromUrl === "all" ? "All" : tagFromUrl}
//       </h1>

//       <FilteredNotesClient
//         initialNotes={data.notes}
//         totalPages={data.totalPages}
//         currentPage={1}
//         activeTag={filterTag}
//       />
//     </main>
//   );
// }
