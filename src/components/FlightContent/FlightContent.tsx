import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { FlightsContext } from "../../store/flights-context";
import FlightList from "../FlightList/FlightList";
import styles from "./FlightContent.module.css";
import sortIcon from "../../assets/sort-white.png";
import arrowRight from "../../assets/right-arrow-white.png";
import { sr } from "date-fns/locale";
import { addDays, format } from "date-fns";

// const DUMMY_FLIGHTS: Flight[] = [
//   {
//     id: "6319b44f167a9b1caef8c5b3",
//     fromCity: "Ниш",
//     toCity: "Анкара",
//     flightDuration: 150,
//     dateOfDeparture: "2022-10-22T20:45:00",
//     numberOfSeats: 50,
//     reservations: null,
//     price: 350,
//     distanceBetween: 2250,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367k",
//     fromCity: "Ниш",
//     toCity: "Солун",
//     flightDuration: 170,
//     dateOfDeparture: "2022-10-22T09:45:00",
//     numberOfSeats: 40,
//     reservations: null,
//     price: 430,
//     distanceBetween: 750,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367j",
//     fromCity: "Ниш",
//     toCity: "Будимпешта",
//     flightDuration: 290,
//     dateOfDeparture: "2022-10-22T22:00:00",
//     numberOfSeats: 50,
//     reservations: null,
//     price: 250,
//     distanceBetween: 410,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367i",
//     fromCity: "Београд",
//     toCity: "Солун",
//     flightDuration: 55,
//     dateOfDeparture: "2022-10-22T22:10:00",
//     numberOfSeats: 50,
//     reservations: null,
//     price: 580,
//     distanceBetween: 550,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367h",
//     fromCity: "Београд",
//     toCity: "Тиват",
//     flightDuration: 80,
//     dateOfDeparture: "2022-10-22T20:00:00",
//     numberOfSeats: 50,
//     reservations: null,
//     price: 1150,
//     distanceBetween: 950,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367g",
//     fromCity: "Београд",
//     toCity: "Беч",
//     flightDuration: 300,
//     dateOfDeparture: "2022-10-22T16:45:00",
//     numberOfSeats: 50,
//     reservations: null,
//     price: 50,
//     distanceBetween: 750,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367f",
//     fromCity: "Београд",
//     toCity: "Берлин",
//     flightDuration: 250,
//     dateOfDeparture: "2022-10-22T12:45:00",
//     numberOfSeats: 50,
//     reservations: null,
//     price: 50,
//     distanceBetween: 150,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367e",
//     fromCity: "Београд",
//     toCity: "Милано",
//     flightDuration: 400,
//     dateOfDeparture: "2022-10-22T20:05:00",
//     numberOfSeats: 50,
//     reservations: null,
//     price: 50,
//     distanceBetween: 550,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367d",
//     fromCity: "Београд",
//     toCity: "Рим",
//     flightDuration: 140,
//     dateOfDeparture: "2022-10-22T11:45:00",
//     numberOfSeats: 50,
//     reservations: null,
//     price: 50,
//     distanceBetween: 2150,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367c",
//     fromCity: "Београд",
//     toCity: "Њујорк",
//     flightDuration: 600,
//     dateOfDeparture: "2022-10-22T20:15:00",
//     numberOfSeats: 50,
//     reservations: null,
//     price: 50,
//     distanceBetween: 1250,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
//   {
//     id: "6319d30889f0f0784af9367a",
//     fromCity: "Београд",
//     toCity: "Калифорнија",
//     flightDuration: 300,
//     dateOfDeparture: "2022-10-22T22:45:00",
//     numberOfSeats: 150,
//     reservations: null,
//     price: 750,
//     distanceBetween: 2250,
//     model: "JAT32-679",
//     company: "Авионик",
//   },
// ];

const FlightContent = () => {
  const ctx = useContext(FlightsContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const displayFlights: boolean =
    searchParams.has("from") && searchParams.has("to") && searchParams.has("dateOfDeparture");
  const [selectedValue, setSelectedValue] = useState<string>("none");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("dateOfDeparture");
  const day = format(new Date(searchParams.get("dateOfDeparture") || new Date()), "EEEE", {
    locale: sr,
  });
  const month = format(new Date(searchParams.get("dateOfDeparture") || new Date()), "MMMM", {
    locale: sr,
  });

  let headingContent: any = `${from} - ${to} - ${day.charAt(0).toUpperCase() + day.slice(1)}, ${format(
    new Date(searchParams.get("dateOfDeparture") || new Date()),
    "d"
  )}. ${month.charAt(0).toUpperCase() + month.slice(1)}`;

  if (error && !isLoading) {
    headingContent = error;
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
    const tomorrow = format(addDays(new Date(date || new Date()), 1), "yyyy-MM-dd");
    navigate(`/reservation/flights?from=${from}&to=${to}&dateOfDeparture=${tomorrow}`);
    searchForFlightHandler(tomorrow);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (displayFlights) {
      searchForFlightHandler();
      sortWithSwapHandler(selectedValue);
    }
  }, []);

  async function searchForFlightHandler(specificDate?: string) {
    let errorMessage;
    if (specificDate) {
      const thatNewDate = new Date(specificDate || new Date());
      const specificDay = format(new Date(thatNewDate || new Date()), "EEEE", {
        locale: sr,
      });
      const formattedSpecificDay = specificDay.charAt(0).toUpperCase() + specificDay.slice(1);
      const specificMonth = format(new Date(thatNewDate || new Date()), "MMMM", {
        locale: sr,
      });
      const formattedSpecificMonth = specificMonth.charAt(0).toUpperCase() + specificMonth.slice(1);

      errorMessage = `${from} - ${to} - ${formattedSpecificDay}, ${format(
        new Date(thatNewDate) || new Date(),
        "d"
      )}. ${formattedSpecificMonth}`;
    } else {
      errorMessage = `${from} - ${to} - ${day.charAt(0).toUpperCase() + day.slice(1)}, ${format(
        new Date(searchParams.get("dateOfDeparture") || new Date()),
        "d"
      )}. ${month.charAt(0).toUpperCase() + month.slice(1)}`;
    }
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:8089/api/flights?from=${from}&to=${to}&dateOfDeparture=${specificDate ? specificDate : date}`
      );
      const flightsRes = await response.json();
      ctx.appendFlights(flightsRes);
      if (flightsRes.length < 1) {
        setError(`Нема летова који одговарају унетим критеријумима ${errorMessage}`);
      }
      setIsLoading(false);
    } catch (err: any) {
      setError(`Нема летова који одговарају унетим критеријумима ${errorMessage}`);
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

  if ((error && !isLoading) || ctx.flights.length < 1) {
    headingContent = error;
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

  return (
    <div className={styles["flight-content"]}>
      {displayFlights && (
        <div>
          <h2>{headingContent}</h2>
          {!error && !isLoading && ctx.flights.length !== 0 && (
            <div className={styles["sorting-holder"]}>
              <label htmlFor="sortSelect">
                <img src={sortIcon} alt="" />
              </label>
              <select name="sortSelect" id="sortSelect" value={selectedValue} onChange={sortingFlightsHandler}>
                <option value="none">Одаберите упит</option>
                <option value="earliestFlight">Најскорији лет</option>
                <option value="lowestPrice">Растуће цене</option>
                <option value="highestPrice">Опадајуће цене</option>
                <option value="fastestTravel">Најбрже путовање</option>
                <option value="shortestDistance">Најкраће растојање</option>
              </select>
            </div>
          )}
          {!error && !isLoading && ctx.flights.length !== 0 && <FlightList />}
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
