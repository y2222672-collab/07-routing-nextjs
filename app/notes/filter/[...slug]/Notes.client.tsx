"use client";

import React, { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import type { Note, NoteTag } from "@/types/note";
import css from "../../NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface NotesClientProps {
  initialNotes: Note[];
  totalPages: number;
  currentPage: number;
  activeTag?: NoteTag;
}

export default function FilteredNotesClient({
  initialNotes,
  totalPages,
  currentPage: initialPage,
  activeTag,
}: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["notes", page, 12, debouncedSearch, activeTag],
    queryFn: () => fetchNotes(page, 12, debouncedSearch, activeTag),
    placeholderData: keepPreviousData,
    initialData:
      page === initialPage && !debouncedSearch
        ? { notes: initialNotes, totalPages }
        : undefined,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isFetching && !data && (
        <div className={css.loaderContainer}>
          <Loader />
        </div>
      )}

      {isError && (
        <ErrorMessage message="Failed to load notes. Check your connection." />
      )}

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <div className={css.paginationWrapper}>
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
// "use client";

// import React, { useState } from "react";
// import type { Note, NoteTag } from "@/types/note";
// import NoteList from "@/components/NoteList/NoteList";
// import SearchBox from "@/components/SearchBox/SearchBox";
// import Pagination from "@/components/Pagination/Pagination";
// import Modal from "@/components/Modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
// import { useRouter } from "next/navigation";

// interface NotesClientProps {
//   initialNotes: Note[];
//   totalPages: number;
//   currentPage: number;
//   activeTag?: NoteTag;
// }

// export default function FilteredNotesClient({
//   initialNotes,
//   totalPages,
//   currentPage,
//   activeTag,
// }: NotesClientProps) {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   const handlePageChange = (page: number) => {
//     const tagPath = activeTag ? activeTag : "all";
//     router.push(`/notes/filter/${tagPath}?page=${page}`);
//   };

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <SearchBox value={searchQuery} onChange={setSearchQuery} />
//         <button
//           onClick={() => setModalOpen(true)}
//           style={{
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Create note +
//         </button>
//       </div>
//       <NoteList notes={initialNotes} />

//       <div
//         style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
//       >
//         <Pagination
//           totalPages={totalPages}
//           currentPage={currentPage}
//           onChange={handlePageChange}
//         />
//       </div>

//       {isModalOpen && (
//         <Modal onClose={() => setModalOpen(false)}>
//           <NoteForm onCancel={() => setModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
