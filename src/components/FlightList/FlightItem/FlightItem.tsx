import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import styles from "./FlightItem.module.css";

const FlightItem = (props: any) => {
  const navigate = useNavigate();
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
    return Math.floor(num).toString().padStart(2);
  };

  const fetchedDate = new Date(props.flight.dateOfDeparture);
  const arrivalTime = new Date(fetchedDate.getTime() + props.flight.flightDuration * 60000);
  const onlyHoursAndMinutesOfStart = format(fetchedDate, "HH:mm");
  const onlyHoursAndMinutesOfArrival = format(arrivalTime, "HH:mm");
  const convertedFlightDuration: string = toHoursAndMinutes(props.flight.flightDuration);

  const showFlightDetailHandler = () => {
    navigate(`/reservation/flights/${props.flight.id}`);
  };

  return (
    <li className={styles["flight-item"]} onClick={showFlightDetailHandler}>
      <p className={styles["flight-item__price"]}>{props.flight.price}.00 рсд</p>
      <div className={styles["flight-item__destinations"]}>
        <div className={styles["flight-item__destination"]}>
          <p className={styles["flight-item__start"]}>{onlyHoursAndMinutesOfStart}</p>
          <p className={styles["flight-item__from"]}>{props.flight.fromCity}</p>
        </div>
        <div className={styles["flight-item__duration"]}>
          <div className={styles["flight-item__line"]}></div>
          <div className={styles["flight-item__middle-holder"]}>
            <p>{convertedFlightDuration}</p>
            <p>({props.flight.distanceBetween}км)</p>
          </div>
          <div className={styles["flight-item__line"]}></div>
        </div>
        <div className={styles["flight-item__destination"]}>
          <p className={styles["flight-item__end"]}>{onlyHoursAndMinutesOfArrival}</p>
          <p className={styles["flight-item__to"]}>{props.flight.toCity}</p>
        </div>
      </div>
    </li>
  );
};

export default FlightItem;
