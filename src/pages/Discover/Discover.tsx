import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Discover.module.css";
import backgroundImage from "../../assets/background.jpg";
import DiscoverDestinations from "../../components/DiscoverDestinations/DiscoverDestinations";

const Discover = () => {
  return (
    <>
      <Header color="dark" />
      {/* <div className={styles["image-holder"]}></div> */}
      <DiscoverDestinations />
      <Footer />
    </>
  );
};

export default Discover;
