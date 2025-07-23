import { Dialog } from "@mui/material";
import errorAnimation from "../../../../public/animation/error-animation.json";
import Lottie from "lottie-react";
type ModalFailedPropsType = {
  open: boolean;
  onClose?: () => void;
  message?: string;
};

export default function ModalFailed({
  open,
  onClose,
  message
}: ModalFailedPropsType) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-full flex items-center justify-center">
        <div className="w-[300px] flex flex-col items-center bg-white p-5 py-7 rounded-lg">
        <p className="font-bold text-2xl text-gray-600">Error</p>
          <Lottie
            animationData={errorAnimation}
            loop={false}
            style={{ width: "200px" }}
          />
          <p className="font-medium text-gray-600 text-center">{message}</p>
        </div>
      </div>
    </Dialog>
  );
}
