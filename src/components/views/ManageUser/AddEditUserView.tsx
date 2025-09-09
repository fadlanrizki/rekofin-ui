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
import { useForm } from "react-hook-form";

const roleOption = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

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
  } = useForm<ManageUserForm>({
    resolver: zodResolver(ManageUserSchema),
    defaultValues: initialValue,
  });

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
            />
            {!!errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </Grid>
          <Grid size={6}>
            <Typography>Username</Typography>
            <TextField
              {...register("username")}
              size="small"
              fullWidth
              error={!!errors.username}
            />
            {!!errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </Grid>

          <Grid size={12}>
            <Typography>Email</Typography>
            <TextField
              {...register("email")}
              size="small"
              fullWidth
              error={!!errors.email}
            />
            {!!errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </Grid>
          <Grid size={6}>
            <Typography>Password</Typography>
            <PasswordTextfield
              {...register("password")}
              fullWidth
              size="small"
              error={!!errors.password}
            />
            {!!errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </Grid>
          <Grid size={6}>
            <Typography>Confirm Password</Typography>
            <PasswordTextfield
              {...register("confirmPassword")}
              fullWidth
              size="small"
              error={!!errors.confirmPassword}
            />
            {!!errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </Grid>
          <Grid size={12}>
            <Typography>Role</Typography>
            <Autocomplete
              disablePortal
              options={roleOption}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  error={!!errors.role}
                />
              )}
            />
            {!!errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
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
