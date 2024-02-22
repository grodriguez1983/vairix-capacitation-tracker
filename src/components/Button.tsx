import classNames from "classnames";
import React from "react";

export default function Button({
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
      )}
    >
      {children}
    </button>
  );
}
