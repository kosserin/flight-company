import React, { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Flight } from "../../models/flight.model";
import { FlightsContext } from "../../store/flights-context";
import FlightItem from "./FlightItem/FlightItem";
import styles from "./FlightList.module.css";

// const DUMMY_FLIGHTS: Flight[] = [
//   {
//     id: "ur829ojadsdlsa",
//     from: "Београд",
//     to: "Тиват",
//     departureDate: "2022-08-13",
//     flightStartsAt: "13:00",
//     duration: 90,
//     price: "16.000",
//   },
//   {
//     id: "dsadas",
//     from: "Београд",
//     to: "Милано",
//     departureDate: "2022-08-13",
//     flightStartsAt: "13:00",
//     duration: 90,
//     price: "16.000",
//   },
//   {
//     id: "ur829ojar4553453dsdlsa",
//     from: "Београд",
//     to: "Њујорк",
//     departureDate: "2022-08-13",
//     flightStartsAt: "13:00",
//     duration: 90,
//     price: "16.000",
//   },
// ];

const FlightList = () => {
  const ctx = useContext(FlightsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { flightParams } = useParams();

  useEffect(() => {
    searchForFlightHandler();
  }, [flightParams]);

  async function searchForFlightHandler() {
    try {
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      const date = searchParams.get("date");
      const response = await fetch(
        `http://localhost:8086/api/flights?from=${from}&to=${to}&date=${date}`
      );
      const data = await response.json();
      // alert(JSON.stringify(data));
      ctx.appendFlights(data);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className={styles["flight-list__div"]}>
      <h2>Одаберите лет који Вам одговара да бисте наставили даље.</h2>
      <ul className={styles["flight-list"]} id="flightList">
        {ctx.flights.map((f) => (
          <FlightItem flight={f} key={f.id} />
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
