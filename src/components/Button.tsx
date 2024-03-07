import React from "react";
import { useFormStatus } from "react-dom";
import classNames from "classnames";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, className, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={classNames(
        "px-4 py-1 font-light h-10 tracking-wider transition-all rounded",
        {
          "text-white bg-gray-900 hover:bg-gray-800": !pending,
          "text-gray-500 bg-gray-300": pending,
        },
        className
      )}
      disabled={pending}
      {...props}
    >
      {!pending ? label : <Spinner />}
    </button>
  );
};

export default Button;
