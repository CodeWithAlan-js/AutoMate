import { useUserTaskContext } from "../context/userTaskContext";
import EditButton from "./editButton";
import AddTaskButton from "./addTaskButton";
import DeleteTaskButton from "./deleteTaskButton";

const TaskDisplay = () => {
  const { task, error } = useUserTaskContext();

  return (
    <div className="min-h-screen flex flex-col w-screen justify-center items-center">
      <h1 className="text-3xl mt-32 mb-4 flex justify-center underline underline-offset-4 italic">
        Vehicles
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      {task.length > 0 ? (
        <ul className="lg:flex justify-around pl-6 pr-6 lg:w-full flex-wrap items-center ">
          {task.map((taskItem) => (
            <li
              className={`card card-compact bg-base-100 p-6 w-96 gap-2 mb-10 border ${
                taskItem.vehicle.repairDetails.completed
                  ? " shadow-lg shadow-green-200"
                  : "shadow-lg shadow-orange-200"
              }`}
              key={taskItem._id}
            >
              <div className="flex justify-between mb-4 items-center">
                <EditButton id={taskItem._id} />
                <DeleteTaskButton id={taskItem._id} />
              </div>
              <div>
                <h3 className="italic mb-2 font-semibold">Owner Info:</h3>
              </div>
              <div className="flex space-x-1">
                <p> {taskItem.ownerDetails.lastName}</p>
                <p> {taskItem.ownerDetails.firstName}</p>
              </div>
              <p>Phone : {taskItem.ownerDetails.phone}</p>
              <div className=" mt-2 mb-2 w-full border  border-black rounded"></div>

              <h3 className="italic mb-2 font-semibold">Vehicle Info:</h3>
              <p>Brand: {taskItem.vehicle.brand}</p>
              <p>Model: {taskItem.vehicle.model}</p>
              <p>Licence Plate: {taskItem.vehicle.licencePlate}</p>
              <div className=" mt-2 mb-2 w-full border  border-black rounded"></div>

              <h3 className="italic mb-2 font-semibold">Repair Details:</h3>
              <p className="mb-2">
                Diagnostic: {taskItem.vehicle.repairDetails.diagnostic}
              </p>
              <p>
                Parts to order:{" "}
                {taskItem.vehicle.repairDetails.partToOrder || "/"}
              </p>
              <p>
                Ordered: {taskItem.vehicle.repairDetails.ordered ? "Yes" : "No"}
              </p>
              <p>Price: {taskItem.vehicle.repairDetails.price || "/"}$</p>
              <p>
                Expected Time:{" "}
                {new Date(
                  taskItem.vehicle.repairDetails.expectedTime
                ).toLocaleDateString()}
              </p>
              <p>
                Completed:{" "}
                {taskItem.vehicle.repairDetails.completed ? "Yes" : "No"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex w-screen justify-center items-center flex-col">
          <h2 className="text-black">Click on the plus to add a vehicle</h2>
        </div>
      )}
      <AddTaskButton />
    </div>
  );
};

export default TaskDisplay;
