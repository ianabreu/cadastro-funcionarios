import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";

export function FormInputText<FormType extends FieldValues>({
  name,
  control,
  label,
  helper = "",
  ...TextFieldProps
}: UseControllerProps<FormType> & TextFieldProps & { helper?: string }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <TextField
          helperText={error ? error.message : helper}
          size="small"
          error={!!error}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          {...TextFieldProps}
        />
      )}
    />
  );
}
