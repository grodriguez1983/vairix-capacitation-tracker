import { signOut } from "next-auth/react";
import { Modal } from "./Modal";

export const LogoutModal = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => (
  <Modal isOpen={isOpen} onClose={onClose} className="flex flex-col gap-4">
    <h1 className="font-semibold text-xl">Are you sure?</h1>
    <div className="flex flex-row gap-4">
      <button
        className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-md transition-colors"
        onClick={() => {
          signOut();
          onClose();
        }}
      >
        Log out
      </button>
      <button
        className="border-neutral-200 bg-white hover:bg-neutral-100 border-2 px-4 font-white rounded-md transition-colors"
        onClick={() => onClose()}
      >
        Cancel
      </button>
    </div>
  </Modal>
);
