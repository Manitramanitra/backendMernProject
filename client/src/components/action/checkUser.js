import axios from "axios";

export const checkUser = async () => {
  try {
    const response = await axios.post("http://localhost:5000/jwtid", {
      jwt: localStorage.getItem("authToken"),
    });
    return response.data;
  } catch (error) {
    console.log("Erreur lors de la vérification du token :", error);
    return null; 
  }
};
