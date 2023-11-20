import * as Yup from "yup";
import { GENDER, STATUS } from "../@types/employee";

const regEx = /^\(\d{2}\) \d{5}-\d{4}$/;
const regEx2 = /^\(\d{2}\) \d{4}-\d{4}$/;

let phoneSchema = Yup.string()
  .required("Este campo é obrigatório")
  .test("phone", "Número inválido", (value: string) => {
    return regEx.test(value || "") || regEx2.test(value || "");
  });

export const formValidationSchema = Yup.object({
  id: Yup.string(),
  firstName: Yup.string()
    .required("Este campo é obrigatório")
    .min(3, "Mínimo 3 caracteres"),
  lastName: Yup.string()
    .required("Este campo é obrigatório")
    .min(2, "Mínimo 2 caracteres"),
  gender: Yup.string()
    .required("Este campo é obrigatório")
    .oneOf(Object.keys(GENDER), "Escolha uma opção válida"),
  birth: Yup.string()
    .required("Este campo é obrigatório")
    .typeError("Digite uma data válida.")
    .test("is-underage", "Idade mínima: 18 anos", (birth) => {
      if (!birth) return false;
      const date = new Date(birth);
      const now = new Date();

      return now.getUTCFullYear() - date.getUTCFullYear() >= 18;
    }),
  address: Yup.string().required("Este campo é obrigatório"),
  phone: phoneSchema,
  admission: Yup.string()
    .typeError("Digite uma data válida.")
    .required("Este campo é obrigatório")
    .test("is-future", "Não pode ser data futura", (admission) => {
      if (!admission) return false;
      const date = new Date(admission);
      const now = new Date();

      return date.getUTCFullYear() - now.getUTCFullYear() < 1;
    }),

  role: Yup.string().required("Este campo é obrigatório"),
  sector: Yup.string().required("Este campo é obrigatório"),
  wage: Yup.string().required("Este campo é obrigatório"),
  status: Yup.string().default("ACTIVE").oneOf(Object.keys(STATUS)),
});

export const InfoEmployeeSchema = Yup.object({
  id: Yup.string(),
  admission: Yup.string()
    .typeError("Digite uma data válida.")
    .required("Este campo é obrigatório")
    .test("is-future", "Não pode ser data futura", (admission) => {
      if (!admission) return false;
      const date = new Date(admission);
      const now = new Date();

      return date.getUTCFullYear() - now.getUTCFullYear() < 1;
    }),

  role: Yup.string().required("Este campo é obrigatório"),
  sector: Yup.string().required("Este campo é obrigatório"),
  wage: Yup.string().required("Este campo é obrigatório"),
});

export const InfoContactSchema = Yup.object({
  id: Yup.string(),
  firstName: Yup.string()
    .required("Este campo é obrigatório")
    .min(3, "Mínimo 3 caracteres"),
  lastName: Yup.string()
    .required("Este campo é obrigatório")
    .min(2, "Mínimo 2 caracteres"),
  gender: Yup.string()
    .required("Este campo é obrigatório")
    .oneOf(Object.keys(GENDER)),
  birth: Yup.string()
    .required("Este campo é obrigatório")
    .typeError("Digite uma data válida.")
    .test("is-underage", "Idade mínima: 18 anos", (birth) => {
      if (!birth) return false;
      const date = new Date(birth);
      const now = new Date();

      return now.getUTCFullYear() - date.getUTCFullYear() >= 18;
    }),
  address: Yup.string().required("Este campo é obrigatório"),
  phone: phoneSchema,
});

export type EmployeeFormType = Yup.InferType<typeof formValidationSchema>;
export type InfoEmployeeProps = Yup.InferType<typeof InfoEmployeeSchema>;
export type InfoContactProps = Yup.InferType<typeof InfoContactSchema>;
