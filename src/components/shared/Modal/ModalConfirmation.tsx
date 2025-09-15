import React from "react";
import ModalCustom from "./ModalCustom";
import { Button, Grid } from "@mui/material";

type TModalConfirmation = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onSubmit: () => void;
};

const ModalConfirmation = ({
  open,
  title,
  message,
  onClose,
  onSubmit,
}: TModalConfirmation) => {
  return (
    <ModalCustom open={open} onClose={onClose} title={title}>
      <Grid container direction={"column"} spacing={4}>
        <p>{message}</p>
        <Grid container justifyContent={"flex-end"} spacing={2}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Ok
          </Button>
        </Grid>
      </Grid>
    </ModalCustom>
  );
};

export default ModalConfirmation;
