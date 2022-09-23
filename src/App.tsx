import Header from "./components/Header/Header";

import React from "react";
import FlightForm from "./components/FlightForm/FlightForm";
import LandingContent from "./components/LandingContent/LandingContent";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <LandingContent />
      <FlightForm />
    </React.Fragment>
  );
};

export default App;
