"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";

const NotesClient = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["notes", page, 12, debouncedSearch],
    queryFn: () => fetchNotes(page, 12, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      {" "}
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
        <ErrorMessage message="Failed to load notes. Check your internet connection." />
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
};

export default NotesClient;
