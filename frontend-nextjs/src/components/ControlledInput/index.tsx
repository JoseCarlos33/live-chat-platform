import React, { useState } from "react";
import { Box, TextFieldProps, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";
import { Controller, Control } from "react-hook-form";
import InputMask from "react-input-mask";
import { StyledTextField } from "./styles";

interface InputFieldProps {
  name: string;
  label: string;
  errorMessage?: string;
  control: Control<any>;
  textFieldProps?: TextFieldProps;
  mask?: string;
}

const ControlledInput: React.FC<InputFieldProps> = ({
  name,
  label,
  errorMessage,
  control,
  mask,
  ...textFieldProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const renderPasswordToggleIcon = () => (
    <InputAdornment position="end">
      <IconButton onClick={handleClickShowPassword} edge="end">
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box flex={1} width={"100%"}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) =>
          mask ? (
            <InputMask
              mask={mask || ""}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              style={{ width: "100%" }}
            >
              {(inputProps) => (
                <StyledTextField
                  {...inputProps}
                  label={label}
                  error={!!errorMessage}
                  helperText={errorMessage}
                  fullWidth
                  inputRef={field.ref}
                  {...textFieldProps}
                  InputProps={
                    textFieldProps?.textFieldProps?.type === "password"
                      ? {
                          type: showPassword ? "text" : "password",
                          endAdornment: renderPasswordToggleIcon(),
                        }
                      : undefined
                  }
                />
              )}
            </InputMask>
          ) : (
            <StyledTextField
              inputRef={field.ref}
              variant="outlined"
              label={label}
              error={!!errorMessage}
              helperText={errorMessage}
              fullWidth
              {...textFieldProps}
              {...field}
              sx={{
                borderRadius: 20,
              }}
              InputProps={
                textFieldProps?.textFieldProps?.type === "password"
                  ? {
                      type: showPassword ? "text" : "password",
                      endAdornment: renderPasswordToggleIcon(),
                    }
                  : undefined
              }
            />
          )
        }
      />
    </Box>
  );
};

export default ControlledInput;
