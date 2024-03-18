"use client";

import Pagination from "../Pagination";
import { Table } from "../Table";
import { Spinner } from "../Spinner";
import { User } from "@prisma/client";
import { Actions } from "../Table/Actions";
import { UpdateForm } from "./UpdateForm";

export const UsersTable = ({
  data,
  count,
}: {
  data: User[];
  count: number;
}) => {
  const columns = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "createdAt",
      label: "Created At",
      render: (date: Date) => date?.toString().slice(4, 16),
    },
    {
      id: "updatedAt",
      label: "Updated At",
      render: (date: Date) => date?.toString().slice(4, 16),
    },
    { id: "role", label: "Role" },
    {
      id: "isAdmin",
      label: "Admin",
      render: (userAdmin: boolean) => (userAdmin ? "✅" : "➖"),
    },
    {
      id: "actions",
      label: "Actions",
      render: (user: User) => {
        return (
          <Actions
            UpdateForm={(props) => <UpdateForm user={user} {...props} />}
          />
        );
      },
    },
  ];

  return (
    <Table
      emptyMessage={
        count ? (
          <Spinner className="border-gray-600 mt-10 h-10 w-10" />
        ) : undefined
      }
      columns={columns}
      data={data.map((user) => ({
        ...user,
        actions: user,
      }))}
      keyField="id"
      pagination={<Pagination count={count} />}
    />
  );
};
