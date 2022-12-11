import React, { useState } from "react";
import { Flight } from "../models/flight.model";

type FlightsContextObject = {
  flights: Flight[];
  selectedFlight: Flight;
  appendFlights: (newFlights: Flight[]) => void;
  setFlightHandler: (newFlight: Flight) => void;
  sortLowestFirst: (flights: Flight[]) => Flight[];
  sortHighestFirst: (flights: Flight[]) => Flight[];
  sortFastestTravel: (flights: Flight[]) => Flight[];
  sortShortestDistance: (flights: Flight[]) => Flight[];
  sortEarliestFlight: (flights: Flight[]) => Flight[];
};

export const FlightsContext = React.createContext<FlightsContextObject>({
  flights: [],
  selectedFlight: {
    id: "",
    fromCity: "",
    toCity: "",
    dateOfDeparture: "",
    flightDuration: 0,
    numberOfSeats: 0,
    price: 0,
    distanceBetween: 0,
    reservations: [],
    company: "",
    model: "",
    canceled: false,
    delayed: false,
  },
  appendFlights: (newFlights: Flight[]) => {},
  setFlightHandler: (newFlight: Flight) => {},
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
  const [selectedFlight, setSelectedFlight] = useState<Flight>({
    id: "",
    fromCity: "",
    toCity: "",
    dateOfDeparture: "",
    flightDuration: 0,
    numberOfSeats: 0,
    price: 0,
    distanceBetween: 0,
    reservations: [],
    company: "",
    model: "",
    canceled: false,
    delayed: false,
  });

  const appendFlights = (newFlights: Flight[]) => {
    setFlights(newFlights);
  };

  const setFlightHandler = (newFlight: Flight) => {
    setSelectedFlight(newFlight);
  };

  const sortLowestFirst = (givenFlights: Flight[]) => {
    return givenFlights.sort((a: any, b: any) => {
      return a.price - b.price;
    });
  };

  const sortHighestFirst = (givenFlights: Flight[]) => {
    return givenFlights.sort((a: any, b: any) => {
      return b.price - a.price;
    });
  };

  const sortFastestTravel = (givenFlights: Flight[]) => {
    return givenFlights.sort((a: any, b: any) => {
      return a.flightDuration - b.flightDuration;
    });
  };

  const sortShortestDistance = (givenFlights: Flight[]) => {
    return givenFlights.sort((a: any, b: any) => {
      return a.distanceBetween - b.distanceBetween;
    });
  };

  const sortEarliestFlight = (givenFlights: Flight[]) => {
    return givenFlights.sort((a: any, b: any) => {
      const aDate = new Date(a.dateOfDeparture).getTime();
      const bDate = new Date(b.dateOfDeparture).getTime();
      return aDate - bDate;
    });
  };

  const contextValue: FlightsContextObject = {
    flights,
    selectedFlight,
    appendFlights,
    setFlightHandler,
    sortLowestFirst,
    sortHighestFirst,
    sortFastestTravel,
    sortShortestDistance,
    sortEarliestFlight,
  };

  return <FlightsContext.Provider value={contextValue}>{props.children}</FlightsContext.Provider>;
};

export default FlightsContextProvider;
