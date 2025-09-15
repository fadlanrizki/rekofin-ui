import { Box, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type ModalProps = {
  title?: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModalCustom({
  title,
  open,
  onClose,
  children,
}: ModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container justifyContent={"space-between"}>
          <Typography variant="h6">{title ?? "-"}</Typography>
          <RxCross2 size={30} className="cursor-pointer" onClick={onClose} />
        </Grid>
        <br />

        {children}
      </Box>
    </Modal>
  );
}
