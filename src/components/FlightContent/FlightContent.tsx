import moment from "moment";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FlightsContext } from "../../store/flights-context";
import FlightList from "../FlightList/FlightList";
import styles from "./FlightContent.module.css";
import sortIcon from "../../assets/sort-white.png";

const FlightContent = () => {
  const ctx = useContext(FlightsContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const day = moment(searchParams.get("date")).format("dddd"); // for the word
  let dayOnSerbian: string;
  let monthOnSerbian: string;
  const month = moment(searchParams.get("date")).format("MM");
  switch (month) {
    case "1":
      monthOnSerbian = "Јануар";
      break;
    case "2":
      monthOnSerbian = "Фебруар";
      break;
    case "3":
      monthOnSerbian = "Март";
      break;
    case "4":
      monthOnSerbian = "Април";
      break;
    case "5":
      monthOnSerbian = "Мај";
      break;
    case "6":
      monthOnSerbian = "Јун";
      break;
    case "7":
      monthOnSerbian = "Јул";
      break;
    case "8":
      monthOnSerbian = "Август";
      break;
    case "9":
      monthOnSerbian = "Септембар";
      break;
    case "10":
      monthOnSerbian = "Октобар";
      break;
    case "11":
      monthOnSerbian = "Новембар";
      break;
    default:
      monthOnSerbian = "Децембар";
      break;
  }
  switch (day) {
    case "Monday":
      dayOnSerbian = "Понедељак";
      break;
    case "Tuesday":
      dayOnSerbian = "Уторак";
      break;
    case "Wednesday":
      dayOnSerbian = "Среда";
      break;
    case "Thursday":
      dayOnSerbian = "Четвртак";
      break;
    case "Friday":
      dayOnSerbian = "Петак";
      break;
    case "Saturday":
      dayOnSerbian = "Субота";
      break;
    default:
      dayOnSerbian = "Недеља";
      break;
  }

  let tomorrow = moment(searchParams.get("date"), "YYYY-MM-DD")
    .add(1, "days")
    .format("YYYY-MM-DD");
  console.log(tomorrow);

  let headingContent = `${searchParams.get("from")} - ${searchParams.get(
    "to"
  )} - ${dayOnSerbian}, ${moment(searchParams.get("date")).format(
    "D"
  )}. ${monthOnSerbian}`;

  if (ctx.flights.length === 0) {
    headingContent = `Нема летова који одговарају унетим критеријумима ${searchParams.get(
      "from"
    )} - ${searchParams.get("to")} - ${dayOnSerbian}, ${moment(
      searchParams.get("date")
    ).format("D")}. ${monthOnSerbian}`;
  }

  const checkNextDayFlightsHandler = () => {
    navigate(
      `/reservation/flights?from=${searchParams.get(
        "from"
      )}&to=${searchParams.get("to")}&date=${tomorrow}`
    );
    searchForFlightHandler();
  };

  useEffect(() => {
    console.log("useeffect called");
    searchForFlightHandler();
  }, []);

  async function searchForFlightHandler() {
    try {
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      const date = searchParams.get("date");
      const response = await fetch(
        `http://localhost:8086/api/flights?from=${from}&to=${to}&date=${date}`
      );
      const data = await response.json();
      alert(JSON.stringify(data));
      ctx.appendFlights(data);
    } catch (err) {
      ctx.appendFlights([]);
    }
  }

  return (
    <div className={styles["flight-content"]}>
      <h2>{headingContent}</h2>
      {ctx.flights.length !== 0 && (
        <div className={styles["sorting-holder"]}>
          <label htmlFor="sortSelect">
            <img src={sortIcon} alt="" />
          </label>
          <select name="sortSelect" id="sortSelect">
            <option value="lowestPrice">Растуће цене</option>
            <option value="highestPrice">Опадајуће цене</option>
            <option value="fastestTravel">Најбрже путовање</option>
            <option value="shortestDistance">Најкраће растојање</option>
          </select>
        </div>
      )}
      {ctx.flights.length !== 0 && <FlightList />}
      <button onClick={checkNextDayFlightsHandler}>
        Погледајте летове за наредни дан на истој релацији
      </button>
      {/* <Link
        to={`/reservation/flights?from=${searchParams.get(
          "from"
        )}&to=${searchParams.get("to")}&date=${tomorrow}`}
      >
        Погледајте летове за наредни дан на истој релацији
      </Link> */}
    </div>
  );
};

export default FlightContent;
