import { useUserTaskContext } from "../context/userTaskContext";
import { IoIosAddCircleOutline } from "react-icons/io";

const AddTaskButton = () => {
  const { handleCreateVisibility } = useUserTaskContext();

  return (
    <div className="w-full flex justify-center mb-10">
      <button onClick={handleCreateVisibility}>
        <IoIosAddCircleOutline size={46} />
      </button>
    </div>
  );
};

export default AddTaskButton;
