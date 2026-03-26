import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { useModal } from "@/hooks/useModal";
import { UserService } from "@/service/userService";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChangePasswordSchema = z
  .object({
    password: z.string().min(1, "Password Baru harus Diisi!"),
    old_password: z.string().min(1, "Password Lama Harus Diisi!"),
    confirm_password: z.string().min(1, "Konfirmasi Password Harus Diisi !"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password tidak sesuai, Mohon sesuaikan kembali ",
        path: ["confirm_password"],
      });
    }
  });

type ChangePassword = z.infer<typeof ChangePasswordSchema>;

const defaultValues = {
  password: "",
  old_password: "",
  confirm_password: "",
};

export default function ChangePasswordView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePassword>({
    defaultValues,
    resolver: zodResolver(ChangePasswordSchema),
  });
  const { modal, showSuccess, showFailed, showConfirm, closeModal } =
    useModal();

  const [loading, setLoading] = useState(false);
  const [pendingPasswordData, setPendingPasswordData] =
    useState<ChangePassword | null>(null);

  const onSubmit = (data: ChangePassword) => {
    setPendingPasswordData(data);
    showConfirm("Yakin ingin mengubah password?");
  };

  const apiEditProfile = async (data: ChangePassword) => {
    setLoading(true);

    const payload = {
      old_password: data.old_password,
      password: data.password,
    };

    try {
      const response = await UserService.changePassword(payload);
      const message =
        getResponseMessage(response) || "Password berhasil diubah";
      showSuccess(message);
      reset(defaultValues);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmChangePassword = () => {
    if (!pendingPasswordData) {
      return;
    }

    void apiEditProfile(pendingPasswordData);
    setPendingPasswordData(null);
  };

  const handleCloseModal = () => {
    closeModal();
    if (modal.type === "confirm") {
      setPendingPasswordData(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Typography variant="h6" fontWeight={600} mb={2}>
        Ubah Password
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
          <PasswordTextfield
            {...register("old_password")}
            label={"Password Lama"}
            error={!!errors.old_password}
            helperText={errors.old_password?.message}
            disabled={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
          <PasswordTextfield
            {...register("password")}
            label={"Password Baru"}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <PasswordTextfield
            {...register("confirm_password")}
            label={"Konfirmasi Password"}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
            disabled={loading}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box className="flex justify-end">
            <Button
              loading={loading}
              type="submit"
              variant="contained"
              className="w-full sm:w-auto"
            >
              Ubah Password
            </Button>
          </Box>
        </Grid>
      </Grid>

      <SweetAlertNotification
        open={modal.open}
        message={modal.message}
        onClose={handleCloseModal}
        type={modal.type}
        onConfirm={handleConfirmChangePassword}
      />
    </form>
  );
}
