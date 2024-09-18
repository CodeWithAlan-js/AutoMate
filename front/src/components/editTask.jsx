import { useState, useEffect, useRef } from "react";
import { useUserTaskContext } from "../context/userTaskContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { carBrands } from "../utils";
import Select from "react-select";
import InputField from "./inputField";
import SectionTitle from "./sectionTitle";

const EditTask = () => {
  const {
    isEditVisible,
    handleEditVisibility,
    handleFieldChange,
    handleUpdateTask,
    taskData,
    fetchTaskById,
    updateId,
  } = useUserTaskContext();

  const formRef = useRef(null);

  const [errors, setErrors] = useState({});
  const { ownerDetails, vehicle } = taskData;

  const brandOptions = carBrands
    .sort()
    .map((brand) => ({ value: brand, label: brand }));

  useEffect(() => {
    if (updateId) {
      fetchTaskById(updateId);
    }
  }, [updateId, fetchTaskById]);

  const validateFields = () => {
    const newErrors = {};

    if (!ownerDetails?.lastName) newErrors.lastName = "Last Name is required";
    if (!ownerDetails?.firstName)
      newErrors.firstName = "First Name is required";
    if (!ownerDetails?.phone) newErrors.phone = "Phone Number is required";

    if (!vehicle?.brand) newErrors.brand = "Car brand is required";
    if (!vehicle?.model) newErrors.model = "Model is required";
    if (!vehicle?.licencePlate)
      newErrors.licencePlate = "Licence Plate is required";

    if (!vehicle?.repairDetails?.diagnostic)
      newErrors.diagnostic = "Diagnostic is required";
    if (!vehicle?.repairDetails?.expectedTime)
      newErrors.expectedTime = "Expected time is required";

    if (vehicle?.repairDetails?.price && isNaN(vehicle.repairDetails.price)) {
      newErrors.price = "Price must be a valid number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitTask = () => {
    if (validateFields()) {
      handleUpdateTask(updateId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        handleEditVisibility();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [formRef, handleEditVisibility]);

  return (
    <>
      {isEditVisible && (
        <div className="w-full z-20 h-full fixed top-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div ref={formRef} className="w-4/5 h-4/5 bg-white overflow-auto">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl">Update vehicle</h2>
              <button onClick={handleEditVisibility}>
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
                      value={ownerDetails?.lastName || ""}
                      placeholder={"Last Name"}
                      onChange={(e) =>
                        handleFieldChange(e, "ownerDetails.lastName")
                      }
                    />
                    {errors.lastName && (
                      <span className="text-red-500">{errors.lastName}</span>
                    )}
                  </div>
                  <div className="flex flex-col pb-4">
                    <label>First Name :</label>
                    <InputField
                      value={ownerDetails?.firstName || ""}
                      placeholder={"First Name"}
                      onChange={(e) =>
                        handleFieldChange(e, "ownerDetails.firstName")
                      }
                    />
                    {errors.firstName && (
                      <span className="text-red-500">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="flex flex-col w-3/5">
                    <label>Phone number :</label>
                    <InputField
                      value={ownerDetails?.phone || ""}
                      placeholder={"Phone Number"}
                      type={"tel"}
                      className={"w-44"}
                      onChange={(e) =>
                        handleFieldChange(e, "ownerDetails.phone")
                      }
                    />
                    {errors.phone && (
                      <span className="text-red-500">{errors.phone}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col p-8">
                  <SectionTitle title={"Vehicle details"} />
                  <label className="pt-4">Select car brand:</label>
                  <Select
                    value={brandOptions.find(
                      (option) => option.value === vehicle?.brand
                    )}
                    options={brandOptions}
                    placeholder="Select car brand"
                    className="text-l pb-4"
                    onChange={(selectedOption) =>
                      handleFieldChange(
                        { target: { value: selectedOption?.value } },
                        "vehicle.brand"
                      )
                    }
                  />
                  {errors.brand && (
                    <span className="text-red-500">{errors.brand}</span>
                  )}
                  <div className="flex flex-col pb-4">
                    <label>Model:</label>
                    <InputField
                      value={vehicle?.model || ""}
                      placeholder={"Model"}
                      onChange={(e) => handleFieldChange(e, "vehicle.model")}
                    />
                    {errors.model && (
                      <span className="text-red-500">{errors.model}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label>Licence Plate:</label>
                    <InputField
                      value={vehicle?.licencePlate || ""}
                      placeholder={"Licence Plate"}
                      onChange={(e) =>
                        handleFieldChange(e, "vehicle.licencePlate")
                      }
                    />
                    {errors.licencePlate && (
                      <span className="text-red-500">
                        {errors.licencePlate}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col p-8">
                  <SectionTitle title={"Repair details"} />
                  <label className="pt-4">Diagnostic:</label>
                  <textarea
                    value={vehicle?.repairDetails?.diagnostic || ""}
                    className="textarea textarea-bordered resize-none"
                    placeholder="Diagnostic"
                    onChange={(e) =>
                      handleFieldChange(e, "vehicle.repairDetails.diagnostic")
                    }
                  ></textarea>
                  {errors.diagnostic && (
                    <span className="text-red-500">{errors.diagnostic}</span>
                  )}
                  <div className="flex flex-col ">
                    <label className="pt-4">Parts to order:</label>
                    <textarea
                      value={vehicle?.repairDetails?.partToOrder || ""}
                      className="textarea textarea-bordered resize-none"
                      placeholder="Parts to order"
                      onChange={(e) =>
                        handleFieldChange(
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
                      checked={vehicle?.repairDetails?.ordered || false}
                      className="toggle toggle-accent"
                      onChange={(e) =>
                        handleFieldChange(e, "vehicle.repairDetails.ordered")
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Price:</label>
                    <InputField
                      value={vehicle?.repairDetails?.price || ""}
                      label={"Price"}
                      type={"number"}
                      placeholder={"Price"}
                      onChange={(e) =>
                        handleFieldChange(e, "vehicle.repairDetails.price")
                      }
                    />
                    {errors.price && (
                      <span className="text-red-500">{errors.price}</span>
                    )}
                  </div>
                  <div className="flex flex-col pt-4">
                    <label>Expected Time:</label>
                    <InputField
                      value={vehicle?.repairDetails?.expectedTime || ""}
                      label={"Expected Time"}
                      type={"date"}
                      placeholder={"Expected Time"}
                      onChange={(e) =>
                        handleFieldChange(
                          e,
                          "vehicle.repairDetails.expectedTime"
                        )
                      }
                    />
                    {errors.expectedTime && (
                      <span className="text-red-500">
                        {errors.expectedTime}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-center pt-8">
                  <label className="">Completed:</label>
                  <input
                    type="checkbox"
                    checked={vehicle?.repairDetails?.completed || false}
                    placeholder="Completed"
                    className="checkbox ml-4"
                    onChange={(e) =>
                      handleFieldChange(e, "vehicle.repairDetails.completed")
                    }
                  />
                </div>
                <div className="flex justify-center p-4">
                  <button
                    onClick={submitTask}
                    type="button"
                    className="btn btn-outline"
                  >
                    Update
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

export default EditTask;
