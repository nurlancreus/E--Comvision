import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { selectUserId } from "@/state";
import { useGetUserQuery } from "@/state/api";
import { type UserType } from "@/state/types";

export default function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector(selectUserId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data ?? ({} as UserType)}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flex={1}>
        <Navbar
          user={data ?? ({} as UserType)}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}
