"use client";

import { useState } from "react";
import { updateUser } from "@/actions/users";
import { validateUpdateUserData } from "@/lib/validations";
import SubmitButton from "@/components/SubmitButton";
import TextInput from "../inputs/TextInput";
import { User } from "@prisma/client";
import ToggleInput from "../inputs/ToggleInput";

interface UpdateFormProps {
  user: User;
  onClose: () => void;
}

interface Errors {
  name?: string;
  email?: string;
}

export const UpdateForm = ({ user, onClose }: UpdateFormProps) => {
  const [errors, setErrors] = useState<Errors>({});
  const [isChecked, setIsChecked] = useState(user.isAdmin);

  const clientAction = async (formData: FormData) => {
    const name = (formData.get("name") as string) || user.name;
    const email = (formData.get("email") as string) || user.email;

    const { errors: newErrors, isValid } = validateUpdateUserData(name, email);
    setErrors(newErrors);

    if (!isValid) return;

    await updateUser(formData);
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
        <input type="hidden" name="id" value={user.id} />
        <TextInput
          label="Name"
          name="name"
          placeholder={user.name}
          type="text"
          onChange={handleInputChange}
          error={errors.name}
          required={false}
        />
        <ToggleInput
          label="Admin"
          name="admin"
          checked={isChecked}
          required={false}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
        <div className="flex mt-4 gap-4 justify-center">
          <SubmitButton label="Update" />
          <button
            className="border-neutral-200 bg-white hover:bg-neutral-100 border-2 px-4 py-1 flex items-center font-white rounded-md transition-colors h-10"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
