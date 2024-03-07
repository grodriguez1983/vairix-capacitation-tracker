"use client";

import { useState } from "react";
import { addOffice } from "@/lib/actions";
import { validateOfficeData } from "@/lib/validations";
import Button from "@/components/Button";

interface Errors {
  name?: string;
  type?: string;
}

const AddOfficePage = () => {
  const [errors, setErrors] = useState<Errors>({});

  const clientAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    const { errors: newErrors, isValid } = validateOfficeData(name, type);
    setErrors(newErrors);

    if (!isValid) return;

    await addOffice(formData);
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
        <Button label="Add" type="submit" />
      </form>
    </div>
  );
};

export default AddOfficePage;
