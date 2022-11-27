import React, { useEffect } from "react";
import {
  useNavigate,
  useLocation,
  Outlet,
  Link,
  useParams,
} from "react-router-dom";
import ReservationDetailsContextProvider from "../../store/reservation-details-context";
import styles from "./ReservationModal.module.css";

const OuterModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    let n = location.pathname.lastIndexOf("/");
    let result = location.pathname.substring(n + 1);
    if (result === "reserve-flight") {
      navigate("step-1");
    }
  }, []);

  const hideModal = () => {
    navigate(`/reservation/flights/${params.flightId}`);
  };
  return <div onClick={hideModal} className={styles["outer-modal"]}></div>;
};

const InnerModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const cancelHandler = () => {
    let n = location.pathname.lastIndexOf("/");
    let result = location.pathname.substring(n + 1);

    if (result === "step-1") {
      navigate(`/reservation/flights/${params.flightId}`);
    } else navigate(-1);
  };

  return (
    <div className={styles["inner-modal"]}>
      <div className={styles["modal-header"]}>
        <h4>Резервација</h4>
        <button onClick={() => cancelHandler()}>Назад</button>
      </div>
      <Outlet />
    </div>
  );
};

const ReservationModal = () => {
  return (
    <ReservationDetailsContextProvider>
      <>
        <OuterModal />
        <InnerModal />
      </>
    </ReservationDetailsContextProvider>
  );
};

export default ReservationModal;
