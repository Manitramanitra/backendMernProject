import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../@shared/Input";
import dataInputSignup from "../staticData/dataInputSignup";
import ButtonSubmit from "../@shared/ButtonSubmit";
import TermsCheckbox from "../@shared/TermsCheckbox";
import toast, { Toaster } from "react-hot-toast";
import { createUser } from "../action/createUser";
import SignInForm from "./SignInForm";

function SignUpForm() {
  const [formSubmit, setFormSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data.confirmPassword !== data.password) {
      toast.error("confirm password and password is different", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }
    const response = await createUser(data);
    console.log(response);
    if (response.user) {
      setFormSubmit(true);
    } else if (response.email != "") {
      toast.error(response.email);
      return;
    } else if (response.pseudo != "") {
      toast.error(response.pseudo);
      return;
    } else if (response.password != "") {
      toast.error(response.password);
      return;
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />{" "}
          <span></span>
          <h4 className="success">
            {" "}
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} id="sign-up-form">
          {dataInputSignup.map((field, index) => {
            return (
              <Input
                key={index}
                {...field}
                register={register}
                errors={errors}
              />
            );
          })}
          <TermsCheckbox
            fieldName="terms"
            linkUrl="/"
            register={register}
            errors={errors}
            linkText="conditions générales"
          />
          <ButtonSubmit isDisable={true} value="Valider inscription" />
          <Toaster />
        </form>
      )}
    </>
  );
}

export default SignUpForm;
