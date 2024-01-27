import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../components/action/login";
import Input from "../../components/@shared/Input";
import { handleTokenReceivedAndSave } from "../../components/action/saveToken";
import dataInputLogin from "../../components/staticData/dataInputLogin";
import ButtonSubmit from "../../components/@shared/ButtonSubmit";
import { toast, Toaster } from "react-hot-toast";

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const datas = await login(data);
    if (datas.errors) {
      toast.error(datas.errors, {
        style: {
          background: "red", // Couleur de fond
          color: "white", // Couleur du texte
        },
      });
    } else {
      handleTokenReceivedAndSave(datas.token);
      window.location = "/";
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="sign-up-form">
        {dataInputLogin.map((field, index) => {
          return (
            <Input key={index} register={register} errors={errors} {...field} />
          );
        })}

        <ButtonSubmit isDisable={true} value="Connection" />
        <br />
        <a href=""><small>forgot password?</small> </a>
      </form>
      <Toaster />
    </>
  );
}

export default SignInForm;
