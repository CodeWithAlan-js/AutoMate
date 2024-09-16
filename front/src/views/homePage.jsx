import NavBar from "../components/navBar";
import TaskDisplay from "../components/taskDisplay";
import CreateTask from "../components/createTask";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="w-screen h-screen relative flex justify-center items-center">
        <CreateTask />
        <TaskDisplay />
      </div>
    </>
  );
};

export default HomePage;
