import { useContext } from "react";
import { Button } from "@mui/material";
import styles from "./form-employee.module.css";
import { EmployeeContext } from "../../contexts/employee";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InfoEmployeeProps, InfoEmployeeSchema } from "../../schemas/employee";

import { FormInputSelect } from "../ui/FormInputSelect";
import { FormInputTextMask } from "../ui/FormInputTextMask";
import { FormInputDate } from "../ui/FormInputDate";
import { HistoryContext } from "../../contexts/history";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
interface FormEmployeeProps {
  data: InfoEmployeeProps;
}

export function InfoEmployeeForm({ data }: FormEmployeeProps) {
  const { sectors, roles, setStatus } = useContext(EmployeeContext);
  const { addHistory } = useContext(HistoryContext);

  async function updateEmployeePromotion(
    prevValue: InfoEmployeeProps,
    newValue: InfoEmployeeProps
  ) {
    if (newValue.id) {
      const docRef = doc(db, "employees", newValue.id);
      let prev_Value = {
        ...prevValue,
        admission: prevValue.admission.split("-").reverse().join("/"),
      };
      let new_Value = {
        ...newValue,
        admission: newValue.admission.split("-").reverse().join("/"),
      };

      addHistory(
        "promotion",
        newValue.id,
        {
          ...(({ id, admission, ...rest }) => rest)(prev_Value),
        },
        { ...(({ id, ...rest }) => rest)(new_Value) }
      );
      await updateDoc(docRef, {
        ...(({ id, ...rest }) => rest)(new_Value),
        updatedAt: serverTimestamp(),
      });
    }
  }
  async function onSubmit(newData: InfoEmployeeProps) {
    try {
      updateEmployeePromotion(data, newData);
    } catch (error) {
      console.log(error);
    }
    setStatus("ACTIVE");
    navigate("/", { replace: true });
  }

  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: { ...data },
    mode: "onBlur",
    resolver: yupResolver(InfoEmployeeSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <fieldset className={styles.fildset}>
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
        <div className={styles.areaButton}>
          <Button type="submit" variant="contained" size="small">
            Editar
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
