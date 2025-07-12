"use client";
import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTogglePassword } from "./useTogglePassword";

type PasswordTextfieldType = {
  label?: string | 'Password';
};

const PasswordTextfield = ({ label = 'Password' }: PasswordTextfieldType) => {
  const { visible, toggle, inputType } = useTogglePassword();
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      type={inputType}
      placeholder="••••••••"
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
