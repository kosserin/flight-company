import React, { useState } from "react";
import { Flight } from "../models/flight.model";

type FlightsContextObject = {
  flights: Flight[];
  appendFlights: (newFlights: Flight[]) => void;
  sortLowestFirst: (flights: Flight[]) => Flight[];
  sortHighestFirst: (flights: Flight[]) => Flight[];
  sortFastestTravel: (flights: Flight[]) => Flight[];
  sortShortestDistance: (flights: Flight[]) => Flight[];
  sortEarliestFlight: (flights: Flight[]) => Flight[];
};

export const FlightsContext = React.createContext<FlightsContextObject>({
  flights: [],
  appendFlights: (newFlights: Flight[]) => {},
  sortLowestFirst: (flights: Flight[]) => flights,
  sortHighestFirst: (flights: Flight[]) => flights,
  sortFastestTravel: (flights: Flight[]) => flights,
  sortShortestDistance: (flights: Flight[]) => flights,
  sortEarliestFlight: (flights: Flight[]) => flights,
});

interface Props {
  children: JSX.Element;
}

const FlightsContextProvider: React.FC<Props> = (props) => {
  const [flights, setFlights] = useState<Flight[]>([]);

  const appendFlights = (newFlights: Flight[]) => {
    setFlights(newFlights);
  };

  const sortLowestFirst = (flights: Flight[]) => {
    return flights.sort((a: any, b: any) => {
      return a.price - b.price;
    });
  };

  const sortHighestFirst = (flights: Flight[]) => {
    return flights.sort((a: any, b: any) => {
      return b.price - a.price;
    });
  };

  const sortFastestTravel = (flights: Flight[]) => {
    return flights.sort((a: any, b: any) => {
      return a.flightDuration - b.flightDuration;
    });
  };

  const sortShortestDistance = (flights: Flight[]) => {
    return flights.sort((a: any, b: any) => {
      return a.distanceBetween - b.distanceBetween;
    });
  };

  const sortEarliestFlight = (flights: Flight[]) => {
    return flights.sort((a: any, b: any) => {
      const aDate = new Date(a.dateOfDeparture).getTime();
      const bDate = new Date(b.dateOfDeparture).getTime();
      return aDate - bDate;
    });
  };

  const contextValue: FlightsContextObject = {
    flights,
    appendFlights,
    sortLowestFirst,
    sortHighestFirst,
    sortFastestTravel,
    sortShortestDistance,
    sortEarliestFlight,
  };

  return (
    <FlightsContext.Provider value={contextValue}>
      {props.children}
    </FlightsContext.Provider>
  );
};

export default FlightsContextProvider;
