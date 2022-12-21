import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { FlightsContext } from "../../store/flights-context";
import FlightList from "../FlightList/FlightList";
import styles from "./FlightContent.module.css";
import sortIcon from "../../assets/sort-white.png";
import arrowRight from "../../assets/right-arrow-white.png";
import { sr } from "date-fns/locale";
import { addDays, format } from "date-fns";
import axios from "axios";

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
      const response = await axios.get(
        `https://flights.herokuapp.com/api/flights?from=${from}&to=${to}&dateOfDeparture=${
          specificDate ? specificDate : date
        }`
      );
      ctx.appendFlights(response.data);
      if (response.data.length < 1) {
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
          <h4>{headingContent}</h4>
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
