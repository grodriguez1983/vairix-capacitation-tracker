import classNames from "classnames";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames(className, "p-10 bg-white rounded shadow-xl")}>
      {children}
    </div>
  );
}
