import React, { useContext, useEffect, useState } from "react";
import styles from "./Step3.module.css";
import { useNavigate, useParams } from "react-router-dom";
import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";
import { ReservationDetailsContext } from "../../store/reservation-details-context";

const Step3 = () => {
  const ctx = useContext(ReservationDetailsContext);
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flightPrice, setFlightPrice] = useState<number | null>(null);

  const tax = 20;

  const getFlightInfo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const response = await fetch(
      //   "http://localhost:8086/api/flights/6319b44f167a9b1caef8c5b3"
      // );
      // const fetchedFlight: Flight = await response.json();
      // setFlightPrice(fetchedFlight.price);
      setFlightPrice(5000.0);
      setIsLoading(false);
    } catch (err: any) {
      setError("Нешто није у реду. Молимо покушајте поново.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      ctx.name &&
      ctx.surname &&
      ctx.email &&
      ctx.phoneNumber &&
      ctx.cardholderName &&
      ctx.cardNumber &&
      ctx.expirationDate &&
      ctx.securityCode
    ) {
      getFlightInfo();
    } else {
      navigate(`/reservation/flights/${params.flightId}`);
    }
  }, []);

  const editPayment = () => {
    navigate(-1);
  };

  const editPersonal = () => {
    navigate(`/reservation/flights/${params.flightId}/reserve-flight/step-1`);
  };

  return (
    <div className={styles["step-3"]}>
      <h4>Молимо потврдите и пошаљите Вашу резервацију</h4>
      <p>
        Кликом на резервишите карту, слажете се са нашим условима коришћења и
        политиком приватности.
      </p>
      <div className={styles["step-3__holder"]}>
        <div className={styles["review-holder"]}>
          <div className={styles["review-header"]}>
            <h5>Плаћање</h5>
            <button onClick={editPayment}>Измените</button>
          </div>
          <div className={styles["review-body"]}>
            <div className={styles["payment-card-number"]}>
              <img src={ctx.cardNumber.startsWith("5") ? mastercard : visa} />
              <p>
                <span>****</span> {ctx.cardNumber.slice(-4)}
              </p>
            </div>
            <p>{ctx.expirationDate}</p>
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
              <p>{ctx.name}</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Презиме</p>
              <p>{ctx.surname}</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Мејл адреса</p>
              <p>{ctx.email}</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Број телефона</p>
              <p>{ctx.phoneNumber}</p>
            </div>
          </div>
        </div>
        {!isLoading && flightPrice && (
          <div className={styles["review-holder"]}>
            <div className={styles["review-header"]}>
              <h5>Преглед резервације</h5>
            </div>
            <div className={styles["review-items"]}>
              <div className={styles["review-item"]}>
                <p>Цена карте</p>
                <p>{flightPrice.toFixed(2)} рсд</p>
              </div>
              <div className={styles["review-item"]}>
                <p>Порез</p>
                <p>{(flightPrice * (tax / 100)).toFixed(2)} рсд</p>
              </div>
              <div
                className={`${styles["review-item"]} ${styles["total-item"]}`}
              >
                <p>Укупно</p>
                <p>
                  {(flightPrice + flightPrice * (tax / 100)).toFixed(2)} рсд
                </p>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className={styles["review-holder"]}>
            <div className={styles["review-header"]}>
              <h5>Преглед резервације</h5>
            </div>
            <div className={styles["lds-ring"]}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {!isLoading && error && (
          <div
            className={`${styles["review-holder"]} ${styles["review-holder__error"]}`}
          >
            <div className={styles["review-header"]}>
              <h5>Преглед резервације</h5>
            </div>
            <p className={styles["error-text"]}>{error}</p>
          </div>
        )}
      </div>
      <div className={styles["step-action"]}>
        <button
          onClick={() =>
            navigate(`/reservation/flights/${params.flightId}/reservation-done`)
          }
          disabled={isLoading || !!error}
        >
          <span>Резервишите карту</span>
        </button>
      </div>
    </div>
  );
};

export default Step3;
