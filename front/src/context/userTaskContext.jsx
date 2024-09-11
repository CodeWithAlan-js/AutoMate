import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserTaskContext = createContext();

export const UserTaskProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");

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

  console.log(task);

  return (
    <UserTaskContext.Provider value={{ task, error }}>
      {children}
    </UserTaskContext.Provider>
  );
};

export const useUserTaskContext = () => {
  return useContext(UserTaskContext);
};
