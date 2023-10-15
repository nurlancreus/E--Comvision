import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";

import Header from "@/components/Header";

import { selectUserId } from "@/state";
import { useGetUserPerformanceQuery } from "@/state/api";
import { type UserPerformanceType } from "@/state/types";

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector(selectUserId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns: GridColDef<UserPerformanceType["sales"][number]>[] = [
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
        `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Performance"
        subTitle="Track your Affiliate Sales Performance Here"
      />
      <Box
        mt="40px"
        height="75vh"
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
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={data?.sales || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Performance;
