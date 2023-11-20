import { EmployeeFormType } from "../schemas/employee";

export interface SectorProps {
  id: string;
  name: string;
}

export interface RoleProps {
  id: string;
  name: string;
}
export const GENDER = {
  Masculino: "Masculino",
  Feminino: "Feminino",
};
export const GENDER_OPTIONS = [
  { id: "001", name: "Masculino" },
  { id: "002", name: "Feminino" },
];

export const STATUS = {
  ACTIVE: "Ativo",
  FIRED: "Demitido",
  CONTRACT_END: "Contrato encerrado",
};
export type GenderProps = keyof typeof GENDER;
export type StatusProps = keyof typeof STATUS;

export interface EmployeeProps extends EmployeeFormType {
  profileURL: string;
  status: StatusProps;
  updatedAt: Date;
  createdAt: Date;
}
