"use client";
import theme from "@/config/theme";
import { Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface BaseButtonProps {
  title: string;
  variant?: "contained" | "text" | "outlined";
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  onClick: () => void;
  loading?: boolean;
}

const BaseButton = ({
  title,
  disabled,
  onClick,
  type = "button",
  loading,
  variant = "contained",
}: BaseButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth
      sx={{ borderRadius: 3 }}
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        backgroundColor:
          variant === "outlined"
            ? "#FFFFFF"
            : disabled || loading
            ? "#DDDDDD"
            : theme.palette.primary.main,
            borderColor:   theme.palette.primary.main,
      }}
    >
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <Typography
          sx={{
            fontFamily: "Sora",
            fontWeight: "600",
            padding: 1.5,
            fontSize: "1.25rem",
          }}
          color={variant === "outlined" ? "#F5A64C" : "#FFFFFF"}
        >
          {title}
        </Typography>
      )}
    </Button>
  );
};

export default BaseButton;
