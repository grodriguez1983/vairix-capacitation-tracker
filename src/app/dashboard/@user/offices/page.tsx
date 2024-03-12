import Search from "@/components/Search";
import { fetchOffices } from "@/lib/data";
import { OfficesTable } from "@/components/Office/OfficesTable";

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
        <div className="flex mb-1 sm:mb-0">
          <Search placeholder="Search for an office..." />
        </div>
      </div>
      <div className="py-4">
        <OfficesTable data={offices} count={count} />
      </div>
    </div>
  );
};

export default OfficesPage;
