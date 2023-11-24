import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changeImageUser } from "../../redux/actionCreator";
import ButtonSubmit from "../@shared/ButtonSubmit";
function UploadProfil() {
  const [file, setFile] = useState();
  const [previewSource, setPreviewSource] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const utilData = new FormData();
  const userId = localStorage.getItem("authToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (data) => {
    utilData.append("file", file);
    utilData.append("userId", userData.data._id);
    // console.log(utilData,userData.data._id);
    dispatch(changeImageUser(utilData, userId));
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="upload-pic">
      <label htmlFor="file">Choisir l'image</label>
      {/* <span style={{display: "flex"}}> */}
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
      {/* {previewSource && (
          <img
            src={previewSource}
            alt="chosen"
            style={{ height: "50px", width: "auto", borderRadius: "50%" }}
          />
        )} */}
      {/* </span> */}
      <br />
      <ButtonSubmit value="Envoyer" />
    </form>
  );
}

export default UploadProfil;
