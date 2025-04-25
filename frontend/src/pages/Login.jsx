import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../redux/auth/authSlice";

const Login = () => {
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoadingUser, isErrorUser, isSuccessUser, messageUser } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isErrorUser) {
      alert(messageUser);
    }
    if (isSuccessUser || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isErrorUser, isSuccessUser, messageUser, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(inputFields));
  };

  return (
    <div className="flex h-screen w-screen bg-white">
      <title>Login</title>

      <img
        src="/bglogin.jpg"
        alt="login_pic"
        className="absolute w-full h-full pointer-events-none opacity-60 object-cover"
      />

      <div className="flex-[0.5] flex items-center justify-center z-40 class <md:flex-1">
        <form
          onSubmit={handleSubmit}
          className="flex w-[550px] h-[650px] border border-black rounded-md flex-col items-center justify-center <md:h-full <md:w-full <md:p-2 <md:bg-black/50"
        >
          <label className="font-Righteous text-black absolute mb-[500px] text-[80px] flex items-center <md:text-[30px] <md:mb-0 <md:static">
            Todo List App
          </label>

          <div className="block mt-20 <md:w-[70%] <md:mt-3">
            <label className="text-black font-Roboto text-xl flex items-center mb-3 <md:text-[10px] <md:mb-1">
              <HiUser className="text-black h-5 w-5 mr-1 <md:w-3 <md:h-3" />{" "}
              Username
            </label>
            <input
              className="outline-none w-[400px] mb-12 block bg-transparent text-black border-b border-b-black <md:w-full <md:text-[8px]"
              type="text"
              placeholder="Username"
              required
              onChange={(e) =>
                setInputFields({ ...inputFields, username: e.target.value })
              }
              value={inputFields.username}
            />
          </div>
          <div className="block <md:w-[70%]">
            <label className="text-black font-Roboto text-xl flex items-center mb-3  <md:text-[10px] <md:mb-1">
              <FaLock className="text-black h-5 w-5 mr-1 <md:w-3 <md:h-3" />{" "}
              Password
            </label>
            <input
              className="outline-none w-[400px] mb-12 block bg-transparent text-black border-b border-b-black <md:w-full <md:text-[8px] <md:mb-7"
              placeholder="Password"
              type="password"
              required
              onChange={(e) =>
                setInputFields({ ...inputFields, password: e.target.value })
              }
              value={inputFields.password}
            />
          </div>
          <div className="flex justify-between w-[70%] mt-12  <md:flex-col <md:items-center <md:mt-0">
            <button
              className="text-white bg-blue-600 w-[160px] h-[40px] transition-all duration-500 rounded-xl hover:bg-green-700 items-center justify-center flex <md:mb-5 <md:w-full <md:h-[40%]"
              type="submit"
              disabled={isLoadingUser}
            >
              Login
            </button>
            <Link to="/Register">
              <button className="text-white bg-green-800 w-[160px] h-[40px] transition-all duration-500 rounded-xl hover:bg-violet-500 <md:w-full <md:h-[40%]">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
      <div className="flex-[0.5] flex <md:hidden"></div>
    </div>
  );
};

export default Login;
