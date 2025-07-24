"use client";
import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTogglePassword } from "./useTogglePassword";

type PasswordTextfieldType = {
  label?: string | "Password";
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  value: string;
};

const PasswordTextfield = ({
  label = "Password",
  name,
  onChange,
  value
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
      value={value}
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
