import React from "react";
import styles from "./ContactInfo.module.css";
import supportIcon from "../../assets/contact/support.svg";
import locationIcon from "../../assets/contact/location.svg";

const ContactInfo = () => {
  return (
    <div className={styles["contact-info"]}>
      <div className={styles["info-item"]}>
        <img src={supportIcon} />
        <div className={styles["info-holder"]}>
          <a href="tel:+3816028061389" target="_blank">
            060 2806 1389
          </a>
          <p>Радним данима од 06.00 - 24.00</p>
        </div>
      </div>
      <div className={styles["info-item"]}>
        <img src={locationIcon} />
        <div className={styles["info-holder"]}>
          <a href="https://goo.gl/maps/NLXDq9KgiqykMTe9A" target="_blank">
            Авионик а.д. Београд
          </a>
          <p>Јурија Гагарина 12, 11070 Нови Београд</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
