"use client";
import React from "react";
import { TextField, IconButton } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTogglePassword } from "./useTogglePassword";
import type { TextFieldProps } from "@mui/material";

const PasswordTextfield = (props: TextFieldProps) => {
  const { visible, toggle, inputType } = useTogglePassword();
  return (
    <TextField
      {...props}
      fullWidth
      variant="outlined"
      type={inputType}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggle}
              edge="end"
            >
              {visible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </IconButton>
          ),
        },
      }}
      
    />
  );
};

export default PasswordTextfield;
