"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ITEMS_PER_PAGE } from "@/lib/constants";

const Pagination = ({ count }: { count: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || "1";
  const params = new URLSearchParams(searchParams);

  const hasPrev = ITEMS_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (parseInt(page) - 1) + ITEMS_PER_PAGE < count;

  const handleChangePage = (type: string) => {
    type === "prev"
      ? params.set("page", String(parseInt(page) - 1))
      : params.set("page", String(parseInt(page) + 1));
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
