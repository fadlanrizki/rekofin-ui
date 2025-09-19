"use client";
import ModalFailed from "@/components/shared/Modal/ModalFailed";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { userService } from "@/service/userService";
import { AddManageUserSchema, EditManageUserSchema } from "@/types/user";
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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { z } from "zod";

const roleOption = ["User", "Admin"];

type ManageUserFormProps = {
  mode: string;
  id?: string;
};

const initialValue = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  gender: "",
};

export default function ManageUserFormView({ mode, id }: ManageUserFormProps) {
  const schema =
    mode === PAGE_ACTION.EDIT ? EditManageUserSchema : AddManageUserSchema;

  type ManageUserForm = z.infer<typeof schema>;

  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
  } = useForm<ManageUserForm>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // setLoading(true);
        const response = await userService.findUserById(id || "");
        const data = response.data;

        setValue("fullName", data.fullName);
        setValue("username", data.username);
        setValue("email", data.email);
        setValue("role", data.role);
        setValue("gender", data.gender);
      } catch (error: any) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    };

    if (mode === "view") {
      fetchUserData();
    }
  }, []);

  const onSubmit = async (data: ManageUserForm) => {
    try {
      const response = await userService.createUser(data);
      console.log(response);

      reset();
    } catch (error) {
      let message;

      if (axios.isAxiosError(error)) {
        message = error?.response?.data?.message;
      } else if (error instanceof Error) {
        message = error?.message;
      }
      setMessage(message);
      setModalFailed(true);
    }
  };

  const onCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_USER.LIST);
  };

  return (
    <Paper className="p-6 rounded-2xl w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={"column"} rowGap={2} spacing={2}>
          <Typography variant="h6">Add New User</Typography>

          <Grid container size={12}>
            <Grid size={6}>
              <Typography>Fullname</Typography>
              <TextField
                {...register("fullName")}
                size="small"
                fullWidth
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
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
            />
          </Grid>

          <Grid container size={12}>
            <Grid size={6}>
              <Typography>Password</Typography>
              <PasswordTextfield
                {...register("password")}
                fullWidth
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
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
              />
            </Grid>
          </Grid>

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
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Typography>Gender</Typography>
            <RadioGroup
              {...register("gender")}
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="pria" control={<Radio />} label="Pria" />
              <FormControlLabel
                value="wanita"
                control={<Radio />}
                label="Wanita"
              />
            </RadioGroup>
          </Grid>

          <Grid container size={12} justifyContent={"flex-end"}>
            <Button variant="outlined" color="error" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              loading={isSubmitting}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>

      <ModalFailed
        open={modalFailed}
        message={message}
        onClose={() => setModalFailed(false)}
      />
    </Paper>
  );
}
