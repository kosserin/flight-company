import React from "react";
import styles from "./Footer.module.css";
import facebookIcon from "../../assets/social/facebook.svg";
import telegramIcon from "../../assets/social/telegram.svg";
import instagramIcon from "../../assets/social/instagram.svg";
import footerBehind from "../../assets/footer/footer-behind.png";
import footerMid from "../../assets/footer/footer-mid.png";
import footerFront from "../../assets/footer/footer-front.png";

const Footer = () => {
  return (
    <footer>
      <h4>KossAirways</h4>
      <p>
        Авио компанија која Вас води где год пожелите безбедно, удобно и брзо.
      </p>
      <button>Пишите нам</button>
      <div className={styles["footer-social"]}>
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
      <div className={styles["footer-bottom"]}>
        <img className={styles["footer-behind"]} src={footerBehind} alt="" />
        <img className={styles["footer-mid"]} src={footerMid} alt="" />
        <img className={styles["footer-front"]} src={footerFront} alt="" />
      </div>
    </footer>
  );
};

export default Footer;
