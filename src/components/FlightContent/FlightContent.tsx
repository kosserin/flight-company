import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { FlightsContext } from "../../store/flights-context";
import FlightList from "../FlightList/FlightList";
import styles from "./FlightContent.module.css";
import sortIcon from "../../assets/sort-white.png";
import arrowRight from "../../assets/right-arrow-white.png";
import { Flight } from "../../models/flight.model";

const DUMMY_FLIGHTS: Flight[] = [
  {
    id: "6319d30889f0f0784af9367l",
    fromCity: "Ниш",
    toCity: "Анкара",
    flightDuration: 150,
    dateOfDeparture: "2022-10-22T20:45:00",
    numberOfSeats: 50,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 350,
    distanceBetween: 2250,
  },
  {
    id: "6319d30889f0f0784af9367k",
    fromCity: "Ниш",
    toCity: "Солун",
    flightDuration: 170,
    dateOfDeparture: "2022-10-22T09:45:00",
    numberOfSeats: 40,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 430,
    distanceBetween: 750,
  },
  {
    id: "6319d30889f0f0784af9367j",
    fromCity: "Ниш",
    toCity: "Будимпешта",
    flightDuration: 290,
    dateOfDeparture: "2022-10-22T22:00:00",
    numberOfSeats: 50,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 250,
    distanceBetween: 410,
  },
  {
    id: "6319d30889f0f0784af9367i",
    fromCity: "Београд",
    toCity: "Солун",
    flightDuration: 55,
    dateOfDeparture: "2022-10-22T22:10:00",
    numberOfSeats: 50,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 580,
    distanceBetween: 550,
  },
  {
    id: "6319d30889f0f0784af9367h",
    fromCity: "Београд",
    toCity: "Тиват",
    flightDuration: 80,
    dateOfDeparture: "2022-10-22T20:00:00",
    numberOfSeats: 50,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 1150,
    distanceBetween: 950,
  },
  {
    id: "6319d30889f0f0784af9367g",
    fromCity: "Београд",
    toCity: "Беч",
    flightDuration: 300,
    dateOfDeparture: "2022-10-22T16:45:00",
    numberOfSeats: 50,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 50,
    distanceBetween: 750,
  },
  {
    id: "6319d30889f0f0784af9367f",
    fromCity: "Београд",
    toCity: "Берлин",
    flightDuration: 250,
    dateOfDeparture: "2022-10-22T12:45:00",
    numberOfSeats: 50,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 50,
    distanceBetween: 150,
  },
  {
    id: "6319d30889f0f0784af9367e",
    fromCity: "Београд",
    toCity: "Милано",
    flightDuration: 400,
    dateOfDeparture: "2022-10-22T20:05:00",
    numberOfSeats: 50,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 50,
    distanceBetween: 550,
  },
  {
    id: "6319d30889f0f0784af9367d",
    fromCity: "Београд",
    toCity: "Рим",
    flightDuration: 140,
    dateOfDeparture: "2022-10-22T11:45:00",
    numberOfSeats: 50,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 50,
    distanceBetween: 2150,
  },
  {
    id: "6319d30889f0f0784af9367c",
    fromCity: "Београд",
    toCity: "Њујорк",
    flightDuration: 600,
    dateOfDeparture: "2022-10-22T20:15:00",
    numberOfSeats: 50,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 50,
    distanceBetween: 1250,
  },
  {
    id: "6319d30889f0f0784af9367a",
    fromCity: "Београд",
    toCity: "Калифорнија",
    flightDuration: 300,
    dateOfDeparture: "2022-10-22T22:45:00",
    numberOfSeats: 150,
    seatsReserved: null,
    areSeatsAvailable: true,
    reservations: null,
    price: 750,
    distanceBetween: 2250,
  },
];

const FlightContent = () => {
  const ctx = useContext(FlightsContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const displayFlights: boolean =
    searchParams.has("from") ||
    searchParams.has("to") ||
    searchParams.has("date");
  const [selectedValue, setSelectedValue] = useState<string>("none");
  const [isLoading, setIsLoading] = useState(false);
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

  let headingContent: any = `${searchParams.get("from")} - ${searchParams.get(
    "to"
  )} - ${dayOnSerbian}, ${moment(searchParams.get("date")).format(
    "D"
  )}. ${monthOnSerbian}`;

  if (ctx.flights.length === 0 && !isLoading) {
    headingContent = `Нема летова који одговарају унетим критеријумима ${searchParams.get(
      "from"
    )} - ${searchParams.get("to")} - ${dayOnSerbian}, ${moment(
      searchParams.get("date")
    ).format("D")}. ${monthOnSerbian}`;
  }

  if (isLoading) {
    headingContent = (
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
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
    if (displayFlights) {
      searchForFlightHandler();
      sortWithSwapHandler(selectedValue);
    }
  }, []);

  async function searchForFlightHandler() {
    try {
      setIsLoading(true);
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      const date = searchParams.get("date");
      const response = await fetch(
        `http://localhost:8086/api/flights?from=${from}&to=${to}&date=${date}`
      );
      const data = await response.json();
      ctx.appendFlights(DUMMY_FLIGHTS);
      setIsLoading(false);
    } catch (err: any) {
      ctx.appendFlights([]);
      setIsLoading(false);
    }
  }

  const sortWithSwapHandler = (value: string) => {
    switch (value) {
      case "lowestPrice":
        ctx.sortLowestFirst(ctx.flights);
        break;
      case "highestPrice":
        ctx.sortHighestFirst(ctx.flights);
        break;
      case "fastestTravel":
        ctx.sortFastestTravel(ctx.flights);
        break;
      case "shortestDistance":
        ctx.sortShortestDistance(ctx.flights);
        break;
      case "earliestFlight":
        ctx.sortEarliestFlight(ctx.flights);
        break;
      default:
        break;
    }
  };

  const sortingFlightsHandler = (e: any) => {
    setSelectedValue(e.target.value);
    sortWithSwapHandler(e.target.value);
  };

  return (
    <div className={styles["flight-content"]}>
      {displayFlights && (
        <div>
          <h2>{headingContent}</h2>
          {ctx.flights.length !== 0 && !isLoading && (
            <div className={styles["sorting-holder"]}>
              <label htmlFor="sortSelect">
                <img src={sortIcon} alt="" />
              </label>
              <select
                name="sortSelect"
                id="sortSelect"
                value={selectedValue}
                onChange={sortingFlightsHandler}
              >
                <option value="none">Одаберите упит</option>
                <option value="earliestFlight">Најскорији лет</option>
                <option value="lowestPrice">Растуће цене</option>
                <option value="highestPrice">Опадајуће цене</option>
                <option value="fastestTravel">Најбрже путовање</option>
                <option value="shortestDistance">Најкраће растојање</option>
              </select>
            </div>
          )}
          {ctx.flights.length !== 0 && !isLoading && <FlightList />}
          <div className={styles["flights-actions"]}>
            {!isLoading && (
              <button onClick={checkNextDayFlightsHandler}>
                <span>Наредни дан на истој релацији</span>
                <img src={arrowRight} />
              </button>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default FlightContent;
