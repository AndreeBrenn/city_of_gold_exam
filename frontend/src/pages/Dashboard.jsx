import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/urls";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { logout } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import AddNewTask from "../modal/AddNewTask";
import EditTask from "../modal/EditTask";

const Dashboard = () => {
  const [taskData, setTaskData] = useState([]);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(null);
  const token = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTaskBy = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(API_URL + "todos", config);

        setTaskData(res.data);
      } catch (error) {
        alert(error.response.data?.message ?? "Internal Server error");
      }
    };

    getTaskBy();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const delete_task = async (e, ID) => {
    e.preventDefault();
    try {
      if (window.confirm("Are you sure you want to delete this record ?")) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.delete(API_URL + `todos/${ID}`, config);

        setTaskData(res.data);
      }
    } catch (error) {
      alert(error.response.data?.message ?? "Internal Server error");
    }
  };

  return (
    <div className="w-full px-4 py-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Task</h2>

      <div className="w-full flex justify-between">
        <button
          onClick={() => setAddTaskModal(!addTaskModal)}
          className="bg-blue-600 p-2 w-[15rem] rounded-md text-white"
        >
          Add Task
        </button>
        <button
          onClick={() => {
            dispatch(logout());
          }}
          className="bg-red-600 p-2 w-[15rem] rounded-md text-white"
        >
          Logout
        </button>
      </div>

      {/* Full table for medium screens and up */}
      <div className=" md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-3 text-left">
                <span>Description</span>
              </th>
              <th className="py-3 text-left">
                <span>Date Created</span>
              </th>

              <th className="py-3 text-left">
                <span>Status</span>
              </th>
              <th className="py-3 text-left">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((data) => (
              <tr
                key={data.ID}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 text-gray-800">{data.Description}</td>
                <td className="py-3 text-gray-800">
                  {moment(data.createdAt).format("YYYY-MM-DD, hh:mm A")}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.Status == 1
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {data.Status == 1 ? "Done" : "Ongoing"}
                  </span>
                </td>

                <td className="flex items-center pt-2">
                  <button className="p-2 bg-yellow-600 text-white flex items-center justify-center rounded-md">
                    <FaEdit onClick={() => setEditTaskModal(data)} />
                  </button>
                  <button
                    onClick={(e) => delete_task(e, data.ID)}
                    className="p-2 ml-2 bg-red-600 text-white flex items-center justify-center rounded-md"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addTaskModal && (
        <AddNewTask
          token={token}
          setAddTaskModal={setAddTaskModal}
          setTaskData={setTaskData}
        />
      )}
      {editTaskModal && (
        <EditTask
          token={token}
          setEditTaskModal={setEditTaskModal}
          editTaskModal={editTaskModal}
          setTaskData={setTaskData}
        />
      )}
    </div>
  );
};

export default Dashboard;
