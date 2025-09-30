import { useState, useCallback } from "react";

type TModal = {
  open: boolean;
  type: string | "success" | "failed" | "confirm";
  message: string;
  onConfirm?: () => void;
};

export const useModal = () => {
  const [modal, setModal] = useState<TModal>({
    open: false,
    type: "",
    message: "",
    onConfirm: undefined
  });

  const showSuccess = useCallback((message: string) => {
    setModal({ open: true, type: "success", message });
    console.log("func success");
    
    
  }, []);

  const showFailed = useCallback((message: string) => {
    setModal({ open: true, type: "failed", message });
    console.log("func failed");
    
  }, []);

  const showConfirm = useCallback((message: string, onConfirm?: () => void) => {
    setModal({ open: true, type: "confirm", message, onConfirm });
    console.log("func confirm");

  }, []);

  const closeModal = useCallback(() => {
    setModal({ open: false, type: "", message: "" });
    console.log("func close");
  }, []);

  console.log("modal megumiiiii >> ", modal);
  

  return { modal, showSuccess, showFailed, showConfirm, closeModal };
};
