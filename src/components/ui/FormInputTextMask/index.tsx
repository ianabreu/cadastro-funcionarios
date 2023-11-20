import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";

import { cep, currency, cpf, phone } from "./masks";
import { ChangeEvent, useCallback, useState } from "react";

type FormInputTextMaskProps = {
  helper?: string;
  mask: "cep" | "currency" | "cpf" | "phone";
  prefix?: string;
};
export function FormInputTextMask<FormType extends FieldValues>({
  name,
  control,
  label,
  helper = "",
  mask,
  prefix,
  ...TextFieldProps
}: UseControllerProps<FormType> & TextFieldProps & FormInputTextMaskProps) {
  const [valueX, setValue] = useState("");
  const handleKeyUp = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (mask === "cep") {
        cep(e);
      }
      if (mask === "currency") {
        currency(e);
      }
      if (mask === "cpf") {
        cpf(e);
      }
      if (mask === "phone") {
        phone(e);
      }
    },
    [mask]
  );
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, value, onChange },
        fieldState: { error },
      }) => (
        <TextField
          helperText={error ? error.message : helper}
          size="small"
          error={!!error}
          onBlur={onBlur}
          onChange={(e) => {
            handleKeyUp(e);
            setValue(e.target.value);
            onChange(e);
          }}
          value={value || valueX}
          fullWidth
          label={label}
          variant="outlined"
          {...TextFieldProps}
        />
      )}
    />
  );
}
