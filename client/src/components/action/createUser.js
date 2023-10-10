import axios from "axios";

export function createUser(data) {
  return axios
    .post("http://localhost:5000/api/user/register", { ...data })
    .then((res) => res.data);
}