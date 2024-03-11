import React, { SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

const SelectInput = ({
  label,
  options,
  error,
  className = "",
  ...props
}: SelectInputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1">{label}</label>
      <select
        {...props}
        className={`w-full px-4 py-1 text-gray-700 bg-gray-200 rounded h-10 ${className}`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default SelectInput;
