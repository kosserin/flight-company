import { format } from "date-fns";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./FlightDetailContent.module.css";

const FlightDetailContent = (props: any) => {
  const navigate = useNavigate();
  const [isReservationModalShown, setIsReservationModalShown] = useState(false);
  const fetchedDate = new Date(props.flight.dateOfDeparture || "");
  const arrivalTime = new Date(fetchedDate.getTime() + (props.flight.flightDuration || 0) * 60000);
  const onlyHoursAndMinutesOfStart = format(fetchedDate, "HH:mm");
  const onlyHoursAndMinutesOfArrival = format(arrivalTime, "HH:mm");
  const formatedDepartureDate = format(new Date(props.flight.dateOfDeparture), "dd.MM.yyyy");

  const toHoursAndMinutes = (totalMinutes: number) => {
    const minutes = Math.floor(totalMinutes % 60);
    const hours = Math.floor(totalMinutes / 60);
    if (hours === 0) {
      return `${padTo2Digits(minutes)} минута`;
    } else if (minutes === 0) {
      return `${padTo2Digits(hours)} час`;
    }
    return `${padTo2Digits(hours)} час ${padTo2Digits(minutes)} минута`;
  };

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2);
  };

  const convertedFlightDuration: string = toHoursAndMinutes(props.flight.flightDuration);

  const showReservationModalHandler = () => {
    navigate("reserve-flight");
    setIsReservationModalShown(true);
  };

  return (
    <>
      <div className={styles["flight-detail"]}>
        <span>{formatedDepartureDate}</span>
        <h3>
          {props.flight.fromCity} - {props.flight.toCity}
        </h3>
        <h2>
          {onlyHoursAndMinutesOfStart} - {onlyHoursAndMinutesOfArrival}
        </h2>
        <div className={styles["detail-line"]}></div>
        <p className={styles["detail-price"]}>
          Цена за једног путника: <span>{props.flight.price.toFixed(2)} рсд</span>
        </p>
        <p className={styles["detail-item"]}>
          Модел: <span>{props.flight.model}</span>
        </p>
        <p className={styles["detail-item"]}>
          Превозник: <span>{props.flight.company}</span>
        </p>
        <p className={styles["detail-item"]}>
          Растојање: <span>{props.flight.distanceBetween} км</span>
        </p>
        <p className={styles["detail-item"]}>
          Дужина лета:
          <span>{convertedFlightDuration}</span>
        </p>
        <p className={styles["detail-item"]}>
          Број седишта у авиону: <span>{props.flight.numberOfSeats}</span>
        </p>
        <p className={styles["detail-item"]}>
          Резервисаних седишта: <span>{props.flight.reservations.length}</span>
        </p>
        <div className={styles["detail-actions"]}>
          <button
            onClick={showReservationModalHandler}
            disabled={props.flight.reservations.length >= props.flight.numberOfSeats}
          >
            Резервишите
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default FlightDetailContent;
