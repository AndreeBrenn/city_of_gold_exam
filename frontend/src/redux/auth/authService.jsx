import axios from "axios";
import { API_URL } from "../../utils/urls";

const loginUser = async (userData) => {
  const response = await axios.post(API_URL + "auth/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem("user");
};

const authService = {
  loginUser,
  logoutUser,
};

export default authService;
