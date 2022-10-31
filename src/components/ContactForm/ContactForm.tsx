import React, { FormEvent, useState } from "react";
import styles from "./ContactForm.module.css";
import facebookIcon from "../../assets/social/facebook.svg";
import telegramIcon from "../../assets/social/telegram.svg";
import instagramIcon from "../../assets/social/instagram.svg";
import supportIcon from "../../assets/contact/support.svg";
import locationIcon from "../../assets/contact/location.svg";
import useInput from "../../hooks/use-input";

const ContactForm = () => {
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

  const {
    value: enteredMessage,
    valueInputClasses: messageInputClasses,
    changeInputValueHandler: changeMessageValueHandler,
    blurInputValueHandler: blurMessageValueHandler,
    reset: messageReset,
  } = useInput(valueHandler);
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
      valueHandler(enteredEmail) &&
      valueHandler(enteredPhoneNumber) &&
      valueHandler(enteredMessage)
    ) {
      const formValues = {
        enteredName,
        enteredSurname,
        enteredEmail,
        enteredPhoneNumber,
        enteredMessage,
      };
      alert(formValues);
      nameReset();
      surnameReset();
      emailReset();
      phoneNumberReset();
      messageReset();
    }
  };

  return (
    <div className={styles["contact-form-component"]}>
      <div className={styles["contact-left"]}>
        <h4>
          Ту смо да Вам помогнемо, било путем друштвених мрежа, у пословницама
          или путем Контакт центра
        </h4>
        <form
          onSubmit={contactSubmitHandler}
          className={styles["contact-form"]}
        >
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
          <div className={styles["form-group"]}>
            <textarea
              placeholder="xd"
              rows={5}
              cols={5}
              onBlur={blurMessageValueHandler}
              value={enteredMessage}
              onChange={changeMessageValueHandler}
              className={
                messageInputClasses ? styles["invalid-input"] : styles.input
              }
            />
            <div className={styles["label-holder"]}>
              <label>Питање, примедба, сугестија...</label>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <button type="submit">Пошаљите</button>
          </div>
          <div className={styles["contact-social"]}>
            <a href="#">
              <img src={facebookIcon} alt="" />
            </a>
            <a href="#">
              <img src={telegramIcon} alt="" />
            </a>
            <a href="#">
              <img src={instagramIcon} alt="" />
            </a>
          </div>
        </form>
      </div>
      <div className={styles["contact-info"]}>
        <div className={styles["info-item"]}>
          <img src={supportIcon} />
          <div className={styles["info-holder"]}>
            <a href="#">060 2806 1389</a>
            <p>Радним данима од 06.00 - 24.00</p>
          </div>
        </div>
        <div className={styles["info-item"]}>
          <img src={locationIcon} />
          <div className={styles["info-holder"]}>
            <a href="#">Авионик а.д. Београд</a>
            <p>Јурија Гагарина 12, 11070 Нови Београд</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
