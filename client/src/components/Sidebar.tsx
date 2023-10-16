import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import profileImage from "@/assets/profile.jpeg";

import { FlexBetween } from "./FlexBetween";
import { type UserType } from "@/state/types";

type NavItemType = {
  text: string;
  icon: JSX.Element;
};

const navItems: Array<NavItemType> = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

type SidebarProps = {
  user: UserType;
  drawerWidth: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { pathname } = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: `${theme.palette.secondary[200]}`,
              backgroundColor: `${theme.palette.background.alt}`,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    EcomVision
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen((prev) => !prev)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <Box>
              <MenuList
                items={navItems.slice(0, 1)}
                active={active}
                setActive={setActive}
              />
              <MenuList
                title="Client Facing"
                items={navItems.slice(1, 5)}
                active={active}
                setActive={setActive}
              />
              <MenuList
                title="Sales"
                items={navItems.slice(5, 9)}
                active={active}
                setActive={setActive}
              />
              <MenuList
                title="Management"
                items={navItems.slice(-2)}
                active={active}
                setActive={setActive}
              />
            </Box>
          </Box>

          {/* Bottom */}
          {isNonMobile && (
            <Box position="absolute" bottom="2rem">
              <Divider />
              <FlexBetween
                textTransform="none"
                gap="1rem"
                m="1.5rem 2rem 0 3rem"
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                  }}
                />
              </FlexBetween>
            </Box>
          )}
        </Drawer>
      )}
    </Box>
  );
}

// SIDEBAR MENU LIST

type MenuListProps = {
  title?: string;
  items: Array<NavItemType>;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

function MenuList({ items, title, active, setActive }: MenuListProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {title && (
        <Typography component="h4" m="1.5rem 0 0.5rem 3rem">
          {title}
        </Typography>
      )}
      <List>
        {items.map(({ text, icon }) => {
          const lowerCaseText = text.toLowerCase();

          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  paddingLeft: "3rem",
                  backgroundColor:
                    active === lowerCaseText
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    active === lowerCaseText
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                  "&:hover": {
                    backgroundColor:
                      active === lowerCaseText
                        ? theme.palette.secondary[500]
                        : "",
                  },
                }}
                onClick={() => {
                  navigate(`/${lowerCaseText}`);
                  setActive(lowerCaseText);
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      active === lowerCaseText
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[200],
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
                {active === lowerCaseText && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
