import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = (props: any) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const completedClass = isToggled ? styles.toggled : "";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    });

    window.scrollTo(0, 0);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${
        props.color === "dark" && styles["header-dark"]
      } ${isScrolled && !props.color && styles["header-dark"]}`}
    >
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
            <Link to="/contact">Контакт</Link>
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
