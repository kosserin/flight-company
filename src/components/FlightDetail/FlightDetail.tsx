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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.flightId) {
      getFlightInfo(params.flightId);
    }
  }, []);

  async function getFlightInfo(flightId: string) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8089/api/flights/${flightId}`
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
        price: data.price,
        distanceBetween: data.distanceBetween,
        reservations: data.reservations,
        model: data.model,
        company: data.company,
      });
      setDoesExist(true);
      setIsLoading(false);
    } catch (err: any) {
      setDoesExist(false);
      setIsLoading(false);
      setError("Лет који тражите не постоји.");
    }
  }

  let flightDetailContent;

  if (doesExist) {
    flightDetailContent = <FlightDetailContent flight={flight} />;
  }

  if (isLoading) {
    flightDetailContent = (
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (error) {
    flightDetailContent = <NotFound message={error} />;
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
