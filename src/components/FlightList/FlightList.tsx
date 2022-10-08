import React from "react";
import { Flight } from "../../models/flight.model";
import FlightItem from "./FlightItem/FlightItem";
import styles from "./FlightList.module.css";

const DUMMY_FLIGHTS: Flight[] = [
  {
    id: "ur829ojadsdlsa",
    from: "Београд",
    to: "Тиват",
    departureDate: "2022-08-13",
    flightStartsAt: "13:00",
    duration: 90,
    price: "16.000",
  },
  {
    id: "dsadas",
    from: "Београд",
    to: "Милано",
    departureDate: "2022-08-13",
    flightStartsAt: "13:00",
    duration: 90,
    price: "16.000",
  },
  {
    id: "ur829ojar4553453dsdlsa",
    from: "Београд",
    to: "Њујорк",
    departureDate: "2022-08-13",
    flightStartsAt: "13:00",
    duration: 90,
    price: "16.000",
  },
];

const FlightList = () => {
  return (
    <ul className={styles["flight-list"]} id="flightList">
      {DUMMY_FLIGHTS.map((f) => (
        <FlightItem flight={f} key={f.id} />
      ))}
    </ul>
  );
};

export default FlightList;
