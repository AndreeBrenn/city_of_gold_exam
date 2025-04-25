import axios from "axios";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { API_URL } from "../utils/urls";

const AddNewTask = ({ token, setAddTaskModal, setTaskData }) => {
  const [inputFields, setInputFields] = useState({
    Description: "",
  });

  const [loading, setLoading] = useState(false);

  const submitTask = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(
        API_URL + "todos",
        { Description: inputFields.Description },
        config
      );

      alert("New Task created");

      setTaskData((prev) => [...prev, res.data]);
    } catch (error) {
      alert(error.response?.data?.message ?? "Internal Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex  justify-center fixed top-0 left-0 bg-white">
      <IoIosCloseCircle
        onClick={() => setAddTaskModal(false)}
        className="absolute right-2 top-2 text-[3rem] cursor-pointer text-red-600"
      />
      <form onSubmit={submitTask} className="flex flex-col mt-12 w-[30rem]">
        <span className="font-bold text-[2.5rem]">NEW TASK </span>
        <div className="flex justify-between mt-6">
          <span className="font-semibold text-[1rem] mr-2">Description:</span>
          <input
            onChange={(e) =>
              setInputFields({ ...inputFields, Description: e.target.value })
            }
            value={inputFields.Description}
            required
            className="w-[15rem] border border-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-[4rem] bg-blue-500 text-white p-2 rounded-md w-[90%] m-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewTask;
