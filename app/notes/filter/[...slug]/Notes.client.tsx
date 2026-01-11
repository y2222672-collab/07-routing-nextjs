"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import css from "../../NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface NotesClientProps {
  activeTag?: NoteTag;
}

export default function FilteredNotesClient({ activeTag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["notes", page, activeTag, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        tag: activeTag,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
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
        <ErrorMessage message="Failed to load notes. Please try again." />
      )}

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isFetching && <p className={css.empty}>No notes found.</p>
      )}

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
// import { useQuery, keepPreviousData } from "@tanstack/react-query";
// import { useDebounce } from "use-debounce";
// import { fetchNotes } from "@/lib/api";
// import type { Note, NoteTag } from "@/types/note";
// import css from "../../NotesPage.module.css";

// import SearchBox from "@/components/SearchBox/SearchBox";
// import NoteList from "@/components/NoteList/NoteList";
// import Pagination from "@/components/Pagination/Pagination";
// import Modal from "@/components/Modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
// import Loader from "@/components/Loader/Loader";
// import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

// interface NotesClientProps {
//   initialNotes: Note[];
//   totalPages: number;
//   currentPage: number;
//   activeTag?: NoteTag;
// }

// export default function FilteredNotesClient({
//   initialNotes,
//   totalPages,
//   currentPage: initialPage,
//   activeTag,
// }: NotesClientProps) {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(initialPage);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [debouncedSearch] = useDebounce(search, 500);

//   const { data, isFetching, isError } = useQuery({
//     queryKey: ["notes", page, 12, debouncedSearch, activeTag],
//     queryFn: () => fetchNotes(page, 12, debouncedSearch, activeTag),
//     placeholderData: keepPreviousData,
//     initialData:
//       page === initialPage && !debouncedSearch
//         ? { notes: initialNotes, totalPages }
//         : undefined,
//   });

//   const handleSearch = (value: string) => {
//     setSearch(value);
//     setPage(1);
//   };

//   return (
//     <div className={css.container}>
//       <header className={css.toolbar}>
//         <SearchBox value={search} onChange={handleSearch} />
//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>
//       </header>

//       {isFetching && !data && (
//         <div className={css.loaderContainer}>
//           <Loader />
//         </div>
//       )}

//       {isError && (
//         <ErrorMessage message="Failed to load notes. Check your connection." />
//       )}

//       {data && <NoteList notes={data.notes} />}

//       {data && data.totalPages > 1 && (
//         <div className={css.paginationWrapper}>
//           <Pagination
//             totalPages={data.totalPages}
//             currentPage={page}
//             onChange={(newPage) => setPage(newPage)}
//           />
//         </div>
//       )}

//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onCancel={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
