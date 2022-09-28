import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isToggled, setIsToggled] = useState(false);

  const completedClass = isToggled ? styles.toggled : "";

  return (
    <header className={styles.header}>
      <nav>
        <Link to="/">KossAirways</Link>
        <ul className={completedClass}>
          <li>
            <Link to="/">Резервишите</Link>
          </li>
          <li>
            <Link to="/">Откријте</Link>
          </li>
          <li>
            <Link to="/about">О нама</Link>
          </li>
          <li>
            <Link to="/">Контакт</Link>
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
