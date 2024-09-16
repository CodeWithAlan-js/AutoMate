import { useUserTaskContext } from "../context/userTaskContext";
import { IoIosAddCircleOutline } from "react-icons/io";

const TaskDisplay = () => {
  const { task, error, isVisible, handleVisibility } = useUserTaskContext();

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {task.length > 0 ? (
        <ul>
          {task.map((taskItem) => (
            <li className="text-black" key={taskItem._id}>
              <h2>Vehicle Info:</h2>
              <p>
                <strong>Brand:</strong> {taskItem.vehicle.brand}
              </p>
              <p>
                <strong>Model:</strong> {taskItem.vehicle.model}
              </p>
              <p>
                <strong>Licence Plate:</strong> {taskItem.vehicle.licencePlate}
              </p>
              <h3>Repair Details:</h3>
              <p>
                <strong>Description:</strong>{" "}
                {taskItem.vehicle.repairDetails.description}
              </p>
              <p>
                <strong>Price:</strong> ${taskItem.vehicle.repairDetails.price}
              </p>
              <p>
                <strong>Expected Time:</strong>{" "}
                {new Date(
                  taskItem.vehicle.repairDetails.expectedTime
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Completed:</strong>{" "}
                {taskItem.vehicle.repairDetails.completed ? "Yes" : "No"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex w-screen h-screen justify-center items-center flex-col">
          <h2 className="text-black">Click on the plus to add a vehicle</h2>
          <button onClick={handleVisibility}>
            <IoIosAddCircleOutline size={46} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDisplay;
