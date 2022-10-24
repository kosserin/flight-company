import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Flight } from "../../models/flight.model";
import { FlightsContext } from "../../store/flights-context";
import NotFound from "../NotFound/NotFound";
import styles from "./FlightDetail.module.css";

const FlightDetail = () => {
  const params = useParams();
  const [doesExist, setDoesExist] = useState<boolean>(false);
  const [flight, setFlight] = useState<Flight | null>(null);
  const ctx = useContext(FlightsContext);

  const fetchedDate = new Date(flight?.dateOfDeparture || "");
  const onlyHoursAndMinutesOfStart =
    fetchedDate.getHours() +
    ":" +
    (fetchedDate.getMinutes() < 10 ? "0" : "") +
    fetchedDate.getMinutes();

  let arrivalTime = new Date(
    fetchedDate.getTime() + (flight?.flightDuration || 0) * 60000
  );
  const onlyHoursAndMinutesOfArrival =
    arrivalTime.getHours() +
    ":" +
    (arrivalTime.getMinutes() < 10 ? "0" : "") +
    arrivalTime.getMinutes();

  useEffect(() => {
    if (params.flightId) {
      getFlightInfo(params.flightId);
    }
  }, []);

  async function getFlightInfo(flightId: string) {
    try {
      const response = await fetch(
        `http://localhost:8086/api/flights/${flightId}`
      );
      const data = await response.json();
      console.log(data);
      setFlight({
        id: data.id,
        fromCity: data.fromCity,
        toCity: data.toCity,
        flightDuration: data.flightDuration,
        dateOfDeparture: data.dateOfDeparture,
        numberOfSeats: data.numberOfSeats,
        price: 360,
        distanceBetween: 999,
        seatsReserved: 30,
        areSeatsAvailable: true,
        reservations: [],
      });
      setDoesExist(true);
    } catch (err: any) {
      setDoesExist(false);
    }
  }

  const formatedDepartureDate = moment(flight?.dateOfDeparture).format(
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
    flight!.flightDuration
  );

  return (
    <>
      {doesExist && (
        <div className={styles["flight-detail"]}>
          <span>{formatedDepartureDate}</span>
          <h2>
            {flight?.fromCity} - {flight?.toCity}
          </h2>
          <h3>
            {onlyHoursAndMinutesOfStart} - {onlyHoursAndMinutesOfArrival}
          </h3>
          <div className={styles["detail-line"]}></div>
          <h4 className={styles["detail-price"]}>
            Цена за једног путника: <span>{flight!.price}.00 рсд</span>
          </h4>
          <h4 className={styles["detail-model"]}>
            Модел: <span>JAT32-679</span>
          </h4>
          <h4 className={styles["detail-model"]}>
            Превозник: <span>Авионик</span>
          </h4>
          <h4 className={styles["detail-model"]}>
            Растојање: <span>{flight!.distanceBetween}км</span>
          </h4>
          <h4 className={styles["detail-model"]}>
            Дужина лета:
            <span>{convertedFlightDuration}</span>
          </h4>
          <h4 className={styles["detail-model"]}>
            Број седишта у авиону: <span>{flight!.numberOfSeats}</span>
          </h4>
          <h4 className={styles["detail-model"]}>
            Резервисаних седишта: <span>{flight?.seatsReserved}</span>
          </h4>
          <div className={styles["detail-actions"]}>
            <button>Резервишите</button>
          </div>
        </div>
      )}
      {!doesExist && <NotFound message={"Лет који тражите не постоји."} />}
    </>
  );
};

export default FlightDetail;
