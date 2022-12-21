import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReservationDetailsContext } from "../../store/reservation-details-context";
import styles from "./ReservationDoneModal.module.css";
import success from "../../assets/status/success.png";
import failed from "../../assets/status/failed.png";
import { FlightsContext } from "../../store/flights-context";

export const OuterModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div onClick={() => navigate(`/reservation/flights/${params.flightId}`)} className={styles["outer-modal"]}></div>
  );
};

const InnerModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const flightsCtx = useContext(FlightsContext);
  const reservationDetailsCtx = useContext(ReservationDetailsContext);
  const [generatedResIdFromBackend, setGeneratedResIdFromBackend] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addReservationHandler = async () => {
    setError(null);
    setIsLoading(true);
    const newReservations = [...flightsCtx.selectedFlight.reservations];
    const uniqueReservationId = "RES-" + new Date().getTime().toString();
    console.log(reservationDetailsCtx.surname);
    newReservations.push({
      id: uniqueReservationId,
      lastName: reservationDetailsCtx.surname,
    });
    try {
      const response = await fetch(`https://flights.herokuapp.com/api/flights/${params.flightId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: flightsCtx.selectedFlight.id,
          reservations: newReservations,
        }),
      });
      setGeneratedResIdFromBackend(uniqueReservationId);
      setIsLoading(false);
    } catch (err) {
      setError("Нисмо успели да унесемо Вашу резервацију. Молимо покушајте поново.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(reservationDetailsCtx.surname);
    addReservationHandler();
  }, []);

  const navigateToFlightDetailsContent = () => {
    navigate(`/reservation/flights/${params.flightId}`);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  let reservationModalContent;

  if (!isLoading && !error) {
    reservationModalContent = (
      <div className={styles["reservation-response"]}>
        <div>
          <img src={success} />
          <h6>Хвала на поверењу, успешно сте резервисали карту!</h6>
          <p>
            Број Ваше резервације је: <span>{generatedResIdFromBackend}</span>. Молимо Вас да сачувате негде број
            резервације како бисте могли накнадно да проверите резервацију.
          </p>
        </div>
        <button onClick={navigateToHome} className={`${styles["modal-button"]} submit-button`}>
          У реду
        </button>
      </div>
    );
  }

  if (isLoading) {
    reservationModalContent = (
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (error) {
    reservationModalContent = (
      <div className={styles["reservation-response"]}>
        <div>
          <img src={failed} />
          <p>Дошло је до грешке. Молимо покушајте касније.</p>
        </div>
        <button onClick={navigateToFlightDetailsContent} className={`${styles["modal-button"]} submit-button`}>
          У реду
        </button>
      </div>
    );
  }

  return <div className={styles["reservation-modal"]}>{reservationModalContent}</div>;
};

const ReservationDoneModal = () => {
  return (
    <>
      <OuterModal />
      <InnerModal />
    </>
  );
};

export default ReservationDoneModal;
