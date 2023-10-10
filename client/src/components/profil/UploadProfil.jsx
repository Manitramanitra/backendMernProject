import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ButtonSubmit from "../@shared/ButtonSubmit";
import Input from "../@shared/Input";
function UploadProfil() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.user)
  const utilData = {}
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (data) =>{
    const utilData = {
      ...data,
      userId: userData.data._id,
      name: userData.data.pseudo
    }
    console.log('====================================');
    console.log(utilData)
    console.log('====================================');
  }
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="upload-pic">
      <label htmlFor="file">Choisir l'image</label>
      <input
        {...register("file", {
          required: { value: true, message: "veuillez entrer une image" },
        })}
        type="file"
        id="file"
        accept=".jpg, .png, .jpeg"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <ButtonSubmit value="Envoyer" />
    </form>
  );
}

export default UploadProfil;
