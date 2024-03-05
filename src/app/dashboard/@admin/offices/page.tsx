import Link from "next/link";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { fetchOffices } from "@/lib/data";
import { OfficesTable } from "@/components/Table/OfficesTable";

interface SearchParams {
  q?: string;
  page?: number;
}

const OfficesPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, offices } = await fetchOffices(q, page);

  return (
    <div className="p-6">
      <div>
        <h2 className="text-2xl text-black font-semibold leading-tight">
          Offices
        </h2>
      </div>
      <div className="my-2 flex sm:flex-row flex-col">
        <div className="flex flex-row mb-1 sm:mb-0 w-full justify-between">
          <Search placeholder="Search for an office..." />
          <Link href="/dashboard/offices/add">
            <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">
              Add New
            </button>
          </Link>
        </div>
      </div>
      <div className="py-4">
        <OfficesTable data={offices} count={count} />
      </div>
    </div>
  );
};

export default OfficesPage;
