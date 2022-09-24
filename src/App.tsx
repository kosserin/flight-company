import Header from "./components/Header/Header";

import React from "react";
import FlightForm from "./components/FlightForm/FlightForm";
import LandingContent from "./components/LandingContent/LandingContent";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main style={{ position: "relative" }}>
        <LandingContent />
        <FlightForm />
      </main>
    </React.Fragment>
  );
};

export default App;
