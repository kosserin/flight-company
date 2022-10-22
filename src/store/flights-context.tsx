import React, { useState } from "react";
import { Flight } from "../models/flight.model";

type FlightsContextObject = {
  flights: Flight[];
  appendFlights: (newFlights: Flight[]) => void;
  sortLowestFirst: (newFlights: Flight[]) => Flight[];
  sortHighestFirst: (newFlights: Flight[]) => Flight[];
  sortFastestTravel: (newFlights: Flight[]) => Flight[];
  sortShortestDistance: (newFlights: Flight[]) => Flight[];
};

export const FlightsContext = React.createContext<FlightsContextObject>({
  flights: [],
  appendFlights: (newFlights: Flight[]) => {},
  sortLowestFirst: (flights: Flight[]) => flights,
  sortHighestFirst: (flights: Flight[]) => flights,
  sortFastestTravel: (flights: Flight[]) => flights,
  sortShortestDistance: (flights: Flight[]) => flights,
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

  const contextValue: FlightsContextObject = {
    flights,
    appendFlights,
    sortLowestFirst,
    sortHighestFirst,
    sortFastestTravel,
    sortShortestDistance,
  };

  return (
    <FlightsContext.Provider value={contextValue}>
      {props.children}
    </FlightsContext.Provider>
  );
};

export default FlightsContextProvider;
