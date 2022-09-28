import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import OurStory from "../../components/OurStory/OurStory";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles["about-page"]}>
      <Header />
      <OurStory />
      <Footer color="dark" />
    </div>
  );
};

export default About;
