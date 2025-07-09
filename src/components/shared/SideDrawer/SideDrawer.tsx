"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../Logo";
import Link from "next/link";

type DrawerType = {
  open: boolean;
  anchor: "right" | "left";
  onClose: () => void;
  children?: React.ReactNode;
};

const listMenu = [
  {
    id: 1,
    name: "Tentang",
    url: "#about",
  },
  {
    id: 2,
    name: "FAQ",
    url: "#faq",
  },
  {
    id: 3,
    name: "Daftar",
    url: "/register",
  },
  {
    id: 4,
    name: "Masuk",
    url: "/login",
  },
];

const SideDrawer = (props: DrawerType) => {
  const { open, onClose, anchor } = props;
  return (
    <Drawer open={open} anchor={anchor} onClose={onClose}>
      <Box sx={{ width: 250, height: "100%", boxSizing: "border-box" }} role="presentation" className="overflow-y-hidden">
        <div className="h-full flex flex-col gap-5">
          <div className="text-center p-10 text-primary">
            <Logo />
          </div>
          <List>
            {listMenu.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <Link href={item.url}>
                  <ListItemText primary={item.name} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
        </div>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
