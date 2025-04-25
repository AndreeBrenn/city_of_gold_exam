import axios from "axios";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { API_URL } from "../utils/urls";

const EditTask = ({ token, setEditTaskModal, editTaskModal, setTaskData }) => {
  const [inputFields, setInputFields] = useState({
    Description: editTaskModal.Description,
    Status: editTaskModal.Status,
  });
  const [loading, setLoading] = useState(false);

  const updateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.put(
        API_URL + `todos/${editTaskModal.ID}`,
        inputFields,
        config
      );

      setTaskData(res.data);
      alert("Data Successfully Updated");
    } catch (error) {
      alert(error.response?.data?.message ?? "Internal server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex  justify-center fixed top-0 left-0 bg-white">
      <IoIosCloseCircle
        onClick={() => setEditTaskModal(null)}
        className="absolute right-2 top-2 text-[3rem] cursor-pointer text-red-600"
      />
      <form onSubmit={updateTask} className="flex flex-col mt-12 w-[30rem]">
        <span className="font-bold text-[2.5rem]">EDIT TASK </span>
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

        <div className="flex justify-between mt-6">
          <span className="font-semibold text-[1rem] mr-2">Mark as Done:</span>
          <input
            onChange={(e) =>
              setInputFields({ ...inputFields, Status: e.target.checked })
            }
            checked={inputFields.Status}
            type="checkbox"
            required
            className="w-[15rem] border border-black"
          />
        </div>

        <button
          type="submit"
          className="mt-[4rem] bg-blue-500 text-white p-2 rounded-md w-[90%] m-auto"
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditTask;
