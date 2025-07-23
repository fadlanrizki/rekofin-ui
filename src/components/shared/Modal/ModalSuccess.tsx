import { Dialog } from "@mui/material";
import successAnimation from "../../../../public/animation/success-animation.json";
import Lottie from "lottie-react";
type ModalFailedPropsType = {
  open: boolean;
  onClose?: () => void;
  message?: string;
};

export default function ModalSuccess({
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
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ width: "200px" }}
          />
          <p className="font-semibold text-lg text-gray-600 text-center">{message}</p>
        </div>
      </div>
    </Dialog>
  );
}
