import moment from "moment";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { FlightsContext } from "../../store/flights-context";
import FlightList from "../FlightList/FlightList";
import styles from "./FlightContent.module.css";
import sortIcon from "../../assets/sort-white.png";

const FlightContent = () => {
  const ctx = useContext(FlightsContext);
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

  let headingContent = `${searchParams.get("from")} - ${searchParams.get(
    "to"
  )} - ${dayOnSerbian}, ${moment(
    searchParams.get("date")
  ).day()}. ${monthOnSerbian}`;

  if (ctx.flights.length === 0) {
    headingContent = "Нема летова који одговарају унетим критеријумима";
  }
  return (
    <div className={styles["flight-content"]}>
      <h2>{headingContent}</h2>
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
      <FlightList />
    </div>
  );
};

export default FlightContent;
