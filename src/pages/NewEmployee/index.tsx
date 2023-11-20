import styles from "./new-employee.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";

import { useForm } from "react-hook-form";
import { FormInputText } from "../../components/ui/FormInputText";
import { FormInputSelect } from "../../components/ui/FormInputSelect";
import { FormInputDate } from "../../components/ui/FormInputDate";
import { FormInputImage } from "../../components/ui/FormInputImage";
import { EmployeeContext } from "../../contexts/employee";
import { useContext, useState } from "react";
import { EmployeeFormType, formValidationSchema } from "../../schemas/employee";
import { useNavigate } from "react-router-dom";
import { PDFEmployee } from "../../components/PDFEmployee";
import { toast } from "react-toastify";
import { FormInputTextMask } from "../../components/ui/FormInputTextMask";
import { GENDER_OPTIONS } from "../../@types/employee";

export default function NewEmployee() {
  const { addEmployee, loadingEmployee, sectors, roles } =
    useContext(EmployeeContext);
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      address: "",
      admission: "",
      birth: "",
      firstName: "",
      gender: "",
      lastName: "",
      phone: "",
      role: "",
      sector: "",
      status: "ACTIVE",
      wage: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(formValidationSchema),
  });
  const data = watch();

  async function onSubmit(data: EmployeeFormType) {
    console.log(data);
    try {
      if (file && file !== null) {
        await addEmployee(data, file);
      } else {
        toast.error("Escolha uma imagem para enviar.");
        return;
      }
    } catch (error) {
      console.log(error);
    }
    navigate("/", { replace: true });
  }

  return (
    <main className={styles.container}>
      <div className={styles.area}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <fieldset className={styles.fildset}>
            <legend className={styles.legend}>Informações de Contato</legend>
            <div className={styles.flex}>
              <div className={`${styles.flex} ${styles.flexCol}`}>
                <FormInputText
                  name="firstName"
                  control={control}
                  label={"Nome"}
                  helper="ex. Ian"
                />
                <FormInputText
                  name="lastName"
                  control={control}
                  label={"Sobrenome"}
                  helper="ex. Abreu"
                />
                <FormInputSelect
                  name="gender"
                  control={control}
                  label={"Gênero"}
                  options={GENDER_OPTIONS}
                  errorSelect={!!errors.gender}
                />
              </div>
              <div className={`${styles.flex} ${styles.flexCol}`}>
                <FormInputImage setImage={setFile} />
              </div>
            </div>
            <FormInputText
              name="address"
              control={control}
              label={"Endereço"}
              helper="ex. Rua Antônio Alves Meira"
            />
            <div className={styles.flex}>
              <div className={styles.flexOne}>
                <FormInputTextMask
                  mask="phone"
                  name="phone"
                  type="tel"
                  control={control}
                  label={"Telefone"}
                  helper="ex. (77) 99982-4116"
                />
              </div>
              <div className={`${styles.flexOne}`}>
                <FormInputDate
                  control={control}
                  name="birth"
                  label={"Data de Nascimento"}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={styles.fildset}>
            <legend className={styles.legend}>
              Informações do Funcionário
            </legend>

            <div className={`${styles.flex} ${styles.flexCol}`}>
              <div className={styles.flex}>
                <div className={`${styles.flexOne}`}>
                  <FormInputDate
                    control={control}
                    name="admission"
                    label={"Data de Admissão"}
                  />
                </div>
                <div className={styles.flexOne}>
                  <FormInputTextMask
                    mask="currency"
                    name="wage"
                    type="text"
                    control={control}
                    label={"Salário"}
                    helper="ex. R$ 2.000,00"
                  />
                </div>
              </div>

              <div className={styles.flex}>
                <div className={styles.flexOne}>
                  <FormInputSelect
                    name="sector"
                    control={control}
                    label={"Setor"}
                    options={sectors}
                  />
                </div>
                <div className={styles.flexOne}>
                  <FormInputSelect
                    name="role"
                    control={control}
                    label={"Cargo"}
                    options={roles}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={loadingEmployee}
          >
            Cadastrar
          </Button>
        </form>
      </div>
      <div className={styles.areaPDF}>
        <PDFEmployee
          data={data}
          imageUrl={file !== null && URL.createObjectURL(file)}
        />
      </div>
    </main>
  );
}
