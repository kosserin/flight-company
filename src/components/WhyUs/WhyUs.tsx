import React from "react";
import styles from "./WhyUs.module.css";
import trophyIcon from "../../assets/medal.png";
import companyIcon from "../../assets/businessman.png";
import hygieneIcon from "../../assets/sanitary.png";

const WhyUs = () => {
  return (
    <section className={styles["why-us-section"]}>
      <h3>Путници су наш приоритет</h3>
      <div className={styles["section-content"]}>
        <div className={styles["item-holder"]}>
          <img src={trophyIcon} alt="" />
          <p>Наша компанија је добитник престижних светских награда за пружену услугу у авио индустрији.</p>
        </div>
        <div className={styles["item-holder"]}>
          <img src={companyIcon} alt="" />
          <p>Одликује нас професионалност, поузданост и амбиција да пружимо најбољу услугу.</p>
        </div>
        <div className={styles["item-holder"]}>
          <img src={hygieneIcon} alt="" />
          <p>Стало нам је до наших путника, њиховог здравља и хигијене.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
