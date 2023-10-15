import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type UserType,
  type ProductType,
  type TransactionDataType,
  type GeographyType,
  type SalesType,
  type AdminType,
  type UserPerformanceType,
  type DashboardDataType,
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query<UserType, string>({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query<Array<ProductType>, void>({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query<Array<UserType>, void>({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query<
      TransactionDataType,
      { page: number; pageSize: number; sort: string; search: string }
    >({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query<Array<GeographyType>, void>({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query<SalesType, void>({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query<Array<AdminType>, void>({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query<UserPerformanceType, string>({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query<DashboardDataType, void>({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
