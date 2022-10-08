import React from "react";
import styles from "./FlightItem.module.css";

const FlightItem = (props: any) => {
  return (
    <li className={styles["flight-item"]}>
      <p>
        {props.flight.from} - {props.flight.to}
      </p>
      <p>{props.flight.departureDate}</p>
    </li>
  );
};

export default FlightItem;
