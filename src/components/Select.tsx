import classNames from "classnames";
import { SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
}

export default function Select({
  label,
  name,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600">{label}</label>
      <select
        name={name}
        {...props}
        className={classNames(
          className,
          "w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
        )}
      >
        {
          // FIXME: options temporary hardcoded
        }
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  );
}
