import { addDays, format } from "date-fns";
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
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const destinationClickHandler = (toDestination: string) => {
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
