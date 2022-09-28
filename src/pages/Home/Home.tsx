import React from "react";
import Destinations from "../../components/Destinations/Destinations";
import FlightForm from "../../components/FlightForm/FlightForm";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import LandingContent from "../../components/LandingContent/LandingContent";
import Testimonials from "../../components/Testimonials/Testimonials";
import WhyUs from "../../components/WhyUs/WhyUs";

const Home = () => {
  return (
    <>
      <Header />
      <LandingContent />
      <FlightForm />
      <main>
        <WhyUs />
        <Destinations />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default Home;
