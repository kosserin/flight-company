import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import styles from "./FlightItem.module.css";

const FlightItem = (props: any) => {
  const navigate = useNavigate();

  const lat1 = 45.25817458344718;
  const lon1 = 19.846619330291926;
  const lat2 = 52.43250928243539;
  const lon2 = 13.534630440341045;

  const R = 6371; // kilometres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceBetween = Math.round(R * c); // in kilometres
  const estimatedTime = (distanceBetween / 500) * 60;

  const toHoursAndMinutes = (totalMinutes: number) => {
    console.log(totalMinutes);

    const minutes = totalMinutes % 60;
    console.log(minutes.toFixed());

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
  const arrivalTime = new Date(fetchedDate.getTime() + estimatedTime * 60000);
  const onlyHoursAndMinutesOfStart = format(fetchedDate, "HH:mm");
  const onlyHoursAndMinutesOfArrival = format(arrivalTime, "HH:mm");
  const convertedFlightDuration: string = toHoursAndMinutes(estimatedTime);

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
            <p>({distanceBetween}км)</p>
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
