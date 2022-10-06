import React from "react";
import FlightForm from "../FlightForm/FlightForm";
import styles from "./ReservationContent.module.css";

const ReservationContent = () => {
  return (
    <section className={styles["reservation-content"]}>
      <div className={`${styles.circle} ${styles["upper-circle"]}`}></div>
      <div className={`${styles.circle} ${styles["bottom-circle"]}`}></div>
      <FlightForm />
    </section>
  );
};

export default ReservationContent;
