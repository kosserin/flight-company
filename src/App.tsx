import Header from "./components/Header/Header";

import React from "react";
import FlightForm from "./components/FlightForm/FlightForm";
import LandingContent from "./components/LandingContent/LandingContent";
import WhyUs from "./components/WhyUs/WhyUs";
import Destinations from "./components/Destinations/Destinations";
import Testimonials from "./components/Testimonials/Testimonials";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      {/* use this code to wrap flight form to get form behind navigation on mobile view <main style={{ position: "relative" }}>        
      </main> */}
      <LandingContent />
      <FlightForm />
      <main>
        <WhyUs />
        <Destinations />
        <Testimonials />
      </main>
    </React.Fragment>
  );
};

export default App;
