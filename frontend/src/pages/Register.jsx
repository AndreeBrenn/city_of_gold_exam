import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/urls";

const Register = () => {
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();
    try {
      if (inputFields.password != inputFields.confirmPassword) {
        alert("Password doesn't match");
        return;
      }

      const res = await axios.post(API_URL + "auth/register", {
        username: inputFields.username,
        password: inputFields.password,
      });

      alert("New user is created");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-white items-center justify-center">
      <title>Register</title>

      <img
        src="/bgregister.jpg"
        alt="register_bg"
        className="w-screen h-screen object-cover opacity-20 pointer-events-none"
      />
      <form
        onSubmit={RegisterUser}
        className="flex h-[550px] w-[400px] items-center justify-center absolute bg-white rounded-md <md:h-full <md:w-full <md:bg-black/50"
      >
        <div className="flex flex-col items-center  justify-center ">
          <label className="text-black font-Roboto text-[25px] font-semibold mb-2">
            REGISTER TO LISTEN
          </label>

          <input
            className="border border-blue-400 outline-none mt-7 w-72 placeholder-violet-600"
            placeholder="Username"
            name="Username"
            required
            type="text"
            onChange={(e) =>
              setInputFields({ ...inputFields, username: e.target.value })
            }
            value={inputFields.username}
          />
          <input
            className="border border-blue-400 outline-none mt-7 w-72 placeholder-violet-600"
            placeholder="Password"
            name="password"
            type="password"
            required
            onChange={(e) =>
              setInputFields({ ...inputFields, password: e.target.value })
            }
            value={inputFields.password}
          />
          <input
            className="border border-blue-400 outline-none mt-7 w-72 placeholder-violet-600"
            placeholder="Confirm Password"
            type="password"
            required
            onChange={(e) =>
              setInputFields({
                ...inputFields,
                confirmPassword: e.target.value,
              })
            }
            value={inputFields.confirmPassword}
          />
          <button
            className="flex items-center h-10 w-60 rounded-md justify-center transition-all duration-300 text-white bg-green-600 mt-10 hover:bg-green-700"
            type="submit"
          >
            Register
          </button>
          <Link to="/">
            <button
              type="button"
              className="flex items-center h-10 w-60 rounded-md justify-center transition-all duration-300 text-white bg-red-600 mt-10 hover:bg-red-700"
            >
              Back to login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
