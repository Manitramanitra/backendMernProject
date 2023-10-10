import axios from "axios";

export function login(data) {
  return axios
    .post("http://localhost:5000/api/user/login", { ...data })
    .then((res) => res.data);
}
