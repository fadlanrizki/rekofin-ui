"use client";

import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
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
      <Box
        role="presentation"
        className="overflow-y-hidden w-[250px] h-full box-border px-2 py-4"
      >
        <Stack justifyContent={"space-between"} className="h-full">
          <List>
            {listMenu.map((item, index) => (
              <Link key={index} href={item.url}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      className="text-right text-primary"
                      primary={item.name}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <center className="text-slate-400">Rekofin © 2026</center>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
