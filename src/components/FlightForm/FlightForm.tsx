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
import { useNavigate } from "react-router-dom";
import "../../index.css";
import useInput from "../../hooks/use-input";
import ReactDOM from "react-dom";
import CheckReservationModal from "../CheckReservationModal/CheckReservationModal";
import CheckFlightStatusModal from "../CheckFlightStatusModal/CheckFlightStatusModal";
import { format, getDayOfYear } from "date-fns";
import axios from "axios";
const FlightForm = () => {
  let navigate = useNavigate();

  const [activeStyle, setActiveStyle] = useState({
    backgroundColor: "var(--dark-purple-color)",
    borderRadius: "10px 0 10px 0px",
  });
  const [fetchedFrom, setFetchedFrom] = useState<string[]>([]);
  const [fetchedTo, setFetchedTo] = useState<string[]>([]);
  const activeFormRef = useRef<HTMLDivElement>(null);
  // SHOW STATE CONTROL
  const [showReserveFlightContent, setShowReserveFlightContent] = useState(false);
  const [showCheckReservationContent, setShowCheckReservationContent] = useState(false);
  const [showFlightStatusContent, setShowFlightStatusContent] = useState(false);
  const [showCheckReservationModal, setShowCheckReservationModal] = useState(false);
  const [showCheckFlightStatusModal, setShowCheckFlightStatusModal] = useState(false);

  const fromValueHandler = (value: any) => value.trim() !== "" && value.length > 2;

  const toValueHandler = (value: any) => value.trim() !== "" && value.length > 2;

  const departureDateValueHandler = (value: any) => {
    const notEmpty = value.trim() !== "";
    const minDate = getDayOfYear(new Date(value)) >= getDayOfYear(new Date());

    return notEmpty && minDate;
  };

  const reservationIdValueHandler = (value: any) => value.trim() !== "" && value.length > 2;

  const flightIdValueHandler = (value: any) => value.trim() !== "" && value.length > 2;

  const {
    value: enteredFrom,
    valueInputClasses: fromInputClasses,
    changeInputValueHandler: changeFromValueHandler,
    blurInputValueHandler: blurFromValueHandler,
    reset: fromReset,
    replaceInputValueHandler: replaceFromHandler,
  } = useInput(fromValueHandler);

  const {
    value: enteredTo,
    valueInputClasses: toInputClasses,
    changeInputValueHandler: changeToHandler,
    blurInputValueHandler: blurToHandler,
    reset: toReset,
    replaceInputValueHandler: replaceToHandler,
  } = useInput(toValueHandler);

  const {
    value: enteredDepartureDate,
    valueInputClasses: departureDateInputClasses,
    changeInputValueHandler: changeDepartureDateHandler,
    blurInputValueHandler: blurDepartureDateHandler,
    reset: departureDateReset,
    replaceInputValueHandler: replaceDepartureDateHandler,
  } = useInput(departureDateValueHandler);

  const {
    value: enteredReservationId,
    valueInputClasses: reservationIdInputClasses,
    changeInputValueHandler: changeReservationIdHandler,
    blurInputValueHandler: blurReservationIdHandler,
    reset: reservationIdReset,
  } = useInput(reservationIdValueHandler);

  const {
    value: enteredFlightId,
    valueInputClasses: flightIdInputClasses,
    changeInputValueHandler: changeFlightIdHandler,
    blurInputValueHandler: blurFlightIdHandler,
    reset: flightIdReset,
  } = useInput(flightIdValueHandler);

  const reserveFlightHandler = (e: React.FormEvent) => {
    blurFromValueHandler();
    blurToHandler();
    blurDepartureDateHandler();
    e.preventDefault();
    if (fromValueHandler(enteredFrom) && toValueHandler(enteredTo) && departureDateValueHandler(enteredDepartureDate)) {
      fromReset();
      toReset();
      departureDateReset();
      navigate(`/reservation/flights?from=${enteredFrom}&to=${enteredTo}&dateOfDeparture=${enteredDepartureDate}`);
    }
  };

  const flightStatusHandler = (e: React.FormEvent) => {
    blurFlightIdHandler();
    e.preventDefault();
    if (flightIdValueHandler(enteredFlightId)) {
      setShowCheckFlightStatusModal(true);
    }
  };

  const checkReservationHandler = (e: React.FormEvent) => {
    blurReservationIdHandler();
    e.preventDefault();
    if (reservationIdValueHandler(enteredReservationId)) {
      setShowCheckReservationModal(true);
    }
  };

  const showCheckReservationModalHandler = () => {
    setShowCheckReservationModal(true);
  };

  const hideCheckReservationModalHandler = () => {
    setShowCheckReservationModal(false);
    reservationIdReset();
  };

  const showCheckFlightStatusModalHandler = () => {
    setShowCheckFlightStatusModal(true);
  };

  const hideCheckFlightStatusModalHandler = () => {
    setShowCheckFlightStatusModal(false);
    flightIdReset();
  };

  const fillFromHandler = (country: string) => {
    replaceFromHandler(country);
  };

  const fillToHandler = (country: string) => {
    replaceToHandler(country);
  };

  const allButtons = document.querySelectorAll(".form-title") as NodeListOf<HTMLElement>;

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
        } else if (allButtons[allButtons.length - 1].offsetLeft === e.target.offsetLeft) {
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
    fetchFromDestinations();
    fetchToDestinations();
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
    replaceDepartureDateHandler(format(new Date(), "yyyy-MM-dd"));
    replaceFromHandler("Београд");
  }, []);

  async function fetchFromDestinations() {
    const response = await axios.get("https://flights.herokuapp.com/api/flights/names/from");
    const data: string[] = await response.data;
    setFetchedFrom(data);
  }

  async function fetchToDestinations() {
    const response = await axios.get("https://flights.herokuapp.com/api/flights/names/to");
    const data: string[] = await response.data;
    setFetchedTo(data);
  }

  const swapFromToHandler = () => {
    let holder = enteredFrom;
    replaceFromHandler(enteredTo);
    replaceToHandler(holder);
  };

  const reserveFlightContent = (
    <form autoComplete="off" className={styles["form-content"]} onSubmit={reserveFlightHandler}>
      <div className={styles["from-to__holder"]}>
        <div className={`${styles["form-group"]} form-group`}>
          <input
            placeholder="xd"
            type="text"
            value={enteredFrom}
            onChange={changeFromValueHandler}
            onBlur={blurFromValueHandler}
            className={fromInputClasses ? "invalid-input" : "input"}
          />
          <div className={`${styles["label-holder"]} label-holder`}>
            <label>Од</label>
          </div>
          {enteredFrom && (
            <ul className={styles["autocomplete-list"]}>
              {fetchedFrom
                .filter(
                  (country) => country.substring(0, enteredFrom.length).toUpperCase() == enteredFrom.toUpperCase()
                )
                .map((country, index) => (
                  <li
                    key={country + index}
                    onClick={() => fillFromHandler(country)}
                    className={styles["autocomplete-item"]}
                  >
                    {country}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className={`${styles["form-group"]} form-group`}>
          <input
            placeholder="xd"
            type="text"
            value={enteredTo}
            onChange={changeToHandler}
            onBlur={blurToHandler}
            className={toInputClasses ? "invalid-input" : "input"}
          />
          <div className={`${styles["label-holder"]} label-holder`}>
            <label>До</label>
          </div>
          {enteredTo && (
            <ul className={styles["autocomplete-list"]}>
              {fetchedTo
                .filter((country) => country.substring(0, enteredTo.length).toUpperCase() == enteredTo.toUpperCase())
                .map((country, index) => (
                  <li
                    key={country + index}
                    onClick={() => fillToHandler(country)}
                    className={styles["autocomplete-item"]}
                  >
                    {country}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className={styles["swap-holder"]} onClick={swapFromToHandler}>
          <img src={swapIcon} />
        </div>
      </div>
      <div className={`${styles["form-group"]} ${styles["date-group"]} form-group`}>
        <input
          placeholder="xd"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          required
          value={enteredDepartureDate}
          onChange={changeDepartureDateHandler}
          onBlur={blurDepartureDateHandler}
          className={departureDateInputClasses ? "invalid-input" : "input"}
        />
        <div className="label-holder">
          <img src={calendarIcon} alt="" />
          <label>Датум</label>
        </div>
      </div>
      <button type="submit" className="submit-button">
        <span>Претражите</span>
      </button>
    </form>
  );

  const checkReservationContent = (
    <form className={`${styles["form-content"]} ${styles["second-type-of-form"]}`} onSubmit={checkReservationHandler}>
      <div className="form-group">
        <input
          placeholder="xd"
          type="text"
          onBlur={blurReservationIdHandler}
          value={enteredReservationId}
          onChange={changeReservationIdHandler}
          className={reservationIdInputClasses ? "invalid-input" : "input"}
        />
        <div className="label-holder">
          <label>Шифра резервације</label>
        </div>
      </div>
      <button type="submit" className="submit-button">
        <span>Претражите</span>
      </button>
    </form>
  );
  const flightStatusContent = (
    <form className={`${styles["form-content"]} ${styles["second-type-of-form"]}`} onSubmit={flightStatusHandler}>
      <div className="form-group">
        <input
          placeholder="xd"
          type="text"
          value={enteredFlightId}
          onBlur={blurFlightIdHandler}
          className={flightIdInputClasses ? "invalid-input" : "input"}
          onChange={changeFlightIdHandler}
        />
        <div className="label-holder">
          <label>Број лета</label>
        </div>
      </div>
      <button type="submit" className="submit-button">
        <span>Претражите</span>
      </button>
    </form>
  );
  return (
    <div className={styles["flight-form"]}>
      {showCheckReservationModal &&
        ReactDOM.createPortal(
          <CheckReservationModal
            showCheckReservationModal={showCheckReservationModalHandler}
            hideCheckReservationModal={hideCheckReservationModalHandler}
            reservationId={enteredReservationId}
          />,
          document.getElementById("modal-root") as HTMLElement
        )}
      {showCheckFlightStatusModal &&
        ReactDOM.createPortal(
          <CheckFlightStatusModal
            showCheckFlightStatusModal={showCheckFlightStatusModalHandler}
            hideCheckFlightStatusModal={hideCheckFlightStatusModalHandler}
            flightId={enteredFlightId}
          />,
          document.getElementById("modal-root") as HTMLElement
        )}
      <div className={styles["form-header"]} id="formHeader">
        <div onClick={activeFormHandler} className={`${styles["form-title"]} form-title activated-title`} role="button">
          <img src={flightImage} alt="" />
          <img src={flightImageWhite} alt="" />
          <h3>Резервишите лет</h3>
        </div>
        <div onClick={activeFormHandler} className={`${styles["form-title"]} form-title`} role="button">
          <img src={passengerImage} alt="" />
          <img src={passengerImageWhite} alt="" />
          <h3>Проверите резервацију</h3>
        </div>
        <div onClick={activeFormHandler} className={`${styles["form-title"]} form-title`} role="button">
          <img src={travelImage} alt="" />
          <img src={travelImageWhite} alt="" />
          <h3>Статус лета</h3>
        </div>
        <div ref={activeFormRef} className={styles.active} style={activeStyle}></div>
      </div>
      {showReserveFlightContent && reserveFlightContent}
      {showCheckReservationContent && checkReservationContent}
      {showFlightStatusContent && flightStatusContent}
    </div>
  );
};

export default FlightForm;
