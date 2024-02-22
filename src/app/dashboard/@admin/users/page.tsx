import { getUsers } from "@/app/dashboard/@admin/actions";
import UserTable from "@/components/UserTable";

export default async function Users({
  searchParams: { page = 1 },
}: {
  searchParams: { page: number };
}) {
  const users = await getUsers(page);
  return <UserTable users={users} />;
}
