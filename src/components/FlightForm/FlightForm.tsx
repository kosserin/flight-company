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

const FlightForm = () => {
  let navigate = useNavigate();

  const [activeStyle, setActiveStyle] = useState({
    backgroundColor: "var(--purple-primary)",
    borderRadius: "10px 0 10px 0px",
  });
  const [fetchedFrom, setFetchedFrom] = useState<string[]>([]);
  const [fetchedTo, setFetchedTo] = useState<string[]>([]);
  const [isReserveFlightLoading, setIsReserveFlightLoading] =
    useState<boolean>(false);
  const [isCheckReservationLoading, setIsCheckReservationLoading] =
    useState<boolean>(false);
  const [isFlightStatusLoading, setIsFlightStatusLoading] =
    useState<boolean>(false);
  const activeFormRef = useRef<HTMLDivElement>(null);
  // SHOW STATE CONTROL
  const [showReserveFlightContent, setShowReserveFlightContent] =
    useState(false);
  const [showCheckReservationContent, setShowCheckReservationContent] =
    useState(false);
  const [showFlightStatusContent, setShowFlightStatusContent] = useState(false);

  const fromValueHandler = (value: any) =>
    value.trim() !== "" && value.length > 2;

  const toValueHandler = (value: any) =>
    value.trim() !== "" && value.length > 2;

  const departureDateValueHandler = (value: any) => value.trim() !== "";

  const reservationIdValueHandler = (value: any) =>
    value.trim() !== "" && value.length > 2;

  const flightIdValueHandler = (value: any) =>
    value.trim() !== "" && value.length > 2;

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
  } = useInput(departureDateValueHandler, "30-10-2022");

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
    if (
      fromValueHandler(enteredFrom) &&
      toValueHandler(enteredTo) &&
      departureDateValueHandler(enteredDepartureDate)
    ) {
      fromReset();
      toReset();
      departureDateReset();
      navigate(
        `/reservation/flights?from=${enteredFrom}&to=${enteredTo}&date=${enteredDepartureDate}`
      );
    }
  };

  const flightStatusHandler = (e: React.FormEvent) => {
    blurFlightIdHandler();
    e.preventDefault();
    if (flightIdValueHandler(enteredFlightId)) {
      getFlightInfo(enteredFlightId);
      flightIdReset();
    }
  };

  async function getFlightInfo(flightId: string) {
    setIsFlightStatusLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8086/api/flights/${flightId}`
      );
      const data = await response.json();
      setIsFlightStatusLoading(false);
    } catch (err: any) {
      setIsFlightStatusLoading(false);
    }
  }

  const checkReservationHandler = (e: React.FormEvent) => {
    blurReservationIdHandler();
    e.preventDefault();
    if (reservationIdValueHandler(enteredReservationId)) {
      getReservationInfo(enteredReservationId);
      reservationIdReset();
    }
    getReservationInfo(enteredReservationId);
  };

  async function getReservationInfo(resId: string) {
    setIsCheckReservationLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8086/api/flights/${resId}`
      );
      const data = await response.json();
      setIsCheckReservationLoading(false);
    } catch (err: any) {
      setIsCheckReservationLoading(false);
    }
  }

  const fillFromHandler = (country: string) => {
    replaceFromHandler(country);
  };

  const fillToHandler = (country: string) => {
    replaceToHandler(country);
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
    replaceDepartureDateHandler("2022-10-30");
    replaceFromHandler("Београд");
  }, []);

  async function fetchFromDestinations() {
    const response = await fetch(
      "http://localhost:8086/api/flights/names/from"
    );
    const data = await response.json();
    setFetchedFrom(data);
  }

  async function fetchToDestinations() {
    const response = await fetch("http://localhost:8086/api/flights/names/to");
    const data = await response.json();
    setFetchedTo(data);
  }

  const swapFromToHandler = () => {
    let holder = enteredFrom;
    replaceFromHandler(enteredTo);
    replaceToHandler(holder);
  };

  const reserveFlightContent = (
    <form
      autoComplete="off"
      className={styles["form-content"]}
      onSubmit={reserveFlightHandler}
    >
      <div className={styles["from-to__holder"]}>
        <div className={styles["form-group"]}>
          <input
            placeholder="xd"
            type="text"
            value={enteredFrom}
            onChange={changeFromValueHandler}
            onBlur={blurFromValueHandler}
            className={
              fromInputClasses ? styles["invalid-input"] : styles.input
            }
          />
          <div className={styles["label-holder"]}>
            <label>Од</label>
          </div>
          {enteredFrom && (
            <ul className={styles["autocomplete-list"]}>
              {fetchedFrom
                .filter(
                  (country) =>
                    country.substring(0, enteredFrom.length).toUpperCase() ==
                    enteredFrom.toUpperCase()
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
        <div className={styles["form-group"]}>
          <input
            placeholder="xd"
            type="text"
            value={enteredTo}
            onChange={changeToHandler}
            onBlur={blurToHandler}
            className={toInputClasses ? styles["invalid-input"] : styles.input}
          />
          <div className={styles["label-holder"]}>
            <label>До</label>
          </div>
          {enteredTo && (
            <ul className={styles["autocomplete-list"]}>
              {fetchedTo
                .filter(
                  (country) =>
                    country.substring(0, enteredTo.length).toUpperCase() ==
                    enteredTo.toUpperCase()
                )
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
      <div className={styles["date-passengers__holder"]}>
        <div className={`${styles["form-group"]} ${styles["date-group"]}`}>
          <input
            placeholder="xd"
            type="date"
            required
            value={enteredDepartureDate}
            onChange={changeDepartureDateHandler}
            onBlur={blurDepartureDateHandler}
            className={
              departureDateInputClasses ? styles["invalid-input"] : styles.input
            }
          />
          <div className={styles["label-holder"]}>
            <img src={calendarIcon} alt="" />
            <label>Датум</label>
          </div>
        </div>
      </div>
      <button type="submit" className={styles["submit-btn"]}>
        {!isReserveFlightLoading && <span>Претражите</span>}
        {isReserveFlightLoading && (
          <div className={styles["lds-ring"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
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
          onBlur={blurReservationIdHandler}
          value={enteredReservationId}
          onChange={changeReservationIdHandler}
          className={
            reservationIdInputClasses ? styles["invalid-input"] : styles.input
          }
        />
        <div className={styles["label-holder"]}>
          <label>Шифра резервације</label>
        </div>
      </div>
      <button type="submit" className={styles["submit-btn"]}>
        {!isCheckReservationLoading && <span>Претражите</span>}
        {isCheckReservationLoading && (
          <div className={styles["lds-ring"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
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
          value={enteredFlightId}
          onBlur={blurFlightIdHandler}
          className={
            flightIdInputClasses ? styles["invalid-input"] : styles.input
          }
          onChange={changeFlightIdHandler}
        />
        <div className={styles["label-holder"]}>
          <label>Број лета</label>
        </div>
      </div>
      <button type="submit" className={styles["submit-btn"]}>
        {!isFlightStatusLoading && <span>Претражите</span>}
        {isFlightStatusLoading && (
          <div className={styles["lds-ring"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </button>
    </form>
  );

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
    </div>
  );
};

export default FlightForm;
