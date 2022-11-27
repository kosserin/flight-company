import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReservationDetailsContext } from "../../store/reservation-details-context";
import styles from "./ReservationDoneModal.module.css";
import success from "../../assets/success.png";
import failed from "../../assets/failed.png";

export const OuterModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div
      onClick={() => navigate(`/reservation/flights/${params.flightId}`)}
      className={styles["outer-modal"]}
    ></div>
  );
};

const InnerModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const ctx = useContext(ReservationDetailsContext);
  const [generatedResIdFromBackend, setGeneratedResIdFromBackend] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reserveFlightHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // const response = await fetch(
      //   `http://localhost:8086/api/flights/${params.flightId}`,
      //   {
      //     method: "PUT",
      //     body: JSON.stringify({
      //       lastName: ctx.surname,
      //     }),
      //   }
      // );
      // const data: any = await response.json();
      // setGeneratedResIdFromBackend(data.resId);
      // setIsLoading(false);

      setGeneratedResIdFromBackend("4u032dasjodsau4382dasjo");
      setIsLoading(false);
    } catch (err) {
      setError(
        "Нисмо успели да унесемо Вашу резервацију. Молимо покушајте поново."
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reserveFlightHandler();
  }, []);

  const navigateToFlightDetailsContent = () => {
    navigate(`/reservation/flights/${params.flightId}`);
  };

  let reservationModalContent;

  if (generatedResIdFromBackend && !isLoading && !error) {
    reservationModalContent = (
      <div className={styles["reservation-response"]}>
        <div>
          <img src={success} />
          <h4>Хвала на поверењу, успешно сте резервисали карту!</h4>
          <p>
            Број Ваше резервације је: <span>{generatedResIdFromBackend}</span>.
            Молимо Вас да сачувате негде број резервације како бисте могли
            накнадно да проверите резервацију.
          </p>
        </div>
        <button
          onClick={navigateToFlightDetailsContent}
          className={`${styles["modal-button"]} submit-button`}
        >
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
        <button
          onClick={navigateToFlightDetailsContent}
          className={`${styles["modal-button"]} submit-button`}
        >
          У реду
        </button>
      </div>
    );
  }

  return (
    <div className={styles["reservation-modal"]}>{reservationModalContent}</div>
  );
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
