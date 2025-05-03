import {
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const FormTextField = ({
  name,
  control,
  errors,
  label,
  required = false,
  type = "text",
  rules = {},
  className = "",
  multiline = false,
  maxLength,
  helperText,
  rows,
  disabled = false,
  formElementColor,
}) => {
  const [charCount, setCharCount] = useState(0);

  return (
    <FormControl
      required={required}
      error={!!errors[name]}
      className={className}
      disabled={disabled}
    >
      <Controller
        name={name}
        control={control}
        rules={{
          ...(required && { required: `${label} is required` }),
          ...rules,
        }}
        render={({ field }) => (
          <TextField
            size="small"
            disabled={disabled}
            {...field}
            id={name}
            label={label}
            variant="outlined"
            type={type}
            required={required}
            multiline={multiline}
            rows={rows}
            onChange={(e) => {
              field.onChange(e);
              setCharCount(e.target.value.length);
            }}
            InputProps={{
              sx: {
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                borderRadius: 3,
                backgroundColor: formElementColor ? "#f2f8ff" : "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: formElementColor
                    ? "#f2f8ff"
                    : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: formElementColor
                    ? "#f2f8ff"
                    : "rgba(0, 0, 0, 0.87)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: formElementColor ? "#f2f8ff" : "#1976d2",
                },
              },
              endAdornment: multiline && (
                <InputAdornment position="end">
                  <Typography
                    variant="caption"
                    color={charCount > maxLength ? "error" : "textSecondary"}
                  >
                    {charCount}/{maxLength}
                  </Typography>
                </InputAdornment>
              ),
            }}
            error={!!errors[name]}
            helperText={errors[name]?.message || helperText}
            InputLabelProps={type === "date" ? { shrink: true } : undefined}
          />
        )}
      />
    </FormControl>
  );
};
