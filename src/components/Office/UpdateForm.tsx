"use client";

import { useState } from "react";
import { updateOffice } from "@/lib/actions";
import { validateUpdateOfficeData } from "@/lib/validations";
import { Office } from "@/types/offices";
import SubmitButton from "@/components/SubmitButton";
import SelectInput from "@/components/inputs/SelectInput";
import { OfficeType } from "@/types/offices";
import { formatLabel } from "@/lib/helpers";
import TextInput from "../inputs/TextInput";

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
      <form
        action={clientAction}
        className="max-w-xl bg-white rounded flex flex-col gap-1"
      >
        <input type="hidden" name="id" value={office.id} />
        <TextInput
          label="Name"
          name="name"
          placeholder={office.name}
          type="text"
          onChange={handleInputChange}
          error={errors.name}
          required={false}
        />
        <SelectInput
          label="Type"
          name="type"
          defaultValue={office.type}
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
            type="button"
          >
            Cancel
          </button>
          <SubmitButton label="Update" />
        </div>
      </form>
    </div>
  );
};
