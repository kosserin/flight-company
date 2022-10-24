import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flight } from "../../models/flight.model";
import NotFound from "../NotFound/NotFound";
import FlightDetailContent from "./FlightDetailContent/FlightDetailContent";

const FlightDetail = () => {
  const params = useParams();
  const [doesExist, setDoesExist] = useState<boolean>(false);
  const [flight, setFlight] = useState<Flight | null>(null);

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

  return (
    <>
      {doesExist && <FlightDetailContent flight={flight} />}
      {!doesExist && <NotFound message={"Лет који тражите не постоји."} />}
    </>
  );
};

export default FlightDetail;
