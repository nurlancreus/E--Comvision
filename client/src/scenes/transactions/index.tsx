import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import {
  DataGrid,
  type GridCellParams,
  type GridSortModel,
  type GridColDef,
} from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "@/state/api";

import Header from "@/components/Header";
import DataGridCustomToolbar from "@/components/DataGridCustomToolbar";
import { type TransactionDataType } from "@/state/types";

type TransactionType = TransactionDataType["transactions"][number];

export default function Transactions() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const theme = useTheme();

  // values to be sent to the backend
  const [sort, setSort] = useState<GridSortModel>();
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort?.[0]),
    search,
  });

  const columns: GridColDef<TransactionType>[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        if (Array.isArray(params.value)) {
          return params.value.length;
        }
        return 0; // Default value if it's not an array
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params: GridCellParams) =>
        `$${+Number(params.value).toFixed(2)}`,
    },
  ];

  const handleSortModelChange = (sortModel: GridSortModel) => {
    // Here you save the data you need from the sort model
    setSort([...sortModel]);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Transactions" subTitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[300]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          columns={columns}
          getRowId={(row: TransactionType) => row._id}
          rows={data?.transactions || []}
          rowCount={data?.total || 0}
          pagination
          paginationMode="server"
          sortingMode="server"
          pageSizeOptions={[20, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={handleSortModelChange}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { setSearch },
          }}
        />
      </Box>
    </Box>
  );
}
