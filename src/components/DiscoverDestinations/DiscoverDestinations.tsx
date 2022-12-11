import { addDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Destination } from "../../models/destination.model";
import styles from "./DiscoverDestinations.module.css";

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
    title: "Тиват",
    imagePath: "tivat.jpg",
  },
  {
    title: "Будимпешта",
    imagePath: "bucharest.jpg",
  },
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
    title: "Тиват",
    imagePath: "tivat.jpg",
  },
  {
    title: "Будимпешта",
    imagePath: "bucharest.jpg",
  },
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
    title: "Тиват",
    imagePath: "tivat.jpg",
  },
  {
    title: "Будимпешта",
    imagePath: "bucharest.jpg",
  },
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
];

const DiscoverDestinations = () => {
  const navigate = useNavigate();
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const destinationClickHandler = (toDestination: string) => {
    navigate(`/reservation/flights?from=Београд&to=${toDestination}&dateOfDeparture=${tomorrow}`);
  };

  return (
    <section className={styles["discover-content"]}>
      <div className={styles["discover-header"]}>
        <h3>Креирајте сопствену европску авантуру</h3>
        <p>
          Доживите изванредно искуство путовања док вас водимо у главне светске престонице. Лутајте кроз историју са
          очаравајућом сликовитом лепотом, уметничким благом и живописном културом.
        </p>
      </div>
      <div className={styles["circle"]}></div>
      <div className={styles["all-destinations"]} id="allDestinations">
        <h4>Све дестинације</h4>
        <ul>
          {DUMMY_DESTINATIONS.map((destination, index) => (
            <li key={index + destination.title} onClick={() => destinationClickHandler(destination.title)}>
              <img src={require(`../../assets/destinations/${destination.imagePath}`)} alt="" />
              <div className={styles["image-overlay"]}></div>
              <h4>{destination.title}</h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DiscoverDestinations;
