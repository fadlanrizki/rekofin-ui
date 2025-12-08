import ModalNotification from "@/components/shared/Modal/ModalNotification";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { useModal } from "@/hooks/useModal";
import { UserService } from "@/service/userService";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
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
    formState: { errors },
  } = useForm<ChangePassword>({
    defaultValues,
    resolver: zodResolver(ChangePasswordSchema),
  });
  const {
    modal,
    showSuccess,
    showFailed,
    closeModal,
    //  showConfirm
  } = useModal();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: ChangePassword) => {
    apiEditProfile(data);
  };

  const apiEditProfile = (data: ChangePassword) => {
    setLoading(true);

    const payload = {
      password: data.password,
      // id:
    };

    let message = "";

    try {
      const response = UserService.updateUser(payload);
      message = getResponseMessage(response);
      showSuccess(message);
    } catch (error) {
      message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction={"column"} spacing={4}>
        <Grid container>
          <Grid size={6}>
            <PasswordTextfield
              {...register("old_password")}
              label={"Password Lama"}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid size={6}>
            <PasswordTextfield
              {...register("password")}
              label={"Password Baru"}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
        </Grid>

        <Grid size={12} justifyContent={"end"}>
          <PasswordTextfield
            {...register("confirm_password")}
            label={"Konfirmasi Password"}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>
        <Grid container justifyContent={"end"}>
          <Button loading={loading} type="submit">
            Ubah Password
          </Button>
        </Grid>
      </Grid>
      <ModalNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        // onConfirm={handleConfirm}
      />
    </form>
  );
}
