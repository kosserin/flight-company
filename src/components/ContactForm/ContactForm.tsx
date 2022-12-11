import { FormEvent, useState } from "react";
import styles from "./ContactForm.module.css";
import facebookIcon from "../../assets/social/facebook.svg";
import telegramIcon from "../../assets/social/telegram.svg";
import instagramIcon from "../../assets/social/instagram.svg";
import useInput from "../../hooks/use-input";
import ContactModal from "../ContactModal/ContactModal";
import ReactDOM from "react-dom";

const ContactForm = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const valueHandler = (value: any) => value.trim() !== "" && value.length > 2;
  const validateEmailHandler = (value: string) => {
    const basicValidation = value.trim() !== "";
    const emailValidation = value.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
    return basicValidation && emailValidation;
  };
  const validatePhoneNumberHandler = (value: string) => {
    const basicValidation = value.trim() !== "";
    const emailValidation = value.match("(([+]3816)|06)([0-9]){7,8}$");
    return basicValidation && emailValidation;
  };
  const validateMessageHandler = (value: any) => value.trim() !== "" && value.length > 10;

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
  } = useInput(validateEmailHandler);

  const {
    value: enteredPhoneNumber,
    valueInputClasses: phoneNumberInputClasses,
    changeInputValueHandler: changePhoneNumberValueHandler,
    blurInputValueHandler: blurPhoneNumberValueHandler,
    reset: phoneNumberReset,
  } = useInput(validatePhoneNumberHandler);

  const {
    value: enteredMessage,
    valueInputClasses: messageInputClasses,
    changeInputValueHandler: changeMessageValueHandler,
    blurInputValueHandler: blurMessageValueHandler,
    reset: messageReset,
  } = useInput(validateMessageHandler);
  const contactSubmitHandler = (e: FormEvent) => {
    blurNameValueHandler();
    blurSurnameValueHandler();
    blurEmailValueHandler();
    blurPhoneNumberValueHandler();
    blurMessageValueHandler();
    e.preventDefault();
    if (
      valueHandler(enteredName) &&
      valueHandler(enteredSurname) &&
      validateEmailHandler(enteredEmail) &&
      validatePhoneNumberHandler(enteredPhoneNumber) &&
      validateMessageHandler(enteredMessage)
    ) {
      const formValues = {
        enteredName,
        enteredSurname,
        enteredEmail,
        enteredPhoneNumber,
        enteredMessage,
      };
      setIsFormValid(true);
      nameReset();
      surnameReset();
      emailReset();
      phoneNumberReset();
      messageReset();
    }
  };

  const closeModalHandler = () => {
    setIsFormValid(false);
  };

  return (
    <div className={styles["contact-form-component"]}>
      {isFormValid &&
        ReactDOM.createPortal(
          <ContactModal closeModal={closeModalHandler} />,
          document.getElementById("modal-root") as HTMLElement
        )}
      <div className={styles["contact-left"]}>
        <h5>Ту смо да Вам помогнемо, било путем друштвених мрежа, у пословницама или путем Контакт центра</h5>
        <form onSubmit={contactSubmitHandler} className={styles["contact-form"]}>
          <div className={`${styles["name-control"]} form-group`}>
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
          <div className={`${styles["surname-control"]} form-group`}>
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
          <div className={`${styles["email-control"]} form-group`}>
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
          <div className={`${styles["phone-control"]} form-group`}>
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
          <div className={`${styles["message-control"]} form-group`}>
            <textarea
              placeholder="xd"
              rows={5}
              cols={5}
              onBlur={blurMessageValueHandler}
              value={enteredMessage}
              onChange={changeMessageValueHandler}
              className={messageInputClasses ? "invalid-input" : "input"}
            />
            <div className="label-holder">
              <label>Питање, примедба, сугестија...</label>
            </div>
          </div>
          <div className={styles["submit-control"]}>
            <button type="submit" className="submit-button">
              Пошаљите
            </button>
          </div>
          <div className={styles["contact-social"]}>
            <a href="https://www.facebook.com/" target="_blank">
              <img src={facebookIcon} alt="" />
            </a>
            <a href="https://telegram.org/" target="_blank">
              <img src={telegramIcon} alt="" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img src={instagramIcon} alt="" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
