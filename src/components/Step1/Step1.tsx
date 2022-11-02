import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Step1.module.css";
import chevron from "../../assets/chevron-white.png";
import useInput from "../../hooks/use-input";

const Step1 = () => {
  const navigate = useNavigate();
  const params = useParams();
  const valueHandler = (value: any) => value.trim() !== "";
  const {
    value: enteredName,
    valueInputClasses: nameInputClasses,
    changeInputValueHandler: changeNameValueHandler,
    blurInputValueHandler: blurNameValueHandler,
    reset: nameReset,
  } = useInput(valueHandler);

  const {
    value: enteredSurname,
    valueInputClasses: surnameInputClasses,
    changeInputValueHandler: changeSurnameValueHandler,
    blurInputValueHandler: blurSurnameValueHandler,
    reset: surnameReset,
  } = useInput(valueHandler);

  const {
    value: enteredEmail,
    valueInputClasses: emailInputClasses,
    changeInputValueHandler: changeEmailValueHandler,
    blurInputValueHandler: blurEmailValueHandler,
    reset: emailReset,
  } = useInput(valueHandler);

  const {
    value: enteredPhoneNumber,
    valueInputClasses: phoneNumberInputClasses,
    changeInputValueHandler: changePhoneNumberValueHandler,
    blurInputValueHandler: blurPhoneNumberValueHandler,
    reset: phoneNumberReset,
  } = useInput(valueHandler);

  const step1SubmitHandler = (e: any) => {
    blurNameValueHandler();
    blurSurnameValueHandler();
    blurEmailValueHandler();
    blurPhoneNumberValueHandler();
    e.preventDefault();
    if (
      valueHandler(enteredName) &&
      valueHandler(enteredSurname) &&
      valueHandler(enteredEmail) &&
      valueHandler(enteredPhoneNumber)
    ) {
      const formValues = {
        enteredName,
        enteredSurname,
        enteredEmail,
        enteredPhoneNumber,
      };
      // alert(formValues);
      navigate(`/reservation/flights/${params.flightId}/reserve-flight/step-2`);
      nameReset();
      surnameReset();
      emailReset();
      phoneNumberReset();
    }
  };

  return (
    <form className={styles["step-1"]} onSubmit={step1SubmitHandler}>
      <h4>Унесите Ваше податке</h4>
      <p>Ваши подаци су анонимни и заштићени од трећих лица.</p>
      <div className={styles["form-holder"]}>
        <div className={styles["form-group"]}>
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
        </div>
        <div className={styles["form-group"]}>
          <input
            placeholder="xd"
            type="text"
            onBlur={blurSurnameValueHandler}
            value={enteredSurname}
            onChange={changeSurnameValueHandler}
            className={
              surnameInputClasses ? styles["invalid-input"] : styles.input
            }
          />
          <div className={styles["label-holder"]}>
            <label>Презиме</label>
          </div>
        </div>
        <div className={styles["form-group"]}>
          <input
            placeholder="xd"
            type="email"
            onBlur={blurEmailValueHandler}
            value={enteredEmail}
            onChange={changeEmailValueHandler}
            className={
              emailInputClasses ? styles["invalid-input"] : styles.input
            }
          />
          <div className={styles["label-holder"]}>
            <label>Мејл адреса</label>
          </div>
        </div>
        <div className={styles["form-group"]}>
          <input
            placeholder="xd"
            type="text"
            onBlur={blurPhoneNumberValueHandler}
            value={enteredPhoneNumber}
            onChange={changePhoneNumberValueHandler}
            className={
              phoneNumberInputClasses ? styles["invalid-input"] : styles.input
            }
          />
          <div className={styles["label-holder"]}>
            <label>Број телефона</label>
          </div>
        </div>
      </div>
      <div className={styles["step-action"]}>
        <button type="submit">
          <span>Наставите</span>
          <img src={chevron} />
        </button>
      </div>
    </form>
  );
};

export default Step1;
