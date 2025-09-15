import { Pagination } from "@mui/material";
import React from "react";

type TablePaginationType = {
  limit: number;
  total: number;
  onChange:
    | ((event: React.ChangeEvent<unknown>, page: number) => void)
    | undefined;
};

const TablePagination = ({ total, limit, onChange }: TablePaginationType) => {
  const count = Math.ceil(total / limit);
  return (
    <div>
      <Pagination count={count} color="primary" onChange={onChange} />
    </div>
  );
};

export default TablePagination;
