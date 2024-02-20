"use client";
import { Button as AreaButton } from "react-aria-components";
import classNames from "classnames";

import type { ButtonProps } from "react-aria-components";

export default function Button({
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <AreaButton
      {...props}
      className={classNames(
        className,
        "ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'"
      )}
    >
      {children}
    </AreaButton>
  );
}
