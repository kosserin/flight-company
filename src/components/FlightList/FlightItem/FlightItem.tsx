import React from "react";
import styles from "./FlightItem.module.css";

const FlightItem = (props: any) => {
  return (
    <li className={styles["flight-item"]}>
      <p>
        {props.flight.fromCity} - {props.flight.toCity}
      </p>
      <p>{props.flight.dateOfDeparture}</p>
      <p>{props.flight.flightDuration}</p>
      <p>{props.flight.numberOfSeats}</p>
    </li>
  );
};

export default FlightItem;
