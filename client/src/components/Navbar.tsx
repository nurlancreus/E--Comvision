import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import profileImage from "@/assets/profile.jpeg";
import { FlexBetween } from "./FlexBetween";
import { setMode } from "@/state";
import { type UserType } from "@/state/types";

type NavbarProps = {
  user: UserType;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ user, setIsSidebarOpen }: NavbarProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget instanceof HTMLElement) {
      setAnchorEl(e.currentTarget);
    }
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen((prev) => !prev)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            sx={{
              backgroundColor: `${theme.palette.background.alt}`,
            }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          {/* Account */}
          {isNonMobile && (
            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
