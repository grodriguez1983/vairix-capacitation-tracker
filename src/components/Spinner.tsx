import { HTMLAttributes } from "react";

export const Spinner = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`border-t-transparent border-solid animate-spin rounded-full border-white border-4 h-6 w-6 ${className}`}
    {...props}
  />
);
