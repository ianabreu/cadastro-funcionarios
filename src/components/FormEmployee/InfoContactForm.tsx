import { Button } from "@mui/material";
import { FormInputSelect } from "../ui/FormInputSelect";
import styles from "./form-employee.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InfoContactProps, InfoContactSchema } from "../../schemas/employee";

import { FormInputText } from "../ui/FormInputText";
import { GENDER_OPTIONS } from "../../@types/employee";
import { FormInputTextMask } from "../ui/FormInputTextMask";
import { FormInputDate } from "../ui/FormInputDate";
import { useContext } from "react";
import { HistoryContext } from "../../contexts/history";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { EmployeeContext } from "../../contexts/employee";
interface FormEmployeeProps {
  data: InfoContactProps;
}

export function InfoContactForm({ data }: FormEmployeeProps) {
  const { addHistory } = useContext(HistoryContext);
  const { setStatus } = useContext(EmployeeContext);

  async function updateContact(
    prevValue: InfoContactProps,
    newValue: InfoContactProps
  ) {
    if (newValue.id) {
      const docRef = doc(db, "employees", newValue.id);
      let prev_Value = {
        ...prevValue,
        birth: prevValue.birth.split("-").reverse().join("/"),
      };
      let new_Value = {
        ...newValue,
        birth: newValue.birth.split("-").reverse().join("/"),
      };

      addHistory(
        "contact",
        newValue.id,
        {
          ...(({ id, ...rest }) => rest)(prev_Value),
        },
        { ...(({ id, ...rest }) => rest)(new_Value) }
      );

      await updateDoc(docRef, {
        ...(({ id, ...rest }) => rest)(new_Value),
        updatedAt: serverTimestamp(),
      });
    }
  }
  async function onSubmit(newData: InfoContactProps) {
    try {
      updateContact(data, newData);
    } catch (error) {
      console.log(error);
    }
    setStatus("ACTIVE");
    navigate("/", { replace: true });
  }

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...data },
    resolver: yupResolver(InfoContactSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <fieldset className={styles.fildset}>
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

        <div className={styles.areaButton}>
          <Button type="submit" variant="contained" size="small">
            Editar
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
