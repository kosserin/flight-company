import { useContext, useEffect } from "react";
import styles from "./Step3.module.css";
import { useNavigate, useParams } from "react-router-dom";
import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";
import { ReservationDetailsContext } from "../../store/reservation-details-context";
import { FlightsContext } from "../../store/flights-context";

const Step3 = () => {
  const reservationDetailsCtx = useContext(ReservationDetailsContext);
  const flightsCtx = useContext(FlightsContext);
  const navigate = useNavigate();
  const params = useParams();

  const tax = 20;

  useEffect(() => {
    if (
      reservationDetailsCtx.name &&
      reservationDetailsCtx.surname &&
      reservationDetailsCtx.email &&
      reservationDetailsCtx.phoneNumber &&
      reservationDetailsCtx.cardholderName &&
      reservationDetailsCtx.cardNumber &&
      reservationDetailsCtx.expirationDate &&
      reservationDetailsCtx.securityCode
    ) {
    } else {
      navigate(`/reservation/flights/${params.flightId}`);
    }
  }, []);

  const editPayment = () => {
    navigate(`/reservation/flights/${params.flightId}/reserve-flight/step-2`);
  };

  const editPersonal = () => {
    navigate(`/reservation/flights/${params.flightId}/reserve-flight/step-1`);
  };

  return (
    <div className={styles["step-3"]}>
      <p className={styles["step-heading"]}>Молимо потврдите и пошаљите Вашу резервацију</p>
      <p className={styles["step-desc"]}>
        Кликом на резервишите карту, слажете се са нашим условима коришћења и политиком приватности.
      </p>
      <div className={styles["step-3__holder"]}>
        <div className={styles["review-holder"]}>
          <div className={styles["review-header"]}>
            <h5>Плаћање</h5>
            <button onClick={editPayment}>Измените</button>
          </div>
          <div className={styles["review-body"]}>
            <div className={styles["payment-card-number"]}>
              <img src={reservationDetailsCtx.cardNumber.startsWith("5") ? mastercard : visa} />
              <p>
                <span>****</span> {reservationDetailsCtx.cardNumber.slice(-4)}
              </p>
            </div>
            <p>{reservationDetailsCtx.expirationDate}</p>
          </div>
        </div>
        <div className={styles["review-holder"]}>
          <div className={styles["review-header"]}>
            <h5>Подаци</h5>
            <button onClick={editPersonal}>Измените</button>
          </div>
          <div className={styles["review-items"]}>
            <div className={styles["review-item"]}>
              <p>Име</p>
              <p>{reservationDetailsCtx.name}</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Презиме</p>
              <p>{reservationDetailsCtx.surname}</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Мејл адреса</p>
              <p>{reservationDetailsCtx.email}</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Број телефона</p>
              <p>{reservationDetailsCtx.phoneNumber}</p>
            </div>
          </div>
        </div>
        <div className={styles["review-holder"]}>
          <div className={styles["review-header"]}>
            <h5>Преглед резервације</h5>
          </div>
          <div className={styles["review-items"]}>
            <div className={styles["review-item"]}>
              <p>Цена карте</p>
              <p>{(flightsCtx.selectedFlight.price - flightsCtx.selectedFlight.price * (tax / 100)).toFixed(2)} рсд</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Порез</p>
              <p>{(flightsCtx.selectedFlight.price * (tax / 100)).toFixed(2)} рсд</p>
            </div>
            <div className={`${styles["review-item"]} ${styles["total-item"]}`}>
              <p>Укупно</p>
              <p>{flightsCtx.selectedFlight.price.toFixed(2)} рсд</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["step-action"]}>
        <button onClick={() => navigate(`/reservation/flights/${params.flightId}/reservation-done`)}>
          <span>Резервишите карту</span>
        </button>
      </div>
    </div>
  );
};

export default Step3;
