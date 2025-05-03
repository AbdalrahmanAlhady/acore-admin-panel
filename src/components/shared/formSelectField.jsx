import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

export const FormSelect = ({
  name,
  control,
  errors,
  label,
  options,
  required = false,
  className = "",
  formElementColor = false,
}) => (
  <FormControl required={required} error={!!errors[name]} className={className}>
    <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} is required` } : {}}
      render={({ field }) => (
        <Select
          {...field}
          className="shadow-sm"
          onChange={(e) => field.onChange(e.target.value)}
          variant="outlined"
          labelId={`${name}-label`}
          error={!!errors[name]}
          label={label}
          required={required}
          value={field.value || ""}
          sx={{
            borderRadius: 3,
            backgroundColor: formElementColor ? "#f2f8ff" : "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: formElementColor ? "#f2f8ff" : "rgba(0, 0, 0, 0.23)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: formElementColor ? "#f2f8ff" : "rgba(0, 0, 0, 0.87)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: formElementColor ? "#f2f8ff" : "#1976d2",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  </FormControl>
);
