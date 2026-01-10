"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NoteModalPage({ params }: PageProps) {
  const router = useRouter();

  const { id } = use(params);

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview id={id} />
    </Modal>
  );
}
