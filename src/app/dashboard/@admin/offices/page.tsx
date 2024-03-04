import Link from "next/link";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { fetchOffices } from "@/lib/data";
import { deleteOffice } from "@/lib/actions";

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
    <div className="p-4">
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
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="w-1/4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="w-1/4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created At
                </th>
                <th className="w-1/4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="w-1/4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {offices.map((office: any) => (
                <tr key={office.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">
                    {office.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">
                    {office.createdAt?.toString().slice(4, 16)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">
                    {office.type}
                  </td>
                  <td className="flex justify-start gap-2 px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">
                    <span>
                      <Link href={`/dashboard/offices/${office.id}`}>
                        <button className="font-semibold text-green-900 leading-tight">
                          Update
                        </button>
                      </Link>
                    </span>
                    <span>
                      <form action={deleteOffice}>
                        <input type="hidden" name="id" value={office.id} />
                        <button className="font-semibold text-orange-900 leading-tight">
                          Delete
                        </button>
                      </form>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination count={count} />
        </div>
      </div>
    </div>
  );
};

export default OfficesPage;
