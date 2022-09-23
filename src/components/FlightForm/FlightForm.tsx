import React, { useRef, useState, useEffect } from "react";
import styles from "./FlightForm.module.css";
import flightImage from "../../assets/flight.png";
import flightImageWhite from "../../assets/flight-white.png";
import swapIcon from "../../assets/swap.png";
import calendarIcon from "../../assets/calendar.png";
import "../../index.css";

const FlightForm = () => {
  const [activeStyle, setActiveStyle] = useState({
    backgroundColor: "var(--purple-primary)",
    borderRadius: "10px 0 10px 10px",
  });
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const passengersNumberRef = useRef<HTMLInputElement>(null);
  const activeFormRef = useRef<HTMLDivElement>(null);

  const sendRequest = async (
    from: string,
    to: string,
    date: string,
    passengersNumber: string
  ) => {
    const response = await fetch(
      `https://mongodb.com/543543534/flights?from=${from}`,
      {
        method: "GET",
      }
    );
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredFromValue = fromRef.current!.value;
    const enteredToValue = toRef.current!.value;
    const enteredDateValue = dateRef.current!.value;
    const enteredPassengersNumberValue = passengersNumberRef.current!.value;

    // console.log(
    //   enteredFromValue,
    //   enteredToValue,
    //   enteredDateValue,
    //   enteredPassengersNumberValue
    // );

    sendRequest(
      enteredFromValue,
      enteredToValue,
      enteredDateValue,
      enteredPassengersNumberValue
    );
  };

  const activeFormHandler = (e: any) => {
    const allButtons = document.querySelectorAll(
      ".form-title"
    ) as NodeListOf<HTMLElement> | null;
    allButtons?.forEach((button, index) => {
      if (button.offsetLeft === e.target.offsetLeft) {
        console.log(button.offsetLeft, e.target.offsetLeft);
        button.classList.add("activated-title");
        if (allButtons[0].offsetLeft === e.target.offsetLeft) {
          setActiveStyle((prev) => {
            return { ...prev, borderRadius: "10px 0 10px 10px" };
          });
        } else if (
          allButtons[allButtons.length - 1].offsetLeft === e.target.offsetLeft
        ) {
          setActiveStyle((prev) => {
            return { ...prev, borderRadius: "0px 10px 10px 10px" };
          });
        } else {
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
    const firstBtn = document.querySelector(".activated-title");
    console.log(firstBtn);
    setActiveStyle((prev) => {
      return {
        ...prev,
        width: firstBtn?.clientWidth,
        height: firstBtn?.clientHeight,
        top: 0,
        left: 0,
      };
    });
  }, []);

  return (
    <div className={styles["flight-form"]}>
      <div className={styles["form-header"]} id="formHeader">
        <div
          onClick={activeFormHandler}
          className={`${styles["form-title"]} form-title activated-title`}
          role="button"
        >
          <img src={flightImageWhite} alt="" />
          <img src={flightImage} alt="" />
          <h3>Резервишите лет</h3>
        </div>
        <div
          onClick={activeFormHandler}
          className={`${styles["form-title"]} form-title`}
          role="button"
        >
          <img src={flightImage} alt="" />
          <h3>Резервишите лет</h3>
        </div>
        <div
          onClick={activeFormHandler}
          className={`${styles["form-title"]} form-title`}
          role="button"
        >
          <img src={flightImage} alt="" />
          <h3>Резервишите лет</h3>
        </div>
        <div
          ref={activeFormRef}
          className={styles.active}
          style={activeStyle}
        ></div>
      </div>
      <form className={styles["form-content"]} onSubmit={submitFormHandler}>
        <div className={styles["from-to__holder"]}>
          <div className={styles["form-group"]}>
            <input ref={fromRef} type="text" />
            <div className={styles["label-holder"]}>
              <label>Од</label>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <input ref={toRef} type="text" />
            <div className={styles["label-holder"]}>
              <label>До</label>
            </div>
          </div>
          <div className={styles["swap-holder"]}>
            <img src={swapIcon} />
          </div>
        </div>
        <div className={styles["form-group"]}>
          <input ref={dateRef} type="date" placeholder="" />
          <div className={styles["label-holder"]}>
            <img src={calendarIcon} alt="" />
            <label>Датум</label>
          </div>
        </div>
        <div className={styles["form-group"]}>
          <input ref={passengersNumberRef} type="number" />
          <div className={styles["label-holder"]}>
            <label>Путници</label>
          </div>
        </div>
        <button type="submit">Претражите</button>
      </form>
    </div>
  );
};

export default FlightForm;
