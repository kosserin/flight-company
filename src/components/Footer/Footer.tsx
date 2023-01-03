import React from "react";
import styles from "./Footer.module.css";
import facebookIcon from "../../assets/social/facebook.svg";
import telegramIcon from "../../assets/social/telegram.svg";
import instagramIcon from "../../assets/social/instagram.svg";
import footerBehind from "../../assets/footer/footer-behind.png";
import footerMid from "../../assets/footer/footer-mid.png";
import footerFront from "../../assets/footer/footer-front.png";
import toTopArrowIcon from "../../assets/footer/top.svg";
import { Link } from "react-router-dom";

const Footer = (props: any) => {
  return (
    <footer className={`${props.color === "dark" && styles["footer-dark"]}`}>
      <h6>Авионик</h6>
      <p>Авио компанија која Вас води где год пожелите безбедно, удобно и брзо.</p>
      <Link to="/contact">Пишите нам</Link>
      <div className={styles["footer-social"]}>
        <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook link">
          <img src={facebookIcon} alt="" />
        </a>
        <a href="https://telegram.org/" target="_blank" aria-label="Telegram link">
          <img src={telegramIcon} alt="" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram link">
          <img src={instagramIcon} alt="" />
        </a>
      </div>
      <div className={styles["footer-bottom"]}>
        <img className={styles["footer-behind"]} src={footerBehind} alt="" />
        <img className={styles["footer-mid"]} src={footerMid} alt="" />
        <img className={styles["footer-front"]} src={footerFront} alt="" />
        <div className={styles.copyright}>
          <p>&copy; 2022 Сва права задржана.</p>
          <a href="#">
            <img src={toTopArrowIcon} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
