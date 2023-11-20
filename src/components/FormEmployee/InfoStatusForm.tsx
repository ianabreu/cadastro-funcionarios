import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

import styles from "./form-employee.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { StatusProps } from "../../@types/employee";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { useContext } from "react";
import { HistoryContext } from "../../contexts/history";
export interface FormStatusProps {
  status: StatusProps;
  id: string | undefined;
}

export function InfoStatusForm({ status, id }: FormStatusProps) {
  const { addHistory } = useContext(HistoryContext);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: { status, id },
    mode: "onBlur",
  });

  async function updateStatus(
    prevValue: StatusProps,
    newValue: FormStatusProps
  ) {
    if (newValue.id) {
      const docRef = doc(db, "employees", newValue.id);

      addHistory(
        "status",
        newValue.id,
        { status: prevValue },
        { status: newValue.status }
      );
      await updateDoc(docRef, {
        status: newValue.status,
        updatedAt: serverTimestamp(),
      });
    }
  }

  async function onSubmit(data: FormStatusProps) {
    try {
      updateStatus(status, data);
    } catch (error) {
      console.log(error);
    }

    navigate("/", { replace: true });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <fieldset className={styles.fildset}>
        <Controller
          name={"status"}
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl>
              <FormLabel id="status-form-label">Status</FormLabel>
              <RadioGroup
                aria-labelledby="status-form-label"
                defaultValue="ACTIVE"
                name="radio-buttons-group"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              >
                <FormControlLabel
                  value="ACTIVE"
                  control={<Radio />}
                  label="Ativo"
                />
                <FormControlLabel
                  value="FIRED"
                  control={<Radio />}
                  label="Demitido"
                />
                <FormControlLabel
                  value="CONTRACT_END"
                  control={<Radio />}
                  label="Contrato Encerrado"
                />
              </RadioGroup>
            </FormControl>
          )}
        />
        <div className={styles.areaButton}>
          <Button type="submit" variant="contained" size="small">
            Editar
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
