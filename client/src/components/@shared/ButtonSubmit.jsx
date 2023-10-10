import React from "react";

function ButtonSubmit({ value, isDiasable }) {
  return <input type="submit"  disabled={isDiasable} value={value} />;
}

export default ButtonSubmit;
