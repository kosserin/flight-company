import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Discover from "./pages/Discover/Discover";
import Reservation from "./pages/Reservation/Reservation";
import FlightContent from "./components/FlightContent/FlightContent";
import FlightDetail from "./components/FlightDetail/FlightDetail";
import ReservationModal from "./components/ReservationModal/ReservationModal";
import Step1 from "./components/Step1/Step1";
import Step2 from "./components/Step2/Step2";
import Step3 from "./components/Step3/Step3";
import ReservationDoneModal from "./components/ReservationDoneModal/ReservationDoneModal";

const App = () => {
  return (
    <React.Fragment>
      {/* use this code to wrap flight form to get form behind navigation on mobile view <main style={{ position: "relative" }}>        
      </main> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="discover" element={<Discover />} />
        <Route path="reservation" element={<Reservation />}>
          <Route path="flights" element={<FlightContent />}>
            <Route path=":flightId" element={<FlightDetail />}>
              <Route path="reserve-flight" element={<ReservationModal />}>
                <Route path="step-1" element={<Step1 />} />
                <Route path="step-2" element={<Step2 />} />
                <Route path="step-3" element={<Step3 />} />
              </Route>
              <Route path="reservation-done" element={<ReservationDoneModal />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
