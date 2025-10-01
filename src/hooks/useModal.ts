import { useState, useCallback } from "react";

type TModal = {
  open: boolean;
  type: string | "success" | "failed" | "confirm";
  message: string;
};

export const useModal = () => {
  const [modal, setModal] = useState<TModal>({
    open: false,
    type: "",
    message: "",
  });

  const showSuccess = useCallback((message: string) => {
    setModal({ open: true, type: "success", message });    
  }, []);

  const showFailed = useCallback((message: string) => {
    setModal({ open: true, type: "failed", message });    
  }, []);

  const showConfirm = useCallback((message: string) => {
    setModal({ open: true, type: "confirm", message });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ open: false, type: "", message: "" });
  }, []);  

  return { modal, showSuccess, showFailed, showConfirm, closeModal };
};
