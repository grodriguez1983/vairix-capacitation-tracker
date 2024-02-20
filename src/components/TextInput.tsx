"use client";
import { Label, TextField, Input } from "react-aria-components";
import classNames from "classnames";

import type { InputProps } from "react-aria-components";

export interface TextInputProps extends InputProps {
  label: string;
  name: string;
}

export default function TextInput({
  label,
  name,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <TextField name={name}>
      <Label className="block font-medium text-sm text-gray-700">{label}</Label>
      <Input
        {...props}
        className={classNames(
          className,
          "w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
        )}
      />
    </TextField>
  );
}
