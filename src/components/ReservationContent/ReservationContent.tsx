import { Outlet } from "react-router-dom";
import FlightForm from "../FlightForm/FlightForm";
import styles from "./ReservationContent.module.css";
import { useLocation } from "react-router-dom";

const ReservationContent = () => {
  const route = useLocation();
  return (
    <section
      className={`${styles["reservation-content"]} ${
        route.pathname == "/reservation" && styles["padding-top"]
      }`}
    >
      <div className={`${styles.circle} ${styles["upper-circle"]}`}></div>
      <div className={`${styles.circle} ${styles["bottom-circle"]}`}></div>
      {route.pathname == "/reservation" && <FlightForm />}
      <Outlet />
    </section>
  );
};

export default ReservationContent;
