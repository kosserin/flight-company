import { useContext, useEffect } from "react";
import { FlightsContext } from "../../store/flights-context";
import FlightItem from "./FlightItem/FlightItem";
import styles from "./FlightList.module.css";

const FlightList = () => {
  const ctx = useContext(FlightsContext);

  useEffect(() => {}, []);

  return (
    <ul className={styles["flight-list"]} id="flightList">
      {ctx.flights.map((f) => (
        <FlightItem flight={f} key={f.id} />
      ))}
    </ul>
  );
};

export default FlightList;
