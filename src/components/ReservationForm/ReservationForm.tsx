import React from "react";
import useInput from "../../hooks/use-input";
import styles from "./ReservationForm.module.css";

const ReservationForm = () => {
  const valueHandler = (value: any) => value.trim() !== "";

  const {
    value: enteredName,
    valueInputClasses: nameInputClasses,
    changeInputValueHandler: changeNameValueHandler,
    blurInputValueHandler: blurNameValueHandler,
    reset: nameReset,
  } = useInput(valueHandler);

  const reserveSubmitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className={styles["checkout"]}>
      <form
        className={styles["reservation-form"]}
        onSubmit={reserveSubmitHandler}
      >
        {/* <div className={styles["form-group"]}>
          <input
            placeholder="xd"
            type="text"
            onBlur={blurNameValueHandler}
            value={enteredName}
            onChange={changeNameValueHandler}
            className={
              nameInputClasses ? styles["invalid-input"] : styles.input
            }
          />
          <div className={styles["label-holder"]}>
            <label>Име</label>
          </div>
        </div> */}
        <h1>1389</h1>
        <h1>1389</h1>
        <h1>1389</h1>
        <h1>1389</h1>
        <h1>1389</h1>
        <h1>1389</h1>
        <h1>1389</h1>
        <h1>1389</h1>
        <h1>1389</h1>
        <h1>1389</h1>
        <h1>1389</h1>
        <div>3u02</div>
        <div>3u02</div>
        <div>3u02</div>
        <div>3u02</div>
        <div>3u02</div>
        <div>3u02</div>
      </form>
    </div>
  );
};

export default ReservationForm;
