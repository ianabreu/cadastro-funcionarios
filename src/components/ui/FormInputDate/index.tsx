import { FieldValues, UseControllerProps, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

export function FormInputDate<FormType extends FieldValues>({
  label,
  control,
  name,
}: UseControllerProps<FormType> & TextFieldProps) {
  return (
    <div style={{ marginTop: 0, flex: 1 }}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextField
            type="date"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            variant="outlined"
            size="small"
            fullWidth
            helperText={error ? error.message : label}
            error={!!error}
          />
        )}
      />
    </div>
  );
}
