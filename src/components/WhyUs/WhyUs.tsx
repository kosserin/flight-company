import React from "react";
import styles from "./WhyUs.module.css";
import trophyIcon from "../../assets/trophy.png";
import companyIcon from "../../assets/profile.png";
import hygieneIcon from "../../assets/hygiene.png";

const WhyUs = () => {
  return (
    <section className={styles["why-us-section"]}>
      <h2>Путници су наш приоритет</h2>
      <div className={styles["section-content"]}>
        <div className={styles["item-holder"]}>
          <img src={trophyIcon} alt="" />
          <p>
            Наша компанија је добитник престижних светских награда за пружену
            услугу у авио индустрији.
          </p>
        </div>
        <div className={styles["item-holder"]}>
          <img src={companyIcon} alt="" />
          <p>
            Наша компанија је добитник престижних светских награда за пружену
            услугу у авио индустрији.
          </p>
        </div>
        <div className={styles["item-holder"]}>
          <img src={hygieneIcon} alt="" />
          <p>
            Наша компанија је добитник престижних светских награда за пружену
            услугу у авио индустрији.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
