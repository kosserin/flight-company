import moment from "moment";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReservationModal from "../../ReservationModal/ReservationModal";
import styles from "./FlightDetailContent.module.css";

const FlightDetailContent = (props: any) => {
  const [isReservationModalShown, setIsReservationModalShown] = useState(false);
  const fetchedDate = new Date(props.flight.dateOfDeparture || "");
  const onlyHoursAndMinutesOfStart =
    fetchedDate.getHours() +
    ":" +
    (fetchedDate.getMinutes() < 10 ? "0" : "") +
    fetchedDate.getMinutes();

  let arrivalTime = new Date(
    fetchedDate.getTime() + (props.flight.flightDuration || 0) * 60000
  );
  const onlyHoursAndMinutesOfArrival =
    arrivalTime.getHours() +
    ":" +
    (arrivalTime.getMinutes() < 10 ? "0" : "") +
    arrivalTime.getMinutes();

  const formatedDepartureDate = moment(props.flight.dateOfDeparture).format(
    "DD.MM.YYYY"
  );

  const toHoursAndMinutes = (totalMinutes: number) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if (hours === 0) {
      return `${padTo2Digits(minutes)}минута`;
    } else if (minutes === 0) {
      return `${padTo2Digits(hours)}час`;
    }
    return `${padTo2Digits(hours)}час ${padTo2Digits(minutes)}минута`;
  };

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2);
  };

  const convertedFlightDuration: string = toHoursAndMinutes(
    props.flight.flightDuration
  );

  const showReservationModalHandler = () => {
    setIsReservationModalShown(true);
  };

  const hideReservationModalHandler = () => {
    setIsReservationModalShown(false);
  };

  return (
    <div className={styles["flight-detail"]}>
      {isReservationModalShown &&
        ReactDOM.createPortal(
          <ReservationModal
            hideReservationModal={hideReservationModalHandler}
          />,
          document.getElementById("modal-root") as HTMLElement
        )}
      <span>{formatedDepartureDate}</span>
      <h2>
        {props.flight.fromCity} - {props.flight.toCity}
      </h2>
      <h3>
        {onlyHoursAndMinutesOfStart} - {onlyHoursAndMinutesOfArrival}
      </h3>
      <div className={styles["detail-line"]}></div>
      <h4 className={styles["detail-price"]}>
        Цена за једног путника: <span>{props.flight.price}.00 рсд</span>
      </h4>
      <h4 className={styles["detail-item"]}>
        Модел: <span>JAT32-679</span>
      </h4>
      <h4 className={styles["detail-item"]}>
        Превозник: <span>Авионик</span>
      </h4>
      <h4 className={styles["detail-item"]}>
        Растојање: <span>{props.flight.distanceBetween}км</span>
      </h4>
      <h4 className={styles["detail-item"]}>
        Дужина лета:
        <span>{convertedFlightDuration}</span>
      </h4>
      <h4 className={styles["detail-item"]}>
        Број седишта у авиону: <span>{props.flight.numberOfSeats}</span>
      </h4>
      <h4 className={styles["detail-item"]}>
        Резервисаних седишта: <span>{props.flight.seatsReserved}</span>
      </h4>
      <div className={styles["detail-actions"]}>
        <button onClick={showReservationModalHandler}>Резервишите</button>
      </div>
    </div>
  );
};

export default FlightDetailContent;
