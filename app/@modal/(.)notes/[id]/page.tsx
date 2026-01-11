import React from "react";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";
import type { Note } from "@/types/note";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: PageProps) {
  const { id } = await params;
  let note: Note | null = null;
  try {
    note = await fetchNoteById(id);
  } catch (error) {
    console.error("Failed to fetch note:", error);
  }

  if (!note) {
    return null;
  }
  return <NotePreviewClient note={note} />;
}
// "use client";

// import { use } from "react";
// import { useRouter } from "next/navigation";
// import Modal from "@/components/Modal/Modal";
// import NotePreview from "@/components/NotePreview/NotePreview";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default function NoteModalPage({ params }: PageProps) {
//   const router = useRouter();

//   const { id } = use(params);

//   return (
//     <Modal onClose={() => router.back()}>
//       <NotePreview id={id} />
//     </Modal>
//   );
// }
