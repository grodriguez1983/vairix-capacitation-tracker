"use client";

import { Office } from "@/types/offices";
import Pagination from "../Pagination";
import { Actions } from "../Table/Actions";
import { Table } from "../Table";
import { UpdateForm } from "./UpdateForm";
import { DeleteForm } from "./DeleteForm";
import { Spinner } from "../Spinner";
import { useRouter } from "next/navigation";

export const OfficesTable = ({
  data,
  count,
  isAdmin,
}: {
  data: Office[];
  count: number;
  isAdmin?: boolean;
}) => {
  const router = useRouter();

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
    ...(isAdmin
      ? [
          {
            id: "actions",
            label: "Actions",
            render: (office: Office) => {
              return (
                <Actions
                  UpdateForm={({ ...props }) => (
                    <UpdateForm office={office} {...props} />
                  )}
                  DeleteForm={({ ...props }) => (
                    <DeleteForm name={office.name} id={office.id} {...props} />
                  )}
                />
              );
            },
          },
        ]
      : []),
  ];

  return (
    <Table
      emptyMessage={
        count ? (
          <Spinner className="border-gray-600 mt-10 h-10 w-10" />
        ) : undefined
      }
      columns={columns}
      data={data.map((office) => ({
        ...office,
        ...(isAdmin && { actions: office }),
      }))}
      keyField="id"
      pagination={<Pagination count={count} />}
      onRowClick={(item) => {
        router.push(`calendar/${item.id}`);
      }}
      rowStyle={{ cursor: "pointer" }}
    />
  );
};
