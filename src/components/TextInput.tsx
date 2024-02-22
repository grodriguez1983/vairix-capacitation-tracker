"use client";
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
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
    <div>
      <label className="block text-sm text-gray-600">{label}</label>
      <input
        name={name}
        {...props}
        className={classNames(
          className,
          "w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
        )}
      />
    </div>
  );
}
