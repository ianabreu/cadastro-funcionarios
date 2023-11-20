import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { RoleOrSection } from "../../../contexts/employee";

export function FormInputSelect<FormType extends FieldValues>({
  name,
  control,
  label,
  options,
}: UseControllerProps<FormType> & {
  label: string;
  helper?: string;
  options: RoleOrSection[] | null;
  errorSelect?: boolean;
}) {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <FormControl fullWidth variant="outlined" error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select
            size="medium"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value || selectedValue}
            label={label}
            onChange={(e) => {
              setSelectedValue(e.target.value);
              onChange(e.target.value);
            }}
            onBlur={onBlur}
          >
            {options &&
              options.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
