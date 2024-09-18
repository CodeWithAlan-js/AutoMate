import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import io from "socket.io-client";
import { useUserContext } from "./userContext";

const UserTaskContext = createContext();
const socket = io("http://localhost:3001");

const initialTaskData = {
  ownerDetails: {
    lastName: "",
    firstName: "",
    phone: "",
  },
  vehicle: {
    brand: "",
    model: "",
    licencePlate: "",
    repairDetails: {
      diagnostic: "",
      partToOrder: "",
      ordered: false,
      price: 0,
      expectedTime: new Date(),
      completed: false,
    },
  },
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "RESET_TASK":
      return {
        ownerDetails: {
          lastName: "",
          firstName: "",
          phone: "",
        },
        vehicle: {
          brand: "",
          model: "",
          licencePlate: "",
          repairDetails: {
            diagnostic: "",
            partToOrder: "",
            ordered: false,
            price: 0,
            expectedTime: new Date(),
            completed: false,
          },
        },
      };
    case "UPDATE_FIELD": {
      const { name, value } = action.payload;
      const keys = name.split(".");
      let newState = { ...state };

      let field = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        field = field[keys[i]];
      }
      field[keys[keys.length - 1]] = value;

      return newState;
    }
    case "SET_TASK_DATA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const UserTaskProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const { user } = useUserContext();
  const [taskData, dispatch] = useReducer(taskReducer, initialTaskData);

  const handleCreateVisibility = useCallback(() => {
    setIsCreateVisible((prev) => !prev);
    dispatch({ type: "RESET_TASK" });
  }, []);

  const handleEditVisibility = useCallback(() => {
    setIsEditVisible((prev) => !prev);
  }, []);

  const fetchTasks = useCallback(async () => {
    if (user) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/task/getTasks`,
          {
            withCredentials: true,
          }
        );
        setTask(response.data.tasks);
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/task/addTask",
        taskData,
        {
          withCredentials: true,
        }
      );
      setModalIsVisible(true);
      setIsCreateVisible(false);
      setModalMessage(response.data.message);
      setTimeout(() => setModalIsVisible(false), 2000);
      dispatch({ type: "RESET_TASK" });
      console.log("Task Data after reset:", taskData);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleUpdateTask = useCallback(
    async (id) => {
      try {
        const response = await axios.put(
          `http://localhost:3001/api/task/updateTask/${id}`,
          taskData,
          {
            withCredentials: true,
          }
        );
        setModalIsVisible(true);
        setModalMessage(response.data.message);
        setTimeout(() => setModalIsVisible(false), 2000);
        dispatch({ type: "RESET_TASK" });
      } catch (error) {
        console.log(error);
      }
    },
    [taskData]
  );

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/task/deleteTask/${id}`,
        {
          withCredentials: true,
        }
      );
      setModalIsVisible(true);
      setModalMessage(response.data.message);
      setTimeout(() => setModalIsVisible(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTaskById = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/task/getTask/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "SET_TASK_DATA", payload: response.data.task });
      setUpdateId(id);
      setIsEditVisible(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFieldChange = (e, name) => {
    const { value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    dispatch({ type: "UPDATE_FIELD", payload: { name, value: inputValue } });
  };

  useEffect(() => {
    if (user) {
      fetchTasks();

      socket.on("newTask", (newTask) => {
        setTask((prevTasks) => [...prevTasks, newTask]);
      });

      socket.on("updateTask", (updatedTask) => {
        setTask((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      });

      socket.on("deleteTask", (deletedTaskId) => {
        setTask((prevTasks) =>
          prevTasks.filter((task) => task._id !== deletedTaskId)
        );
      });

      return () => {
        socket.off("newTask");
        socket.off("updateTask");
        socket.off("deleteTask");
      };
    }
  }, [user, fetchTasks]);

  return (
    <UserTaskContext.Provider
      value={{
        task,
        error,
        taskData,
        handleFieldChange,
        handleAddTask,
        isCreateVisible,
        handleCreateVisibility,
        isEditVisible,
        handleEditVisibility,
        handleUpdateTask,
        handleDeleteTask,
        fetchTaskById,
        modalMessage,
        modalIsVisible,
        updateId,
        setUpdateId,
      }}
    >
      {children}
    </UserTaskContext.Provider>
  );
};

export const useUserTaskContext = () => {
  return useContext(UserTaskContext);
};
