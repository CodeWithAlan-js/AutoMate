import { useUserTaskContext } from "../context/userTaskContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { carBrands } from "../utils";
import Select from "react-select";
import InputField from "./inputField";
import SectionTitle from "./sectionTitle";

const CreateTask = () => {
  const {
    isVisible,
    handleVisibility,
    handleInputChange,
    handleCheckboxChange,
    handleAddTask,
  } = useUserTaskContext();

  const brandOptions = carBrands
    .sort()
    .map((brand) => ({ value: brand, label: brand }));

  return (
    <>
      {isVisible && (
        <div className="w-full h-full absolute bg-black bg-opacity-40 flex justify-center items-center">
          <div className="w-4/5 h-4/5 bg-white overflow-auto">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl">Add a vehicle</h2>
              <button onClick={handleVisibility}>
                <IoCloseCircleOutline size={40} />
              </button>
            </div>
            <div>
              <form>
                <div className="flex flex-col p-8">
                  <SectionTitle title={"Owner details"} />
                  <div className="flex flex-col pb-4 pt-4">
                    <label>Last Name :</label>
                    <InputField
                      placeholder={"Last Name"}
                      onChange={(e) =>
                        handleInputChange(e, "ownerDetails.lastName")
                      }
                    />
                  </div>
                  <div className="flex flex-col pb-4">
                    <label>First Name :</label>
                    <InputField
                      placeholder={"First Name"}
                      onChange={(e) =>
                        handleInputChange(e, "ownerDetails.firstName")
                      }
                    />
                  </div>
                  <div className="flex flex-col w-3/5">
                    <label>Phone number :</label>
                    <InputField
                      placeholder={"Phone Number"}
                      type={"tel"}
                      className={"w-44"}
                      onChange={(e) =>
                        handleInputChange(e, "ownerDetails.phone")
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col p-8">
                  <SectionTitle title={"Vehicle details"} />
                  <label className="pt-4">Select car brand:</label>
                  <Select
                    options={brandOptions}
                    placeholder="Select car brand"
                    className="text-l pb-4"
                    onChange={(selectedOption) =>
                      handleInputChange(
                        { target: { value: selectedOption?.value } },
                        "vehicle.brand"
                      )
                    }
                  />
                  <div className="flex flex-col pb-4">
                    <label>Model:</label>
                    <InputField
                      placeholder={"Model"}
                      onChange={(e) => handleInputChange(e, "vehicle.model")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Licence Plate:</label>
                    <InputField
                      placeholder={"Licence Plate"}
                      onChange={(e) =>
                        handleInputChange(e, "vehicle.licencePlate")
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col p-8">
                  <SectionTitle title={"Repair details"} />
                  <label className="pt-4">Diagnostic:</label>
                  <textarea
                    className="textarea textarea-bordered resize-none"
                    placeholder="Diagnostic"
                    onChange={(e) =>
                      handleInputChange(e, "vehicle.repairDetails.diagnostic")
                    }
                  ></textarea>
                  <div className="flex flex-col ">
                    <label className="pt-4">Parts to order:</label>
                    <textarea
                      className="textarea textarea-bordered resize-none"
                      placeholder="Parts to order"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "vehicle.repairDetails.partToOrder"
                        )
                      }
                    ></textarea>
                  </div>
                  <div className="flex flex-col pt-4 pb-4">
                    <label>Ordered:</label>
                    <input
                      type="checkbox"
                      className="toggle toggle-accent"
                      onChange={(e) =>
                        handleCheckboxChange(e, "vehicle.repairDetails.ordered")
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Price:</label>
                    <InputField
                      label={"Price"}
                      type={"number"}
                      placeholder={"Price"}
                      onChange={(e) =>
                        handleInputChange(e, "vehicle.repairDetails.price")
                      }
                    />
                  </div>
                  <div className="flex flex-col pt-4">
                    <label>Expected Time:</label>
                    <InputField
                      label={"Expected Time"}
                      type={"date"}
                      placeholder={"Expected Time"}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "vehicle.repairDetails.expectedTime"
                        )
                      }
                    />
                  </div>
                  <div className="flex justify-center pt-8">
                    <label className="">Completed:</label>
                    <input
                      type="checkbox"
                      placeholder="Completed"
                      className="checkbox ml-4"
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          "vehicle.repairDetails.completed"
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-center p-4">
                  <button
                    onClick={handleAddTask}
                    type="button"
                    className="btn btn-outline"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTask;
