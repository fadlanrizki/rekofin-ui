"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

type SweetAlertNotificationProps = {
  open: boolean;
  message: string;
  type: string;
  onClose: () => void;
  onConfirm?: () => void;
};

const DEFAULT_MESSAGE: Record<string, string> = {
  success: "Proses Berhasil",
  failed: "Terjadi Kesalahan Pada Sistem !",
  confirm: "Apakah anda yakin ingin melanjutkan proses ?",
};

export default function SweetAlertNotification({
  open,
  message,
  type,
  onClose,
  onConfirm,
}: SweetAlertNotificationProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const isConfirm = type === "confirm";
    const icon =
      type === "failed" ? "error" : type === "success" ? "success" : "question";
    const popupClassName = isConfirm
      ? "swal-notif-popup swal-notif-popup-confirm"
      : "swal-notif-popup";

    void Swal.fire({
      icon,
      text: message || DEFAULT_MESSAGE[type] || DEFAULT_MESSAGE.failed,
      showCancelButton: isConfirm,
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
      focusConfirm: !isConfirm,
      allowOutsideClick: !isConfirm,
      reverseButtons: isConfirm,
      customClass: {
        popup: popupClassName,
        title: "swal-notif-title",
        htmlContainer: "swal-notif-content",
        actions: "swal-notif-actions",
        confirmButton: "swal-notif-confirm",
        cancelButton: "swal-notif-cancel",
      },
      buttonsStyling: false,
    }).then((result) => {
      onClose();

      if (isConfirm && result.isConfirmed) {
        onConfirm?.();
      }
    });
  }, [open, message, type, onClose, onConfirm]);

  return null;
}
