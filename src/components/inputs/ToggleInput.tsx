import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

interface ToggleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const ToggleInput = ({
  label,
  error,
  className = "",
  required = true,
  ...props
}: ToggleInputProps) => {
  return (
    <div className="mb-4">
      <label className="flex items-center cursor-pointer w-fit">
        <div className="mr-3 text-gray-700 font-medium">{label}</div>

        <div className="relative">
          <input
            type="checkbox"
            className={classNames("sr-only peer", className)}
            required={required}
            {...props}
          />
          <div className="block bg-gray-300 transition-colors w-14 h-8 rounded-full peer-checked:bg-blue-600" />
          <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ease-in-out duration-200 peer-checked:translate-x-full peer-checked:bg-white" />
        </div>
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default ToggleInput;
