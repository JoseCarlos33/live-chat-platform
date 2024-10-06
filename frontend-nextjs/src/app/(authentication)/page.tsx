"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledInput from "@/components/ControlledInput";
import Image from "next/image";
import { loginSchema } from "./schema";
import { FormContainer } from "./styles";
import BaseButton from "@/components/BaseButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useReduxState } from "@/redux/store";

interface LoginFormInputs {
  cpf: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  const {
    session: { loading },
  } = useReduxState();

  const isCpfEmpty = watch("cpf")?.length < 11;
  const isPasswordEmpty = watch("password")?.length < 4;

  const router = useRouter();

  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F9FBFF",
      }}
    >
      <Grid
        container
        item
        sm={12}
        sx={{
          display: "grid",
        }}
      >
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Box
            width={"100%"}
            sx={{ gap: 7, display: "flex", flexDirection: "column" }}
          >
            <ControlledInput
              name="cpf"
              label="CPF"
              errorMessage={errors.cpf?.message}
              control={control}
              mask="999.999.999-99"
            />
            <ControlledInput
              name="password"
              label="Senha"
              errorMessage={errors.password?.message}
              control={control}
              type="password"
            />
          </Box>
          <BaseButton
            title="Concluir"
            type="submit"
            onClick={() => {}}
            loading={loading}
            disabled={isCpfEmpty || isPasswordEmpty}
          />
        </FormContainer>
      </Grid>
    </Grid>
  );
};

export default Login;
