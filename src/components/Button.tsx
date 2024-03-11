"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import classNames from "classnames";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  pending?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  pending,
  className,
  ...props
}) => {
  const { pending: formPending } = useFormStatus();
  const isPending = formPending || pending;

  return (
    <button
      className={classNames(
        "px-4 py-1 font-light h-10 tracking-wider transition-all rounded",
        {
          "text-white bg-gray-900 hover:bg-gray-800": !isPending,
          "text-gray-500 bg-gray-300": isPending,
        },
        className
      )}
      disabled={isPending}
      {...props}
    >
      {!isPending ? label : <Spinner />}
    </button>
  );
};

export default Button;
