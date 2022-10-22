import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Destination } from "../../models/destination.model";
import styles from "./DiscoverDestinations.module.css";

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
    title: "Тиват",
    imagePath: "/assets/destinations-images/tivat.jpg",
  },
  {
    title: "Будимпешта",
    imagePath: "/assets/destinations-images/bucharest.jpg",
  },
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
    title: "Тиват",
    imagePath: "/assets/destinations-images/tivat.jpg",
  },
  {
    title: "Будимпешта",
    imagePath: "/assets/destinations-images/bucharest.jpg",
  },
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
    title: "Тиват",
    imagePath: "/assets/destinations-images/tivat.jpg",
  },
  {
    title: "Будимпешта",
    imagePath: "/assets/destinations-images/bucharest.jpg",
  },
];

const DiscoverDestinations = () => {
  const navigate = useNavigate();
  const tomorrow = moment(new Date(), "YYYY-MM-DD")
    .add(1, "days")
    .format("YYYY-MM-DD");
  console.log(tomorrow);

  const destinationClickHandler = (toDestination: string) => {
    console.log(toDestination);
    navigate(
      `/reservation/flights?from=Београд&to=${toDestination}&date=${tomorrow}`
    );
  };

  return (
    <section className={styles["discover-content"]}>
      <div className={styles["discover-header"]}>
        <h2>Креирајте сопствену европску авантуру</h2>
        <p>
          Доживите изванредно искуство путовања док вас водимо у главне светске
          престонице. Лутајте кроз историју са очаравајућом сликовитом лепотом,
          уметничким благом и живописном културом.
        </p>
      </div>
      <div className={styles["circle"]}></div>
      <div className={styles["all-destinations"]} id="allDestinations">
        <h2>Све дестинације</h2>
        <ul>
          {DUMMY_DESTINATIONS.map((destination, index) => (
            <li
              key={index + destination.title}
              onClick={() => destinationClickHandler(destination.title)}
            >
              <img src={destination.imagePath} alt="" />
              <div className={styles["image-overlay"]}></div>
              <h3>{destination.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DiscoverDestinations;
