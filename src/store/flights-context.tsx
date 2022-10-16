import React, { useState } from "react";
import { Flight } from "../models/flight.model";

type FlightsContextObject = {
  flights: Flight[];
  appendFlights: (newFlights: Flight[]) => void;
};

export const FlightsContext = React.createContext<FlightsContextObject>({
  flights: [],
  appendFlights: (newFlights: Flight[]) => {},
});

interface Props {
  children: JSX.Element;
}

const FlightsContextProvider: React.FC<Props> = (props) => {
  const [flights, setFlights] = useState<Flight[]>([]);

  const appendFlights = (newFlights: Flight[]) => {
    setFlights(newFlights);
  };

  const contextValue: FlightsContextObject = {
    flights,
    appendFlights,
  };

  return (
    <FlightsContext.Provider value={contextValue}>
      {props.children}
    </FlightsContext.Provider>
  );
};

export default FlightsContextProvider;
