"use client";

import { useState } from "react";
import { addOffice } from "@/lib/actions";
import { validateOfficeData } from "@/lib/validations";
import { Modal } from "../Modal";
import SubmitButton from "../SubmitButton";
import { OfficeType } from "@/types/offices";
import TextInput from "@/components/inputs/TextInput";
import SelectInput from "@/components/inputs/SelectInput";
import { formatLabel } from "@/lib/helpers";

interface Errors {
  name?: string;
  type?: string;
}

export const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <button
        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Add New
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <AddForm onClose={onClose} />
      </Modal>
    </>
  );
};

const AddForm = ({ onClose }: { onClose: () => void }) => {
  const [errors, setErrors] = useState<Errors>({});

  const clientAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    const { errors: newErrors, isValid } = validateOfficeData(name, type);
    setErrors(newErrors);

    if (!isValid) return;

    await addOffice(formData);

    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  return (
    <div className="leading-loose text-black flex justify-center">
      <form
        action={clientAction}
        className="max-w-xl bg-white rounded flex flex-col gap-1"
      >
        <TextInput
          label="Name"
          name="name"
          placeholder="Name"
          type="text"
          onChange={handleInputChange}
          error={errors.name}
        />
        <SelectInput
          label="Type"
          name="type"
          options={Object.values(OfficeType).map((value) => ({
            value,
            label: formatLabel(value),
          }))}
          onChange={handleInputChange}
          error={errors.type}
        />
        <div className="flex mt-4 gap-4 justify-center">
          <button
            className="border-neutral-200 bg-white hover:bg-neutral-100 border-2 px-4 py-1 flex items-center font-white rounded-md transition-colors h-10"
            onClick={onClose}
          >
            Cancel
          </button>
          <SubmitButton label="Submit" />
        </div>
      </form>
    </div>
  );
};
