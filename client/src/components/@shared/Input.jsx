import React from "react";


function Input({ label, type, id, register, errors, name, message }) {
  return (
    <>
    <div>
      <label htmlFor={id}>{label}</label>
    <br />
    <input
      {...register(name, {
        required: { value: true, message: message },
      })}
      type={type}
      name={name}
      id={id}
    />
    {errors[`${name}`] && (
      <div>
        <small style={{color:"red"}}>{errors[`${name}`].message}</small>
      </div>
    )}
    </div>
    <br />
    </>
  )
}

export default Input
