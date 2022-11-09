import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Step1.module.css";
import chevron from "../../assets/chevron-white.png";
import useInput from "../../hooks/use-input";
import { ReservationDetailsContext } from "../../store/reservation-details-context";
import { Step1Details } from "../../models/reservation.model";

const Step1 = () => {
  const navigate = useNavigate();
  const params = useParams();
  const ctx = useContext(ReservationDetailsContext);

  const valueHandler = (value: any) => value.trim() !== "";
  const {
    value: enteredName,
    valueInputClasses: nameInputClasses,
    changeInputValueHandler: changeNameValueHandler,
    blurInputValueHandler: blurNameValueHandler,
    reset: nameReset,
    replaceInputValueHandler: replaceName,
  } = useInput(valueHandler);

  const {
    value: enteredSurname,
    valueInputClasses: surnameInputClasses,
    changeInputValueHandler: changeSurnameValueHandler,
    blurInputValueHandler: blurSurnameValueHandler,
    reset: surnameReset,
    replaceInputValueHandler: replaceSurname,
  } = useInput(valueHandler);

  const {
    value: enteredEmail,
    valueInputClasses: emailInputClasses,
    changeInputValueHandler: changeEmailValueHandler,
    blurInputValueHandler: blurEmailValueHandler,
    reset: emailReset,
    replaceInputValueHandler: replaceEmail,
  } = useInput(valueHandler);

  const {
    value: enteredPhoneNumber,
    valueInputClasses: phoneNumberInputClasses,
    changeInputValueHandler: changePhoneNumberValueHandler,
    blurInputValueHandler: blurPhoneNumberValueHandler,
    reset: phoneNumberReset,
    replaceInputValueHandler: replacePhoneNumber,
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
      const formValues: Step1Details = {
        enteredName,
        enteredSurname,
        enteredEmail,
        enteredPhoneNumber,
      };
      ctx.saveStep1InfoHandler(formValues);
      // alert(formValues);
      navigate(`/reservation/flights/${params.flightId}/reserve-flight/step-2`);
      nameReset();
      surnameReset();
      emailReset();
      phoneNumberReset();
    }
  };

  useEffect(() => {
    replaceName(ctx.name);
    replaceSurname(ctx.surname);
    replaceEmail(ctx.email);
    replacePhoneNumber(ctx.phoneNumber);
  }, []);

  return (
    <form className={styles["step-1"]} onSubmit={step1SubmitHandler}>
      <h4>Унесите Ваше податке</h4>
      <p>Ваши подаци су анонимни и заштићени од трећих лица.</p>
      <div className={styles["form-holder"]}>
        <div className="form-group">
          <input
            placeholder="xd"
            type="text"
            onBlur={blurNameValueHandler}
            value={enteredName}
            onChange={changeNameValueHandler}
            className={nameInputClasses ? "invalid-input" : "input"}
          />
          <div className="label-holder">
            <label>Име</label>
          </div>
        </div>
        <div className="form-group">
          <input
            placeholder="xd"
            type="text"
            onBlur={blurSurnameValueHandler}
            value={enteredSurname}
            onChange={changeSurnameValueHandler}
            className={surnameInputClasses ? "invalid-input" : "input"}
          />
          <div className="label-holder">
            <label>Презиме</label>
          </div>
        </div>
        <div className="form-group">
          <input
            placeholder="xd"
            type="email"
            onBlur={blurEmailValueHandler}
            value={enteredEmail}
            onChange={changeEmailValueHandler}
            className={emailInputClasses ? "invalid-input" : "input"}
          />
          <div className="label-holder">
            <label>Мејл адреса</label>
          </div>
        </div>
        <div className="form-group">
          <input
            placeholder="xd"
            type="text"
            onBlur={blurPhoneNumberValueHandler}
            value={enteredPhoneNumber}
            onChange={changePhoneNumberValueHandler}
            className={phoneNumberInputClasses ? "invalid-input" : "input"}
          />
          <div className="label-holder">
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
