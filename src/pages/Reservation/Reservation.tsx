import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ReservationContent from "../../components/ReservationContent/ReservationContent";
import styles from "./Reservation.module.css";

const Reservation = () => {
  return (
    <div className={styles["reservation-page"]}>
      <Header />
      <ReservationContent />
      <Footer color="dark" />
    </div>
  );
};

export default Reservation;
