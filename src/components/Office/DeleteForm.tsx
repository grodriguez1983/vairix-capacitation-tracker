import { useFormStatus } from "react-dom";
import { Spinner } from "../Spinner";
import { deleteOffice } from "@/lib/actions";

export const DeleteForm = ({
  onClose,
  id,
  name,
}: {
  onClose: () => void;
  id: string;
  name: string;
}) => {
  const DeleteButton = () => {
    const { pending } = useFormStatus();

    return (
      <button
        disabled={pending}
        className={`${
          pending ? "bg-gray-300" : "bg-red-500 hover:bg-red-600"
        } px-4 py-1 h-10 flex items-center text-white rounded-md transition-colors`}
      >
        {pending ? <Spinner /> : "Delete"}
      </button>
    );
  };

  return (
    <>
      <h1 className="font-semibold text-xl mb-4">Delete {name}?</h1>
      <div className="flex flex-row gap-4">
        <form action={deleteOffice}>
          <input type="hidden" name="id" value={id} />
          <DeleteButton />
        </form>
        <button
          className="border-neutral-200 bg-white hover:bg-neutral-100 border-2 px-4 py-1 flex items-center font-white rounded-md transition-colors h-10"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
