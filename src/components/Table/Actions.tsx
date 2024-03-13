"use client";
import { useState } from "react";
import { Modal } from "../Modal";

type Form = (props: { onClose: () => void }) => JSX.Element;

interface ActionsProps {
  UpdateForm: Form;
  DeleteForm: Form;
}

export const Actions = ({ UpdateForm, DeleteForm }: ActionsProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const DeleteModal = () => (
    <Modal
      isOpen={deleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
      className="min-w-[300px] min-h-[150px]"
    >
      <DeleteForm onClose={() => setDeleteModalOpen(false)} />
    </Modal>
  );

  const UpdateModal = () => (
    <Modal
      isOpen={updateModalOpen}
      onClose={() => setUpdateModalOpen(false)}
      className="min-w-[300px] min-h-[150px]"
    >
      <UpdateForm onClose={() => setUpdateModalOpen(false)} />
    </Modal>
  );

  return (
    <div
      className="flex gap-2 items-center"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className="font-semibold text-green-900 leading-tight"
        onClick={() => setUpdateModalOpen(true)}
      >
        Update
      </button>

      <button
        className="font-semibold text-orange-900 leading-tight"
        onClick={() => setDeleteModalOpen(true)}
      >
        Delete
      </button>

      <DeleteModal />
      <UpdateModal />
    </div>
  );
};
