"use client";

import { Office, OfficeType } from "@/types/offices";
import Pagination from "../Pagination";
import { Actions } from "../Table/Actions";
import { Table } from "../Table";
import { UpdateForm } from "./UpdateForm";
import { DeleteForm } from "./DeleteForm";

export const OfficesTable = ({
  data,
  count,
}: {
  data: Office[];
  count: number;
}) => {
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
  ];

  return (
    <Table
      columns={columns}
      data={data.map((office) => ({
        ...office,
        actions: office,
      }))}
      keyField="id"
      pagination={<Pagination count={count} />}
    />
  );
};
