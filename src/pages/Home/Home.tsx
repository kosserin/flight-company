import React from "react";
import Destinations from "../../components/Destinations/Destinations";
import FlightForm from "../../components/FlightForm/FlightForm";
import LandingContent from "../../components/LandingContent/LandingContent";
import Testimonials from "../../components/Testimonials/Testimonials";
import WhyUs from "../../components/WhyUs/WhyUs";

const Home = () => {
  return (
    <>
      <LandingContent />
      <FlightForm />
      <main>
        <WhyUs />
        <Destinations />
        <Testimonials />
      </main>
    </>
  );
};

export default Home;
