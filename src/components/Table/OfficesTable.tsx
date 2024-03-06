"use client";

import { deleteOffice } from "@/lib/actions";
import { Table } from ".";
import Link from "next/link";
import { Office } from "@/types/offices";
import Pagination from "../Pagination";

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "createdAt",
    label: "Created At",
    render: (date: Date) => date?.toString().slice(4, 16),
  },
  { id: "type", label: "Type" },
  {
    id: "actions",
    label: "Actions",
    render: (id: string) => (
      <div className="flex gap-2 items-center">
        <Link
          href={`/dashboard/offices/${id}`}
          className="font-semibold text-green-900 leading-tight"
        >
          Update
        </Link>

        <form action={deleteOffice}>
          <input type="hidden" name="id" value={id} />
          <button className="font-semibold text-orange-900 leading-tight">
            Delete
          </button>
        </form>
      </div>
    ),
  },
];

export const OfficesTable = ({
  data,
  count,
}: {
  data: Office[];
  count: number;
}) => {
  return (
    <Table
      columns={columns}
      data={data.map((office) => ({ ...office, actions: office.id }))}
      keyField="id"
      pagination={<Pagination count={count} />}
    />
  );
};
