"use client";

import { useState } from "react";
import { addOffice } from "@/lib/actions";
import { validateOfficeData } from "@/lib/validations";
import { Modal } from "../Modal";
import Button from "../Button";

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
      <form action={clientAction} className="max-w-xl bg-white rounded">
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleInputChange}
            required
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Type</label>
          <select
            className="w-full px-4 py-1 text-gray-700 bg-gray-200 rounded h-10"
            name="type"
            id="type"
            onChange={handleInputChange}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
        </div>
        <div className="flex mt-4 gap-4 justify-center">
          <button
            className="border-neutral-200 bg-white hover:bg-neutral-100 border-2 px-4 py-1 flex items-center font-white rounded-md transition-colors h-10"
            onClick={onClose}
          >
            Cancel
          </button>
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};
