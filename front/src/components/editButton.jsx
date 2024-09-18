import { useUserTaskContext } from "../context/userTaskContext";

const EditButton = ({ id }) => {
  const { fetchTaskById } = useUserTaskContext();

  return (
    <button
      onClick={() => fetchTaskById(id)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Edit
    </button>
  );
};

export default EditButton;
