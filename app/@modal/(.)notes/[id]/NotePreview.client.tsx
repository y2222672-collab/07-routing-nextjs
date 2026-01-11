"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  note: Note;
}

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <header className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </header>

          <div className={css.content}>{note.content}</div>

          <button className={css.backBtn} onClick={() => router.back()}>
            Close Preview
          </button>
        </div>
      </div>
    </Modal>
  );
}
// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import Modal from "@/components/Modal/Modal";
// import css from "./NotePreview.module.css";

// interface Note {
//   id: string;
//   title: string;
//   content: string;
//   tag: string;
// }

// interface NotePreviewClientProps {
//   note: Note;
// }

// export default function NotePreviewClient({ note }: NotePreviewClientProps) {
//   const router = useRouter();

//   return (
//     <Modal onClose={() => router.back()}>
//       <div
//         style={{
//           padding: "30px",
//           backgroundColor: "white",
//           borderRadius: "12px",
//           maxWidth: "600px",
//         }}
//       >
//         <h2
//           style={{ fontSize: "24px", fontWeight: "700", marginBottom: "10px" }}
//         >
//           {note.title}
//         </h2>
//         <span
//           style={{
//             display: "inline-block",
//             padding: "4px 12px",
//             backgroundColor: "#f0f0f0",
//             borderRadius: "16px",
//             fontSize: "14px",
//             color: "#666",
//           }}
//         >
//           {note.tag}
//         </span>
//         <div
//           style={{
//             marginTop: "20px",
//             borderTop: "1px solid #eee",
//             paddingTop: "20px",
//           }}
//         >
//           <p
//             style={{ lineHeight: "1.6", color: "#333", whiteSpace: "pre-wrap" }}
//           >
//             {note.content}
//           </p>
//         </div>
//       </div>
//     </Modal>
//   );
// }
