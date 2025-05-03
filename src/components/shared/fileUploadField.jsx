import { CloudUpload } from "@mui/icons-material";
import { Button, FormControl, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const FileUpload = ({
  name,
  control,
  errors,
  accept,
  label,
  hint,
  required = true,
  variant = "box",
  onChangeHandler,
}) => {
  return (
    <FormControl error={!!errors?.[name]} className="!flex !flex-col !gap-2">
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => (
          <>
            {variant === "box" ? (
              <div
                className="!flex !flex-col !items-center !gap-2 !border-dashed !border-2 !border-gray-300 !rounded-lg !p-4 hover:!border-gray-500 cursor-pointer"
                onClick={() =>
                  document.getElementById(`${name}-upload`).click()
                }
              >
                <CloudUpload
                  fontSize="large"
                  color={errors?.[name] ? "error" : "action"}
                />
                <Typography
                  variant="body2"
                  color={errors?.[name] ? "error" : "text.secondary"}
                >
                  {label}
                </Typography>
                {hint && (
                  <Typography variant="caption" color="text.secondary">
                    {hint}
                  </Typography>
                )}
                <input
                  id={`${name}-upload`}
                  type="file"
                  hidden
                  accept={accept}
                  onChange={(e) => {
                    onChangeHandler(e, field);
                  }}
                />
              </div>
            ) : (
              <Button
                component="label"
                variant="outlined"
                className="!rounded-xl !border-dashed !border-2 !border-gray-300 !p-4 hover:!border-gray-500"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                {label}
                <input
                  required={required}
                  hidden
                  type="file"
                  accept={accept}
                  onChange={(e) => {
                    onChangeHandler(e, field);
                  }}
                />
              </Button>
            )}
            {errors?.[name] && (
              <Typography variant="caption" color="error" className="!mt-1">
                {errors[name].message}
              </Typography>
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default FileUpload;
