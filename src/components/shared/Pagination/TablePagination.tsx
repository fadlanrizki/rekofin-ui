import { Pagination } from "@mui/material";
import React from "react";

type TablePaginationType = {
  limit: number;
  total: number;
  onChange:
    | ((event: React.ChangeEvent<unknown>, page: number) => void)
    | undefined;
  list: any[] | null;
};

const TablePagination = ({
  total,
  limit,
  onChange,
  list,
}: TablePaginationType) => {
  const count = Math.ceil(total / limit);
  const listItem = Array.isArray(list) ? list.length : 0;
  return (
    <div className="w-full flex justify-between">
      <p className="text-gray-400">
        {`Menampilkan ${listItem} dari ${total} Data.`}
      </p>
      <Pagination count={count} color="primary" onChange={onChange} />
    </div>
  );
};

export default TablePagination;
