import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changeImageUser } from "../../redux/actionCreator";
import ButtonSubmit from "../../components/@shared/ButtonSubmit";
import { toast, Toaster } from "react-hot-toast";
function UploadProfil() {
  const [file, setFile] = useState();
  const [previewSource, setPreviewSource] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const utilData = new FormData();
  let userId = null;
  if (userData.data._id) {
    userId = userData.data._id;
  }  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = () => {
    utilData.append("file", file);
    utilData.append("userId", userId);
    dispatch(changeImageUser(utilData, userId));
  };

  if (userData.error) {
    toast.error(userData.error, {
      style: {
        background: "red",
        color: "white", 
      },
    });
    // dispatch(resetError());
  } else {
    // window.location.reload()
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
        onChange={(e) => {
          setFile(e.target.files[0]);
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onloadend = () => {
            setPreviewSource(reader.result);
          };
        }}
      />
      <br />
      <ButtonSubmit value="Envoyer" />
      <Toaster />
    </form>
  );
}

export default UploadProfil;
