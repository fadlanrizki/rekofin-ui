"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type DrawerType = {
  open: boolean;
  anchor: "right" | "left";
  onClose: () => void;
  children?: React.ReactNode;
};

const SideDrawer = (props: DrawerType) => {
  const { open, onClose, anchor, children } = props;
  return (
    <Drawer open={open} anchor={anchor} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  icon
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
