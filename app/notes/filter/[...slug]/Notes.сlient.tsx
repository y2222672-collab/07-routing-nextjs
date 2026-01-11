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

  // Логіка перемикання сторінок через URL
  const handlePageChange = (page: number) => {
    const tagPath = activeTag ? activeTag : "all";
    router.push(`/notes/filter/${tagPath}?page=${page}`);
  };

  return (
    <div>
      {/* 1. Рядок пошуку та кнопка створення */}
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

      {/* 2. Список карток */}
      <NoteList notes={initialNotes} />

      {/* 3. Пагінація */}
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </div>

      {/* 4. Модалка для створення (відкривається при кліку на кнопку) */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
