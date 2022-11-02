import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flight } from "../../models/flight.model";
import NotFound from "../NotFound/NotFound";
import FlightDetailContent from "./FlightDetailContent/FlightDetailContent";
import styles from "./FlightDetail.module.css";

const FlightDetail = () => {
  const params = useParams();
  const [doesExist, setDoesExist] = useState<boolean>(false);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.flightId) {
      getFlightInfo(params.flightId);
    }
  }, []);

  async function getFlightInfo(flightId: string) {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (err: any) {
      setDoesExist(false);
      setIsLoading(false);
    }
  }

  let flightDetailContent;

  if (doesExist) {
    flightDetailContent = <FlightDetailContent flight={flight} />;
  }

  if (isLoading && !doesExist) {
    flightDetailContent = (
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (!doesExist && !isLoading) {
    flightDetailContent = <NotFound message={"Лет који тражите не постоји."} />;
  }
  return (
    <>
      {flightDetailContent}
      {/* {doesExist && <FlightDetailContent flight={flight} />}
      {!doesExist && <NotFound message={"Лет који тражите не постоји."} />} */}
    </>
  );
};

export default FlightDetail;
