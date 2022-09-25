import React from "react";
import nextIcon from "../../assets/next.svg";
import prevIcon from "../../assets/prev.svg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Destinations.module.css";
import "../../index.css";

import { Navigation } from "swiper";

interface Destination {
  imagePath: string;
  title?: any;
}

const DUMMY_DESTINATIONS: Destination[] = [
  {
    title: "Беч",
    imagePath: "/assets/destinations-images/vienna.jpg",
  },
  {
    title: "Берлин",
    imagePath: "/assets/destinations-images/berlin.jpg",
  },
  {
    title: "Москва",
    imagePath: "/assets/destinations-images/russia.jpg",
  },
  {
    title: "Санкт Петерсбург",
    imagePath: "/assets/destinations-images/sankt-petersburg.jpg",
  },
  {
    title: "Тиват",
    imagePath: "/assets/destinations-images/tivat.jpg",
  },
  {
    title: "Будимпешта",
    imagePath: "/assets/destinations-images/bucharest.jpg",
  },
];

const Destinations = () => {
  return (
    <section className={styles["destinations-content"]}>
      <h2>Издвајамо следеће дестинације</h2>
      <div className={styles["swiper-holder"]}>
        <Swiper
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          modules={[Navigation]}
          className={styles["destinations-swiper"]}
          spaceBetween={12}
          slidesPerView={1.5}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {DUMMY_DESTINATIONS.map((destination, index) => {
            return (
              <SwiperSlide
                className={styles["destination-swiper-slide"]}
                key={"" + destination + index}
              >
                <img src={destination.imagePath} alt="" />
                <div className={styles["destination-overlay"]}></div>
                <h3>{destination.title}</h3>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button
          className={`${styles["destination-prev"]} ${styles["destination-button"]} prev`}
        >
          <img src={prevIcon} alt="" />
        </button>
        <button
          className={`${styles["destination-next"]} ${styles["destination-button"]} next`}
        >
          <img src={nextIcon} alt="" />
        </button>
      </div>
      <button className={styles["all-destinations__btn"]}>
        Погледајте све дестинације
      </button>
    </section>
  );
};

export default Destinations;
