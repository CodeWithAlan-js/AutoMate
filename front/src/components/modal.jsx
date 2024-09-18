import { useUserTaskContext } from "../context/userTaskContext";
import { useEffect, useState } from "react";

const Modal = () => {
  const { modalMessage, modalIsVisible } = useUserTaskContext();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (modalIsVisible) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modalIsVisible]);

  return (
    <div
      role="alert"
      className={`fixed alert alert-success transition-opacity duration-500 ease-in-out w-60 top-24 ${
        showModal ? "opacity-100" : "opacity-0"
      } ${modalIsVisible ? "visible" : "invisible"}`}
      style={{ zIndex: 1000 }}
    >
      <span>{modalMessage}</span>
    </div>
  );
};

export default Modal;
