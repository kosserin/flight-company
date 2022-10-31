import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Step2.module.css";
import chevron from "../../assets/chevron-white.png";

const Step2 = () => {
  const navigate = useNavigate();
  const params = useParams();
  const nextHandler = () => {
    console.log("xd");
    navigate(`/reservation/flights/${params.flightId}/reserve-flight/step-3`);
  };

  return (
    <div className={styles["step-2"]}>
      <h1>48032</h1>
      <h1>48032</h1>
      <h1>48032</h1>
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

export default Step2;
