import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const TextInput = ({
  label,
  error,
  className = "",
  required = true,
  ...props
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm text-black mb-1">{label}</label>
      <input
        {...props}
        className={classNames(
          "w-full px-5 py-1 text-gray-700 bg-gray-200 rounded leading-8",
          className
        )}
        required={required}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextInput;
