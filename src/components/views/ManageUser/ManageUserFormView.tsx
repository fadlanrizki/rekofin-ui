"use client";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { UserService } from "@/service/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { z } from "zod";
import Loading from "@/components/shared/Loading";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import { useModal } from "@/hooks/useModal";

const roleOption = ["ADMIN"];

const initialValue = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  gender: "",
};

const BaseManageUserSchema = z
  .object({
    fullname: z.string().min(1, "Nama lengkap wajib diisi"),
    username: z.string().min(1, "Username wajib diisi"),
    email: z.email("Email tidak valid"),
    password: z.string().min(1, "Password wajib diisi"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    role: z.string().min(1, "Role wajib diisi"),
    gender: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password tidak cocok",
        path: ["confirmPassword"],
      });
    }
  });

export default function ManageUserFormView() {
  const router = useRouter();
  const params = useParams();

  const paramsId = params?.id;

  const id = Array.isArray(paramsId) ? paramsId[0] : paramsId;
  const mode = params.mode;

  const isView = mode === PAGE_ACTION.VIEW;

  const { modal, showSuccess, showFailed, closeModal, showConfirm } =
    useModal();

  const schema = BaseManageUserSchema;
  type ManageUserForm = z.infer<typeof schema>;

  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<ManageUserForm>(initialValue);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ManageUserForm>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });

  const onSubmit = async (data: ManageUserForm) => {
    setPayload(data);
    showConfirm("Apakah anda yakin ingin melanjutkan proses ?");
  };

  const saveUser = async (data: ManageUserForm) => {
    setLoading(true);
    try {
      const response = await UserService.createUser(data);

      const message = getResponseMessage(response);
      showSuccess(message);
      setTimeout(() => {
        closeModal();
        router.push(ROUTE_PATHS.ADMIN.MANAGE_USER.LIST);
      }, 2000);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_USER.LIST);
  };

  const getTitle = () => {
    switch (mode) {
      case PAGE_ACTION.VIEW:
        return "Detail User";
      case PAGE_ACTION.ADD:
        return "Tambah User";
      case PAGE_ACTION.EDIT:
        return "Edit User";
    }
  };

  const handleConfirm = () => {
    saveUser(payload);
  };

  return (
    <Paper className="p-6 rounded-2xl w-full mx-auto h-full">
      {loading ? (
        <div className="flex w-full h-full justify-center items-center">
          <Loading size="lg"></Loading>
          <p className="text-slate-500 text-2xl">Loading ...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction={"column"} rowGap={2} spacing={2}>
            <Typography variant="h6">{getTitle()}</Typography>

            <Grid size={6}>
              <FormLabel required>Nama Lengkap</FormLabel>
              <TextField
                {...register("fullname")}
                size="small"
                fullWidth
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
                disabled={isView}
              />
            </Grid>

            <Grid size={6}>
              <FormLabel required>Username</FormLabel>
              <TextField
                {...register("username")}
                size="small"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
                disabled={isView}
              />
            </Grid>

            <Grid size={6}>
              <FormLabel required>Email</FormLabel>
              <TextField
                {...register("email")}
                size="small"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isView}
              />
            </Grid>

            <Grid container size={12}>
              <Grid size={6}>
                <FormLabel required>Password</FormLabel>
                <PasswordTextfield
                  {...register("password")}
                  size="small"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isView}
                />
              </Grid>
              <Grid size={6}>
                <FormLabel required>Konfirmasi Password</FormLabel>
                <PasswordTextfield
                  {...register("confirmPassword")}
                  size="small"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  disabled={isView}
                />
              </Grid>
            </Grid>

            <Grid size={6}>
              <FormLabel required>Role</FormLabel>
              <Controller
                name="role"
                control={control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    {...field}
                    options={roleOption}
                    value={field.value}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                    disabled={isView}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <FormLabel>Gender</FormLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <RadioGroup
                        {...field}
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        row
                        defaultValue={field.value}
                      >
                        <FormControlLabel
                          value="MALE"
                          control={<Radio />}
                          label="Pria"
                          disabled={isView}
                        />
                        <FormControlLabel
                          value="FEMALE"
                          control={<Radio />}
                          label="Wanita"
                          disabled={isView}
                        />
                      </RadioGroup>
                    </>
                  );
                }}
              />
            </Grid>

            <Grid container size={12} justifyContent={"flex-end"}>
              <Button variant="outlined" color="error" onClick={onCancel}>
                Kembali
              </Button>
              {!isView && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  loading={isSubmitting}
                >
                  Simpan
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      )}
      <ModalNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={handleConfirm}
      />
    </Paper>
  );
}
