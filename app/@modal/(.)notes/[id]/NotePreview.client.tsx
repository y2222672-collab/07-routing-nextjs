"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return null;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.previewContainer}>
        {note ? (
          <>
            <h2 className={css.title}>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
            <p className={css.content}>{note.content}</p>
          </>
        ) : (
          <p>Note not found</p>
        )}
      </div>
    </Modal>
  );
}
// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import Modal from "@/components/Modal/Modal";
// import type { Note } from "@/types/note";
// import css from "./NotePreview.module.css";

// interface NotePreviewClientProps {
//   note: Note;
// }

// export default function NotePreviewClient({ note }: NotePreviewClientProps) {
//   const router = useRouter();

//   return (
//     <Modal onClose={() => router.back()}>
//       <div className={css.container}>
//         <div className={css.item}>
//           <header className={css.header}>
//             <h2>{note.title}</h2>
//             <span className={css.tag}>{note.tag}</span>
//           </header>

//           <div className={css.content}>{note.content}</div>

//           <button className={css.backBtn} onClick={() => router.back()}>
//             Close Preview
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }
