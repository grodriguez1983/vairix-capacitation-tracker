import { fetchUsers } from "@/services/user";
import Search from "@/components/Search";
import { UsersTable } from "@/components/User/UsersTable";

interface SearchParams {
  q?: string;
  page?: number;
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, users } = await fetchUsers(q, page);

  return (
    <div className="p-6">
      <div>
        <h2 className="text-2xl text-black font-semibold leading-tight">
          Users
        </h2>
      </div>
      <div className="my-2 flex sm:flex-row flex-col">
        <div className="flex flex-row mb-1 sm:mb-0 w-full justify-between">
          <Search placeholder="Search for an office..." />
        </div>
      </div>
      <div className="py-4">
        <UsersTable count={count} data={users || []} />
      </div>
    </div>
  );
}
