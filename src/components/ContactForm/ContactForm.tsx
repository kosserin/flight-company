import React, { FormEvent, useState } from "react";
import styles from "./ContactForm.module.css";
import facebookIcon from "../../assets/social/facebook.svg";
import telegramIcon from "../../assets/social/telegram.svg";
import instagramIcon from "../../assets/social/instagram.svg";
import supportIcon from "../../assets/contact/support.svg";
import locationIcon from "../../assets/contact/location.svg";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const nameChangeHandler = (e: any) => {
    setName(e.target.value);
  };

  const surnameChangeHandler = (e: any) => {
    setSurname(e.target.value);
  };

  const emailChangeHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const phoneNumberChangeHandler = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const messageChangeHandler = (e: any) => {
    setMessage(e.target.value);
  };

  const contactSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    const formValues = {
      name,
      surname,
      email,
      phoneNumber,
      message,
    };
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
              value={name}
              onChange={nameChangeHandler}
            />
            <div className={styles["label-holder"]}>
              <label>Име</label>
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
          <div className={styles["form-group"]}>
            <input
              placeholder="xd"
              type="email"
              value={email}
              onChange={emailChangeHandler}
            />
            <div className={styles["label-holder"]}>
              <label>Мејл адреса</label>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <input
              placeholder="xd"
              type="text"
              value={phoneNumber}
              onChange={phoneNumberChangeHandler}
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
              value={message}
              onChange={messageChangeHandler}
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
            <a href="#">KossAirways а.д. Београд</a>
            <p>Јурија Гагарина 12, 11070 Нови Београд</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
