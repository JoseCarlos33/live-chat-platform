import * as yup from "yup";

export const loginSchema = yup.object().shape({
    cpf: yup
      .string()
      .required("O CPF é obrigatório")
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    password: yup
      .string()
      .min(4, "A senha deve ter pelo menos 4 caracteres")
      .required("A senha é obrigatória"),
  });
  