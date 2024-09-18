import { useUserTaskContext } from "../context/userTaskContext";
import { IoIosAddCircleOutline } from "react-icons/io";

const AddTaskButton = () => {
  const { handleVisibility } = useUserTaskContext();

  return (
    <div className="w-full flex justify-center mb-10">
      <button onClick={handleVisibility}>
        <IoIosAddCircleOutline size={46} />
      </button>
    </div>
  );
};

export default AddTaskButton;
