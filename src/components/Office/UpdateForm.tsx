"use client";

import { useState } from "react";
import { updateOffice } from "@/lib/actions";
import { validateOfficeData } from "@/lib/validations";
import { Office } from "@/types/offices";
import Button from "@/components/Button";

interface UpdateFormProps {
  office: Office;
}

interface Errors {
  name?: string;
  type?: string;
}

const UpdateForm = ({ office }: UpdateFormProps) => {
  const [errors, setErrors] = useState<Errors>({});

  const clientAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    const { errors: newErrors, isValid } = validateOfficeData(name, type);
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
      <form
        action={clientAction}
        className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
      >
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
        <Button label="Update" />
      </form>
    </div>
  );
};

export default UpdateForm;
