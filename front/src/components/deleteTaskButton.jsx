import { useUserTaskContext } from "../context/userTaskContext";
import { MdDeleteForever } from "react-icons/md";

const DeleteTaskButton = ({ id }) => {
  const { handleDeleteTask } = useUserTaskContext();

  return (
    <button onClick={() => handleDeleteTask(id)} className="float-right">
      <MdDeleteForever size={30} />
    </button>
  );
};

export default DeleteTaskButton;
