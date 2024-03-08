import { HTMLAttributes } from "react";

export const Spinner = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`border-t-transparent border-solid animate-spin rounded-full border-4 ${
      className ? className : "border-white h-6 w-6"
    }`}
    {...props}
  />
);
