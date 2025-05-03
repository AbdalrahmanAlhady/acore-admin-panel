import { Button, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FormTextField } from "../shared/formTextField";


export default function Login() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("email",JSON.stringify(data.email) );
    navigate("/books");
  };

  return (
    <div className="h-full content-center mt-15">
      <div className="flex flex-row justify-center w-full h-[60%]">
        <form
          noValidate
          className="w-1/2 flex flex-col gap-3 min-h-full p-[5%] justify-center shadow-lg bg-white rounded-l-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl font-bold mb-5 text-left">
            Please enter your email address and password to access your account
          </h1>

          <FormTextField
            name="email"
            control={control}
            errors={errors}
            label="Email address"
            type="email"
            required
            formElementColor={true}
            rules={{
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email format",
              },
            }}
          />

          <FormTextField
            name="password"
            control={control}
            errors={errors}
            label="Password"
            type="password"
            required
            formElementColor={true}
            rules={{
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />

          <a className="text-blue-500 mb-5 w-fit cursor-pointer hover:underline">
            Forgot password?
          </a>

          <Button
            className="w-1/4 !mb-5 !rounded-2xl !p-3  !font-bold !text-[16px]"
            type="submit"
            size="lg"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Divider />
          <img src="/logo.png" className="w-25 h-25 mt-5" />
        </form>

        <img
          className="w-1/3 min-h-full rounded-r-2xl shadow-lg object-cover"
          src="/login-cover.png"
          alt="Login cover image"
        />
      </div>
    </div>
  );
}
