import React from "react";
import styles from "./FlightItem.module.css";
import startIcon from "../../../assets/start-colored.png";
import finishIcon from "../../../assets/end-colored.png";

const FlightItem = (props: any) => {
  const toHoursAndMinutes = (totalMinutes: number) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if (hours === 0) {
      return `${padTo2Digits(minutes)}м`;
    } else if (minutes === 0) {
      return `${padTo2Digits(hours)}ч`;
    }
    return `${padTo2Digits(hours)}ч ${padTo2Digits(minutes)}м`;
  };

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2);
  };

  const fetchedDate = new Date(props.flight.dateOfDeparture);
  const onlyHoursAndMinutesOfStart =
    fetchedDate.getHours() +
    ":" +
    (fetchedDate.getMinutes() < 10 ? "0" : "") +
    fetchedDate.getMinutes();

  var arrivalTime = new Date(
    fetchedDate.getTime() + props.flight.flightDuration * 60000
  );
  const onlyHoursAndMinutesOfArrival =
    arrivalTime.getHours() +
    ":" +
    (arrivalTime.getMinutes() < 10 ? "0" : "") +
    arrivalTime.getMinutes();
  console.log(onlyHoursAndMinutesOfArrival);

  const convertedFlightDuration: string = toHoursAndMinutes(
    props.flight.flightDuration
  );
  return (
    <li className={styles["flight-item"]}>
      <p className={styles["flight-item__price"]}>
        {props.flight.price}.00 рсд
      </p>
      <div className={styles["flight-item__destinations"]}>
        <div className={styles["flight-item__destination"]}>
          <p className={styles["flight-item__start"]}>
            {onlyHoursAndMinutesOfStart}
          </p>
          <p className={styles["flight-item__from"]}>{props.flight.fromCity}</p>
        </div>
        <div className={styles["flight-item__duration"]}>
          <div className={styles["flight-item__line"]}></div>
          {/* <p>{props.flight.flightDuration}</p> */}
          <div className={styles["flight-item__middle-holder"]}>
            <p>{convertedFlightDuration}</p>
            <p>({props.flight.distanceBetween}км)</p>
          </div>
          <div className={styles["flight-item__line"]}></div>
        </div>
        <div className={styles["flight-item__destination"]}>
          <p className={styles["flight-item__end"]}>
            {onlyHoursAndMinutesOfArrival}
          </p>
          <p className={styles["flight-item__to"]}>{props.flight.toCity}</p>
        </div>
      </div>
    </li>
  );
};

export default FlightItem;
