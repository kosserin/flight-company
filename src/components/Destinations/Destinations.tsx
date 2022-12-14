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
import { Destination } from "../../models/destination.model";
import { Link, useNavigate } from "react-router-dom";
import { addDays } from "date-fns/esm";
import { format } from "date-fns";

const DUMMY_DESTINATIONS: Destination[] = [
  {
    title: "Беч",
    imagePath: "vienna.jpg",
  },
  {
    title: "Берлин",
    imagePath: "berlin.jpg",
  },
  {
    title: "Москва",
    imagePath: "russia.jpg",
  },
  {
    title: "Осло",
    imagePath: "oslo.jpg",
  },
  {
    title: "Тиват",
    imagePath: "tivat.jpg",
  },
  {
    title: "Будимпешта",
    imagePath: "bucharest.jpg",
  },
];

const Destinations = () => {
  const navigate = useNavigate();
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const destinationClickHandler = (toDestination: string) => {
    navigate(`/reservation/flights?from=Београд&to=${toDestination}&dateOfDeparture=${tomorrow}`);
  };

  return (
    <section className={styles["destinations-content"]}>
      <h3>Издвајамо следеће дестинације</h3>
      <div className={styles["swiper-holder"]}>
        <Swiper
          navigation={{
            prevEl: "#destination-prev",
            nextEl: "#destination-next",
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
                onClick={() => destinationClickHandler(destination.title)}
              >
                <img src={require(`../../assets/destinations/${destination.imagePath}`)} alt="" />
                <div className={styles["destination-overlay"]}></div>
                <h3>{destination.title}</h3>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button
          className={`${styles["destination-prev"]} ${styles["destination-button"]}`}
          id="destination-prev"
          title="Prev Destination Button"
        >
          <img src={prevIcon} alt="" />
        </button>
        <button
          className={`${styles["destination-next"]} ${styles["destination-button"]}`}
          id="destination-next"
          title="Next Destination Button"
        >
          <img src={nextIcon} alt="" />
        </button>
      </div>
      <Link to="/discover" className={styles["all-destinations__btn"]}>
        Погледајте све дестинације
      </Link>
    </section>
  );
};

export default Destinations;
