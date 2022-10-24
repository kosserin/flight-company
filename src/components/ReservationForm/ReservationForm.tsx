import React from "react";
import styles from "./ReservationForm.module.css";

const ReservationForm = () => {
  const reserveSubmitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className={styles["reservation-form__holder"]}>
      <form
        className={styles["reservation-form"]}
        onSubmit={reserveSubmitHandler}
      >
        <h1>dsadas</h1>
        <h1>dsadas</h1>
        <h1>dsadas</h1>
        <h1>dsadas</h1>
        <h1>dsadas</h1>
      </form>
    </div>
  );
};

export default ReservationForm;
