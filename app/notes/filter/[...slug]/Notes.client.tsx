"use client";

import React, { useState } from "react";
import type { Note, NoteTag } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

interface NotesClientProps {
  initialNotes: Note[];
  totalPages: number;
  currentPage: number;
  activeTag?: NoteTag;
}

export default function FilteredNotesClient({
  initialNotes,
  totalPages,
  currentPage,
  activeTag,
}: NotesClientProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const tagPath = activeTag ? activeTag : "all";
    router.push(`/notes/filter/${tagPath}?page=${page}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        <button
          onClick={() => setModalOpen(true)}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create note +
        </button>
      </div>
      <NoteList notes={initialNotes} />

      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </div>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
