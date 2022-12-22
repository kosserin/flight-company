import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flight } from "../../models/flight.model";
import NotFound from "../NotFound/NotFound";
import FlightDetailContent from "./FlightDetailContent/FlightDetailContent";
import styles from "./FlightDetail.module.css";
import { FlightsContext } from "../../store/flights-context";
import ReservationDetailsContextProvider from "../../store/reservation-details-context";
import axios from "axios";

const FlightDetail = () => {
  const params = useParams();
  const ctx = useContext(FlightsContext);
  const [doesExist, setDoesExist] = useState<boolean>(false);
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
      const response = await axios.get(`https://flights.herokuapp.com/api/flights/${flightId}`);
      const data: Flight = await response.data;
      ctx.setFlightHandler({
        id: data.id,
        fromCity: data.fromCity,
        toCity: data.toCity,
        flightDuration: data.flightDuration,
        dateOfDeparture: data.dateOfDeparture,
        numberOfSeats: data.numberOfSeats,
        price: data.price,
        distanceBetween: data.distanceBetween,
        reservations: data.reservations || [],
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
    flightDetailContent = <FlightDetailContent flight={ctx.selectedFlight} />;
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
    <ReservationDetailsContextProvider>
      <>{flightDetailContent}</>
    </ReservationDetailsContextProvider>
  );
};

export default FlightDetail;
