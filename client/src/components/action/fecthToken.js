import axios from "axios";

export async function  fetchToken(idUser) {
  return axios
    .get("http://localhost:5000/jwtid")
    .then((res) => res.data)
    .catch((err)=>console.log(err))
}
