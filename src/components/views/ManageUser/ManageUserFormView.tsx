"use client";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { UserService } from "@/service/userService";
import { BaseManageUserSchema, EditManageUserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { z } from "zod";
import Loading from "@/components/shared/Loading";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import { useModal } from "@/hooks/useModal";

const roleOption = ["User", "Admin"];

type ManageUserFormProps = {
  mode: string;
  id?: string;
};

const initialValue = {
  id: "",
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  gender: "",
};

export default function ManageUserFormView({ mode, id }: ManageUserFormProps) {
  const isEdit = mode === PAGE_ACTION.EDIT;
  const isView = mode === PAGE_ACTION.VIEW;

  const { modal, showSuccess, showFailed, closeModal, showConfirm } =
    useModal();

  const schema = isEdit ? EditManageUserSchema : BaseManageUserSchema;

  type ManageUserForm = z.infer<typeof schema>;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<ManageUserForm>(initialValue);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    watch,
  } = useForm<ManageUserForm>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const { data } = await UserService.findUserById(id || "");

        setValue("fullName", data.fullName);
        setValue("username", data.username);
        setValue("email", data.email);
        setValue("role", data.role);
        setValue("gender", data.gender);
        setValue("id", data.id);
      } catch (error) {
        const message = getErrorMessage(error);
        showFailed(message);
      } finally {
        setLoading(false);
      }
    };

    if (mode === PAGE_ACTION.VIEW || mode === PAGE_ACTION.EDIT) {
      fetchUserData();
    }
  }, []);

  const onSubmit = async (data: ManageUserForm) => {
    setPayload(data);
    showConfirm("Apakah anda yakin ingin melanjutkan proses ?");
  };

  const saveUser = async (data: ManageUserForm) => {
    setLoading(true);
    try {
      const response = isEdit
        ? await UserService.updateUser(data)
        : await UserService.createUser(data);

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

  console.log("watch > ", watch());

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

            <Grid container size={12}>
              <Grid size={6}>
                <Typography>Fullname</Typography>
                <TextField
                  {...register("fullName")}
                  size="small"
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  disabled={isView}
                />
              </Grid>
              <Grid size={6}>
                <Typography>Username</Typography>
                <TextField
                  {...register("username")}
                  size="small"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  disabled={isView}
                />
              </Grid>
            </Grid>

            <Grid size={12}>
              <Typography>Email</Typography>
              <TextField
                {...register("email")}
                size="small"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isView}
              />
            </Grid>

            {!isView && (
              <Grid container size={12}>
                <Grid size={6}>
                  <Typography>Password</Typography>
                  <PasswordTextfield
                    {...register("password")}
                    fullWidth
                    size="small"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    disabled={isView}
                  />
                </Grid>
                <Grid size={6}>
                  <Typography>Confirm Password</Typography>
                  <PasswordTextfield
                    {...register("confirmPassword")}
                    fullWidth
                    size="small"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    disabled={isView}
                  />
                </Grid>
              </Grid>
            )}

            <Grid size={12}>
              <Typography>Role</Typography>

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
              <Typography>Gender</Typography>
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
                      >
                        <FormControlLabel
                          value="pria"
                          control={<Radio />}
                          label="Pria"
                          disabled={isView}
                        />
                        <FormControlLabel
                          value="wanita"
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
