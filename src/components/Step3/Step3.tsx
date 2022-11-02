import React from "react";
import styles from "./Step3.module.css";
import chevron from "../../assets/chevron-white.png";
import { useNavigate, useParams } from "react-router-dom";
import visa from "../../assets/visa.png";

const Step3 = () => {
  const navigate = useNavigate();
  const params = useParams();
  const reserveFlightHandler = () => {
    alert("reservation done!");
    // navigate("/");
  };

  const tax = 20;
  const price = 5432;

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
              <img src={visa} />
              <p>
                <span>****</span> 1234
              </p>
            </div>
            <p>11/26</p>
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
              <p>Мирко</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Презиме</p>
              <p>Микић</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Мејл адреса</p>
              <p>mirko@gmail.com</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Број телефона</p>
              <p>061 241 3511</p>
            </div>
          </div>
        </div>
        <div className={styles["review-holder"]}>
          <div className={styles["review-header"]}>
            <h5>Преглед резервације</h5>
          </div>
          <div className={styles["review-items"]}>
            <div className={styles["review-item"]}>
              <p>Међузбир</p>
              <p>5432.00 рсд</p>
            </div>
            <div className={styles["review-item"]}>
              <p>Порез</p>
              <p>{(price * (tax / 100)).toFixed(2)} рсд</p>
            </div>
            <div className={`${styles["review-item"]} ${styles["total-item"]}`}>
              <p>Укупно</p>
              <p>{(price + price * (tax / 100)).toFixed(2)} рсд</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["step-action"]}>
        <button onClick={reserveFlightHandler}>
          <span>Резервишите карту</span>
          <img src={chevron} />
        </button>
      </div>
    </div>
  );
};

export default Step3;
