"use client";
import React, { ChangeEventHandler } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTogglePassword } from "./useTogglePassword";

type PasswordTextfieldType = {
  label?: string | "Password";
  name?: string;
  onChange?: (event: any) => void;
};

const PasswordTextfield = ({
  label = "Password",
  name,
  onChange,
}: PasswordTextfieldType) => {
  const { visible, toggle, inputType } = useTogglePassword();
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      variant="outlined"
      type={inputType}
      placeholder="••••••••"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggle}
              edge="end"
            >
              {visible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordTextfield;
