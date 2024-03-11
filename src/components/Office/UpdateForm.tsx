"use client";

import { useState } from "react";
import { updateOffice } from "@/lib/actions";
import { validateUpdateOfficeData } from "@/lib/validations";
import { Office } from "@/types/offices";
import Button from "@/components/Button";

interface UpdateFormProps {
  office: Office;
  onClose: () => void;
}

interface Errors {
  name?: string;
  type?: string;
}

export const UpdateForm = ({ office, onClose }: UpdateFormProps) => {
  const [errors, setErrors] = useState<Errors>({});

  const clientAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    const { errors: newErrors, isValid } = validateUpdateOfficeData(name, type);
    setErrors(newErrors);

    if (!isValid) return;

    await updateOffice(formData);
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
      <form action={clientAction} className="max-w-xl bg-white rounded flex flex-col gap-1">
        <input type="hidden" name="id" value={office.id} />
        <div className="mb-4">
          <label className="block text-sm  mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder={office.name}
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Type</label>
          <select
            name="type"
            id="type"
            className="w-full px-4 py-1 text-gray-700 bg-gray-200 rounded h-10"
            onChange={handleInputChange}
          >
            <option selected={office.type === "small"} value="small">
              Small
            </option>
            <option selected={office.type === "medium"} value="medium">
              Medium
            </option>
            <option selected={office.type === "large"} value="large">
              Large
            </option>
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
          <Button label="Update" />
        </div>
      </form>
    </div>
  );
};
