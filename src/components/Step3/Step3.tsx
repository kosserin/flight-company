import React from "react";
import styles from "./Step3.module.css";
import chevron from "../../assets/chevron-white.png";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();
  const nextHandler = () => {
    alert("reservation done!");
    navigate("/");
  };
  return (
    <div className={styles["step-3"]}>
      <p>Step3</p>
      <p>Step3</p>
      <p>Step3</p>
      <div className={styles["space-for-action"]}></div>
      <div className={styles["step-action"]}>
        <button onClick={nextHandler}>
          <span>Наставите</span>
          <img src={chevron} />
        </button>
      </div>
    </div>
  );
};

export default Step3;
