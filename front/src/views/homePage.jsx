import NavBar from "../components/navBar";
import TaskDisplay from "../components/taskDisplay";
import CreateTask from "../components/createTask";
import EditTask from "../components/editTask";
import Modal from "../components/modal";
import { useUserTaskContext } from "../context/userTaskContext";

const HomePage = () => {
  const { modalIsVisible, isEditing } = useUserTaskContext();

  return (
    <>
      <NavBar />
      <div className="w-screen  flex justify-center items-center">
        <TaskDisplay />
        {modalIsVisible && <Modal />}
        {isEditing ? <EditTask /> : <CreateTask />}
      </div>
    </>
  );
};

export default HomePage;
