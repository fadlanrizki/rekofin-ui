import { Button, Dialog, Grid } from "@mui/material";
import errorAnimation from "../../../../public/animation/error-animation.json";
import Lottie from "lottie-react";
import { useCallback } from "react";
import successAnimation from "../../../../public/animation/success-animation.json";
import confirmAnimation from "../../../../public/animation/confirm-animation.json";

type ModalProps = {
  open: boolean;
  message: string;
  type: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function ModalNotification({
  open,
  message,
  type,
  onClose,
  onConfirm,
}: ModalProps) {
  const getAnimation = useCallback(() => {
    const getSourceAnimation = () => {
      if (type === "success") {
        return successAnimation;
      } else if (type === "failed") {
        return errorAnimation;
      } else if (type === "confirm") {
        return confirmAnimation;
      }
    };

    return (
      <Lottie
        animationData={getSourceAnimation()}
        loop={false}
        style={{ width: "200px" }}
      />
    );
  }, [type]);

  const getMessage = useCallback(() => {
    const getDefaultMessage = () => {
      if (type === "success") {
        return "Proses Berhasil";
      } else if (type === "failed") {
        return "Terjadi Kesalahan Pada Sistem !";
      } else if (type === "confirm") {
        return "Apakah anda yakin ingin melanjutkan proses ?";
      }
    };

    return (
      <p className="font-semibold text-lg text-gray-600 text-center">
        {message || getDefaultMessage()}
      </p>
    );
  }, [message, type]);

  const getActionButton = useCallback(() => {
    if (type === "confirm") {
      return (
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={2}
          size={12}
        >
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Ok
          </Button>
        </Grid>
      );
    } else {
      <Grid
        container
        justifyContent={"flex-end"}
        size={12}
        alignItems={"center"}
      >
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Ok
        </Button>
      </Grid>;
    }
  }, [type, onClose, onConfirm]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-full flex items-center justify-center">
        <div className="w-[300px] flex flex-col items-center bg-white p-5 py-7 rounded-lg">
          {getAnimation()}
          {getMessage()}
          {getActionButton()}
        </div>
      </div>
    </Dialog>
  );
}
