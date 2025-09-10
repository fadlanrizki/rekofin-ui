import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { ManageUserForm, ManageUserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const roleOption = ["User", "Admin"];

type AddEditUserProp = {
  onSubmit: (data: ManageUserForm) => void;
  onClose: () => void;
};

const initialValue = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  status: "",
};

export default function AddEditUserView({
  onSubmit,
  onClose,
}: AddEditUserProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<ManageUserForm>({
    resolver: zodResolver(ManageUserSchema),
    defaultValues: initialValue,
  });

  console.log("watch() > ", watch());

  return (
    <Box className="scroll-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowGap={2} spacing={2}>
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
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
