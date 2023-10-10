import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../action/login";
import Input from "../@shared/Input";
import { handleTokenReceivedAndSave } from "../action/saveToken";
import dataInputLogin from "../staticData/dataInputLogin";
import ButtonSubmit from "../@shared/ButtonSubmit";
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
      </form>
      <Toaster />
    </>
  );
}

export default SignInForm;
