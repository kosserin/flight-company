import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Step2.module.css";
import mastercard from "../../assets/mastercard.png";
import visa from "../../assets/visa.png";
import useInput from "../../hooks/use-input";
import { ReservationDetailsContext } from "../../store/reservation-details-context";
import { Step2Details } from "../../models/reservation.model";

const Step2 = () => {
  const ctx = useContext(ReservationDetailsContext);
  const navigate = useNavigate();
  const params = useParams();
  const cardholderValueHandler = (value: string) => {
    let first = value.trim() !== "" && value.length > 2;
    return first;
  };
  const expirationDateValueHandler = (value: string) =>
    value.match("^(0[1-9]|1[0-2])/?([0-9]{2})$");
  const securityCodeValueHandler = (value: string) => value.match("^[0-9]{3}$");
  const cardNumberValueHandler = (value: string) => {
    const visaValidation = value.match("^4[0-9]{12}(?:[0-9]{3})?$");
    const masterCardValidation = value.match(
      "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$"
    );
    return visaValidation || masterCardValidation;
  };
  const {
    value: enteredCardholder,
    valueInputClasses: cardholderInputClasses,
    changeInputValueHandler: changeCardholderValueHandler,
    blurInputValueHandler: blurCardholderValueHandler,
    reset: cardholderReset,
    replaceInputValueHandler: replaceCardholderValue,
  } = useInput(cardholderValueHandler);
  const {
    value: enteredCardNumber,
    valueInputClasses: cardNumberInputClasses,
    changeInputValueHandler: changeCardNumberValueHandler,
    blurInputValueHandler: blurCardNumberValueHandler,
    reset: cardNumberReset,
    replaceInputValueHandler: replaceCardNumberValue,
  } = useInput(cardNumberValueHandler);
  const {
    value: enteredExpirationDate,
    valueInputClasses: expirationDateInputClasses,
    changeInputValueHandler: changeExpirationDateValueHandler,
    blurInputValueHandler: blurExpirationDateValueHandler,
    reset: expirationDateReset,
    replaceInputValueHandler: replaceExpirationDateValue,
  } = useInput(expirationDateValueHandler);
  const {
    value: enteredSecurityCode,
    valueInputClasses: securityCodeInputClasses,
    changeInputValueHandler: changeSecurityCodeValueHandler,
    blurInputValueHandler: blurSecurityCodeValueHandler,
    reset: securityCodeReset,
    replaceInputValueHandler: replaceSecurityCodeValue,
  } = useInput(securityCodeValueHandler);
  const step2SubmitHandler = (e: any) => {
    blurCardholderValueHandler();
    blurCardNumberValueHandler();
    blurExpirationDateValueHandler();
    blurSecurityCodeValueHandler();
    e.preventDefault();
    if (
      cardholderValueHandler(enteredCardholder) &&
      cardNumberValueHandler(enteredCardNumber) &&
      expirationDateValueHandler(enteredExpirationDate) &&
      securityCodeValueHandler(enteredSecurityCode)
    ) {
      const formValues: Step2Details = {
        enteredCardholder,
        enteredCardNumber,
        enteredExpirationDate,
        enteredSecurityCode,
      };
      ctx.saveStep2InfoHandler(formValues);
      // alert(formValues);
      navigate(`/reservation/flights/${params.flightId}/reserve-flight/step-3`);
      cardholderReset();
      cardNumberReset();
      expirationDateReset();
      securityCodeReset();
    }
  };

  useEffect(() => {
    replaceCardholderValue(ctx.cardholderName);
    replaceCardNumberValue(ctx.cardNumber);
    replaceExpirationDateValue(ctx.expirationDate);
    replaceSecurityCodeValue(ctx.securityCode);
  }, []);

  const blurExpDateHandler = (e: any) => {
    if (e.target.value.match("^[0-9]{4}$")) {
      const valueWithSlash =
        e.target.value.slice(0, 2) + "/" + e.target.value.slice(-2);
      replaceExpirationDateValue(valueWithSlash);
    }

    return blurExpirationDateValueHandler();
  };

  return (
    <form className={styles["step-2"]} onSubmit={step2SubmitHandler}>
      <h4>Одаберите начин плаћања</h4>
      <p>
        Неће Вам бити наплаћено док не прегледате своју резервацију на следећој
        страни.
      </p>
      <div className={styles["form-holder"]}>
        <div className={styles["card-group"]}>
          <div className={styles["radio-group"]}>
            <input
              type="radio"
              name="payment-method"
              id="paymentMethod"
              value="credit-card"
              readOnly
              checked
            />
            <label htmlFor="paymentMethod">Credit card</label>
          </div>
          <div className={styles["card-images"]}>
            <img src={mastercard} />
            <img src={visa} />
          </div>
        </div>
        <div className="form-group">
          <input
            placeholder="xd"
            type="text"
            onBlur={blurCardholderValueHandler}
            value={enteredCardholder}
            onChange={changeCardholderValueHandler}
            className={cardholderInputClasses ? "invalid-input" : "input"}
          />
          <div className="label-holder">
            <label>Име на картици</label>
          </div>
        </div>
        <div className="form-group">
          <input
            placeholder="xd"
            type="text"
            onBlur={blurCardNumberValueHandler}
            value={enteredCardNumber}
            onChange={changeCardNumberValueHandler}
            className={cardNumberInputClasses ? "invalid-input" : "input"}
          />
          <div className="label-holder">
            <label>Број картице</label>
          </div>
        </div>
        <div className={styles["two-form-controls"]}>
          <div className="form-group">
            <input
              placeholder="xd"
              type="text"
              onBlur={blurExpDateHandler}
              value={enteredExpirationDate}
              onChange={changeExpirationDateValueHandler}
              className={expirationDateInputClasses ? "invalid-input" : "input"}
            />
            <div className="label-holder">
              <label>Датум истека (MM/YY)</label>
            </div>
          </div>
          <div className="form-group">
            <input
              placeholder="xd"
              type="text"
              onBlur={blurSecurityCodeValueHandler}
              value={enteredSecurityCode}
              onChange={changeSecurityCodeValueHandler}
              className={securityCodeInputClasses ? "invalid-input" : "input"}
            />
            <div className="label-holder">
              <label>Безбедоносни код</label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["step-action"]}>
        <button type="submit">
          <span>Наставите</span>
        </button>
      </div>
    </form>
  );
};

export default Step2;
