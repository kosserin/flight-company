import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Step1.module.css";
import chevron from "../../assets/chevron-white.png";

const Step1 = () => {
  const navigate = useNavigate();
  const params = useParams();
  const nextHandler = () => {
    console.log("xd");
    navigate(`/reservation/flights/${params.flightId}/reserve-flight/step-2`);
  };
  return (
    <div className={styles["step-1"]}>
      <h1>PRVI</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>Step1</h1>
      <h1>nak</h1>
      <h1>pred</h1>
      <h1>ZADNJI</h1>
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

export default Step1;
