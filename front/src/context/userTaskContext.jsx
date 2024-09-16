import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const UserTaskContext = createContext();

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
    case "RESET_TASK":
      return initialTaskData;
    default:
      return state;
  }
};

export const UserTaskProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [taskData, dispatch] = useReducer(taskReducer, initialTaskData);

  const handleCheckboxChange = (e, name) => {
    const { checked } = e.target;
    dispatch({ type: "UPDATE_FIELD", payload: { name, value: checked } });
  };

  const handleInputChange = (e, name) => {
    const { value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    dispatch({ type: "UPDATE_FIELD", payload: { name, value: inputValue } });
  };

  useEffect(() => {
    const fetchTasks = async () => {
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
    };

    fetchTasks();
  }, []);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleAddTask = async () => {
    console.log(taskData);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/task/addTask`,
        taskData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setTask([...task, response.data.task]);
      dispatch({ type: "RESET_TASK" });
      handleVisibility();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <UserTaskContext.Provider
      value={{
        task,
        error,
        isVisible,
        taskData,
        handleInputChange,
        handleCheckboxChange,
        handleVisibility,
        handleAddTask,
      }}
    >
      {children}
    </UserTaskContext.Provider>
  );
};

export const useUserTaskContext = () => {
  return useContext(UserTaskContext);
};
