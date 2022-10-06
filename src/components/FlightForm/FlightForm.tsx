import React, { useRef, useState, useEffect } from "react";
import styles from "./FlightForm.module.css";
import flightImage from "../../assets/flight.png";
import flightImageWhite from "../../assets/flight-white.png";
import passengerImage from "../../assets/passenger.png";
import passengerImageWhite from "../../assets/passenger-white.png";
import travelImage from "../../assets/travel.png";
import travelImageWhite from "../../assets/travel-white.png";
import swapIcon from "../../assets/swap.png";
import calendarIcon from "../../assets/calendar.png";
import "../../index.css";
import ReactDOM from "react-dom";
import PassengersModal from "../PassengersModal/PassengersModal";

const FlightForm = () => {
  const [activeStyle, setActiveStyle] = useState({
    backgroundColor: "var(--purple-primary)",
    borderRadius: "10px 0 10px 0px",
  });
  const [showPassengersModal, setShowPassengersModal] = useState(false);
  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date: Date) => {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  };
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [reservationId, setReservationId] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [flightId, setFlightId] = useState<string>("");
  const [flightDepartureDate, setFlightDepartureDate] = useState<string>(
    formatDate(new Date())
  );
  const [departureDate, setDepartureDate] = useState<string>(
    formatDate(new Date())
  );
  const [passengersInputValue, setPassengersInputValue] = useState("1 путник");
  const activeFormRef = useRef<HTMLDivElement>(null);
  const [passengersNumber, setPassengersNumber] = useState(1);
  const [showReserveFlightContent, setShowReserveFlightContent] =
    useState(false);
  const [showCheckReservationContent, setShowCheckReservationContent] =
    useState(false);
  const [showFlightStatusContent, setShowFlightStatusContent] = useState(false);

  const passengerChangeHandler = (event: any) => {
    setPassengersInputValue(event.target.value);
  };

  const fromChangeHandler = (event: any) => {
    setFrom(event.target.value);
  };

  const toChangeHandler = (event: any) => {
    setTo(event.target.value);
  };

  const dateChangeHandler = (event: any) => {
    setDepartureDate(event.target.value);
  };

  const reservationIdChangeHandler = (event: any) => {
    setReservationId(event.target.value);
  };

  const surnameChangeHandler = (event: any) => {
    setSurname(event.target.value);
  };

  const flightIdChangeHandler = (event: any) => {
    setFlightId(event.target.value);
  };

  const flightDepartureDateChangeHandler = (event: any) => {
    setFlightDepartureDate(event.target.value);
  };

  const reserveFlightHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const flightStatusHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const checkReservationHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const allButtons = document.querySelectorAll(
    ".form-title"
  ) as NodeListOf<HTMLElement>;

  const activeFormHandler = (e: any) => {
    allButtons?.forEach((button, index) => {
      if (button.offsetLeft === e.target.offsetLeft) {
        button.classList.add("activated-title");
        if (allButtons[0].offsetLeft === e.target.offsetLeft) {
          setShowReserveFlightContent(true);
          setShowCheckReservationContent(false);
          setShowFlightStatusContent(false);
          setActiveStyle((prev) => {
            return { ...prev, borderRadius: "10px 0 10px 0px" };
          });
        } else if (
          allButtons[allButtons.length - 1].offsetLeft === e.target.offsetLeft
        ) {
          setActiveStyle((prev) => {
            setShowReserveFlightContent(false);
            setShowCheckReservationContent(false);
            setShowFlightStatusContent(true);
            return { ...prev, borderRadius: "0px 10px 0px 10px" };
          });
        } else {
          setShowReserveFlightContent(false);
          setShowCheckReservationContent(true);
          setShowFlightStatusContent(false);
          setActiveStyle((prev) => {
            return { ...prev, borderRadius: "0px 0px 10px 10px" };
          });
        }
      } else {
        button.classList.remove("activated-title");
      }
    });
    setActiveStyle((prev) => {
      return {
        ...prev,
        width: e.target.clientWidth,
        height: e.target.clientHeight,
        top: e.target.offsetTop,
        left: e.target.offsetLeft,
      };
    });
  };

  useEffect(() => {
    const activatedButton = document.querySelector(".activated-title");
    setShowReserveFlightContent(true);
    setActiveStyle((prev) => {
      return {
        ...prev,
        width: activatedButton?.clientWidth,
        height: activatedButton?.clientHeight,
        top: 0,
        left: 0,
      };
    });
  }, []);

  const swapFromToHandler = () => {
    let holder = from;
    setFrom(to);
    setTo(holder);
  };

  const reserveFlightContent = (
    <form className={styles["form-content"]} onSubmit={reserveFlightHandler}>
      <div className={styles["from-to__holder"]}>
        <div className={styles["form-group"]}>
          <input
            placeholder="xd"
            type="text"
            value={from}
            onChange={fromChangeHandler}
          />
          <div className={styles["label-holder"]}>
            <label>Од</label>
          </div>
        </div>
        <div className={styles["form-group"]}>
          <input
            placeholder="xd"
            type="text"
            value={to}
            onChange={toChangeHandler}
          />
          <div className={styles["label-holder"]}>
            <label>До</label>
          </div>
        </div>
        <div className={styles["swap-holder"]} onClick={swapFromToHandler}>
          <img src={swapIcon} />
        </div>
      </div>
      <div className={styles["date-passengers__holder"]}>
        <div className={`${styles["form-group"]} ${styles["date-group"]}`}>
          <input
            placeholder="xd"
            type="date"
            required
            value={departureDate}
            onChange={dateChangeHandler}
          />
          <div className={styles["label-holder"]}>
            <img src={calendarIcon} alt="" />
            <label>Датум</label>
          </div>
        </div>
        <div
          className={`${styles["form-group"]} ${styles["passengers-group"]}`}
          onClick={() => setShowPassengersModal(true)}
        >
          <input
            placeholder="xd"
            type="text"
            readOnly
            value={passengersInputValue}
            onChange={passengerChangeHandler}
            className={styles["input-class"]}
          />
          <div className={styles["label-holder"]}>
            <label>Путници</label>
          </div>
        </div>
      </div>
      <button type="submit" className={styles["submit-btn"]}>
        Претражите
      </button>
    </form>
  );

  const checkReservationContent = (
    <form
      className={`${styles["form-content"]} ${styles["second-type-of-form"]}`}
      onSubmit={checkReservationHandler}
    >
      <div className={styles["form-group"]}>
        <input
          placeholder="xd"
          type="text"
          value={reservationId}
          onChange={reservationIdChangeHandler}
        />
        <div className={styles["label-holder"]}>
          <label>Шифра резервације</label>
        </div>
      </div>
      <div className={styles["form-group"]}>
        <input
          placeholder="xd"
          type="text"
          value={surname}
          onChange={surnameChangeHandler}
        />
        <div className={styles["label-holder"]}>
          <label>Презиме</label>
        </div>
      </div>
      <button type="submit" className={styles["submit-btn"]}>
        Претражите
      </button>
    </form>
  );
  const flightStatusContent = (
    <form
      className={`${styles["form-content"]} ${styles["second-type-of-form"]}`}
      onSubmit={flightStatusHandler}
    >
      <div className={styles["form-group"]}>
        <input
          placeholder="xd"
          type="text"
          value={flightId}
          onChange={flightIdChangeHandler}
        />
        <div className={styles["label-holder"]}>
          <label>Број лета</label>
        </div>
      </div>
      <div className={styles["form-group"]}>
        <input
          placeholder="xd"
          type="date"
          required
          value={flightDepartureDate}
          onChange={flightDepartureDateChangeHandler}
        />
        <div className={styles["label-holder"]}>
          <label>Датум поласка</label>
        </div>
      </div>
      <button type="submit" className={styles["submit-btn"]}>
        Претражите
      </button>
    </form>
  );

  const closePassengersModalHandler = () => {
    setShowPassengersModal(false);
  };

  const updatePassengersNumberHandler = (val: number) => {
    setPassengersNumber(val);
    setPassengersInputValue(`${val} ${val === 1 ? "путник" : "путника"}`);
  };

  return (
    <div className={styles["flight-form"]}>
      <div className={styles["form-header"]} id="formHeader">
        <div
          onClick={activeFormHandler}
          className={`${styles["form-title"]} form-title activated-title`}
          role="button"
        >
          <img src={flightImage} alt="" />
          <img src={flightImageWhite} alt="" />
          <h3>Резервишите лет</h3>
        </div>
        <div
          onClick={activeFormHandler}
          className={`${styles["form-title"]} form-title`}
          role="button"
        >
          <img src={passengerImage} alt="" />
          <img src={passengerImageWhite} alt="" />
          <h3>Проверите резервацију</h3>
        </div>
        <div
          onClick={activeFormHandler}
          className={`${styles["form-title"]} form-title`}
          role="button"
        >
          <img src={travelImage} alt="" />
          <img src={travelImageWhite} alt="" />
          <h3>Статус лета</h3>
        </div>
        <div
          ref={activeFormRef}
          className={styles.active}
          style={activeStyle}
        ></div>
      </div>
      {showReserveFlightContent && reserveFlightContent}
      {showCheckReservationContent && checkReservationContent}
      {showFlightStatusContent && flightStatusContent}
      {showPassengersModal &&
        ReactDOM.createPortal(
          <PassengersModal
            passengersNumber={passengersNumber}
            closePassengersModal={closePassengersModalHandler}
            updatePassengersNumber={updatePassengersNumberHandler}
          />,
          (document.getElementById("passengers-modal-root") as HTMLElement) ||
            null
        )}
    </div>
  );
};

export default FlightForm;
