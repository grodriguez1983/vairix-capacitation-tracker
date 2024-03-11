"use client";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const Pagination = ({ count }: { count: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page") || "1");
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count;

  // useEffect to handle whenever the user is on an invalid page
  useEffect(() => {
    if (!count) return;

    if (page <= 0) {
      params.set("page", "1");
      replace(`${pathname}?${params}`);
    }

    const lastAvailablePage = Math.ceil(count / ITEMS_PER_PAGE);

    if (page > lastAvailablePage) {
      params.set("page", String(lastAvailablePage));
      replace(`${pathname}?${params}`);
    }
  }, [count, page, params, pathname, replace]);

  const handleChangePage = (type: string) => {
    type === "prev"
      ? params.set("page", String(page - 1))
      : params.set("page", String(page + 1));
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
      <div className="inline-flex mt-2 xs:mt-0 gap-2">
        <button
          className={`${
            !hasPrev ? "bg-gray-100" : "bg-gray-300 hover:bg-gray-400 "
          } text-sm text-gray-800 font-semibold py-2 px-4 rounded-md`}
          disabled={!hasPrev}
          onClick={() => handleChangePage("prev")}
        >
          Prev
        </button>
        <button
          className={`${
            !hasNext ? "bg-gray-100" : "bg-gray-300 hover:bg-gray-400 "
          } text-sm text-gray-800 font-semibold py-2 px-4 rounded-md`}
          disabled={!hasNext}
          onClick={() => handleChangePage("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
