"use client";

import React from "react";

interface Column {
  id: string;
  label: string;
  render?: (cellValue: any, row?: any) => React.ReactNode;
}

interface RowData {
  [key: string]: any;
}

interface TableProps {
  data: RowData[];
  columns: Column[];
  keyField: string;
  onRowClick?: (item: any) => void;
  headerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
  emptyMessage?: string | React.ReactNode;
  pagination?: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  data,
  columns,
  keyField,
  onRowClick,
  headerStyle,
  rowStyle,
  pagination,
  emptyMessage = "No data available",
}) => {
  const TableComponent = () => (
    <table className="w-full">
      <thead>
        <tr style={headerStyle}>
          {columns.map((column) => (
            <th
              key={column.id}
              className="w-1/4 whitespace-nowrap px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item[keyField]}
            onClick={() => onRowClick && onRowClick(item)}
            style={rowStyle}
          >
            {columns.map((column) => (
              <td
                key={column.id}
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black"
              >
                {column.render
                  ? column.render(item[column.id], item)
                  : item[column.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="w-full flex flex-col items-center shadow rounded-lg overflow-x-auto">
      {data.length ? <TableComponent /> : <div>{emptyMessage}</div>}
      {pagination}
    </div>
  );
};
