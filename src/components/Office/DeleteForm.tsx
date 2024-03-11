import { deleteOffice } from "@/lib/actions";
import SubmitButton from "../SubmitButton";

export const DeleteForm = ({
  onClose,
  id,
  name,
}: {
  onClose: () => void;
  id: string;
  name: string;
}) => {
  return (
    <>
      <h1 className="font-semibold text-xl text-center mb-4 text-black">Delete {name}?</h1>
      <div className="flex flex-row justify-center gap-4">
        <form action={deleteOffice}>
          <input type="hidden" name="id" value={id} />
          <SubmitButton label="Delete" />
        </form>
        <button
          className="border-neutral-200 bg-white hover:bg-neutral-100 border-2 px-4 py-1 flex items-center text-black rounded-md transition-colors h-10"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
