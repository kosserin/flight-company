import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isToggled, setIsToggled] = useState(false);

  const completedClass = isToggled ? styles.toggled : "";

  return (
    <header className={styles.header}>
      <nav>
        <a href="#">KossAirways</a>
        <ul className={completedClass}>
          <li>
            <a href="#">Резервишите</a>
          </li>
          <li>
            <a href="#">Откријте</a>
          </li>
          <li>
            <a href="#">О нама</a>
          </li>
          <li>
            <a href="#">Контакт</a>
          </li>
        </ul>
        <div
          className={`${styles.burger} ${completedClass}`}
          onClick={() => setIsToggled((prev) => !prev)}
          role="button"
        >
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </nav>
      <div className={`${styles.backdrop} ${completedClass}`}></div>
    </header>
  );
};

export default Header;
