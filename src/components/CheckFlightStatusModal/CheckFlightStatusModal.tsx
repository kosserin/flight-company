import { useEffect, useState } from "react";
import styles from "./CheckFlightStatusModal.module.css";
import failed from "../../assets/status/failed.png";
import inFlightFlight from "../../assets/flight-status/in-air-flight.png";
import canceledFlight from "../../assets/flight-status/cancelled-flight.png";
import delayedFlight from "../../assets/flight-status/delayed-flight.png";
import activeFlight from "../../assets/flight-status/active-flight.png";
import landedFlight from "../../assets/flight-status/landed-flight.png";
import { Flight, FlightStatus } from "../../models/flight.model";
import axios from "axios";

export const InnerModal = (props: any) => {
  const [flightStatusResponse, setFlightStatusResponse] = useState<FlightStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let innerModalContent = <div></div>;

  useEffect(() => {
    getFlightStatus(props.flightId);
  }, []);

  async function getFlightStatus(flightId: string) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://flights.herokuapp.com/api/flights/${flightId}`);
      const flightRes: Flight = response.data;
      // here check if flight is delayed, cancelled or smh else
      if (flightRes.delayed) {
        setFlightStatusResponse(FlightStatus.Delayed);
      }
      if (flightRes.canceled) {
        setFlightStatusResponse(FlightStatus.Canceled);
      }
      let dateOfArrival = new Date(flightRes.dateOfDeparture);
      let tmp = dateOfArrival.getMinutes() + 90;
      dateOfArrival.setMinutes(tmp);
      if (new Date(flightRes.dateOfDeparture) > new Date() && dateOfArrival < new Date()) {
        setFlightStatusResponse(FlightStatus.InFlight);
      }
      if (new Date(flightRes.dateOfDeparture) < new Date()) {
        setFlightStatusResponse(FlightStatus.Landed);
      }
      if (!flightRes.delayed && !flightRes.canceled) {
        if (dateOfArrival > new Date()) {
          setFlightStatusResponse(FlightStatus.Active);
        }
      }
      setIsLoading(false);
    } catch (err: any) {
      setError("Лет који сте унели не постоји у нашој бази података.");
      setIsLoading(false);
    }
  }

  const closeModal = () => {
    props.hideModal();
  };

  if (error) {
    innerModalContent = (
      <div className={styles["non-existing-content"]}>
        <div>
          <img src={failed} />
          <h5>{error}</h5>
        </div>
        <button onClick={closeModal} className="submit-button">
          У реду
        </button>
      </div>
    );
  }

  if (isLoading) {
    innerModalContent = (
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (flightStatusResponse) {
    let iconToDisplay;
    let textToDisplay;

    switch (flightStatusResponse) {
      case FlightStatus.Active:
        iconToDisplay = activeFlight;
        textToDisplay = "Лет полеће у заказано време.";
        break;
      case FlightStatus.Canceled:
        iconToDisplay = canceledFlight;
        textToDisplay = "Лет је отказан.";
        break;
      case FlightStatus.Delayed:
        iconToDisplay = delayedFlight;
        textToDisplay = "Лет је одложен.";
        break;
      case FlightStatus.InFlight:
        iconToDisplay = inFlightFlight;
        textToDisplay = "Лет је у току.";
        break;
      case FlightStatus.Landed:
        iconToDisplay = landedFlight;
        textToDisplay = "Авион је слетео.";
        break;
      default:
        iconToDisplay = failed;
        textToDisplay = "Немамо податке о датом лету.";
        break;
    }
    innerModalContent = (
      <div className={styles["inner-modal__content"]}>
        <div>
          <img src={iconToDisplay} />
          <h5>{textToDisplay}</h5>
        </div>
        <button onClick={closeModal} className="submit-button">
          У реду
        </button>
      </div>
    );
  }
  return <div className={styles["inner-modal"]}>{innerModalContent}</div>;
};

export const OuterModal = (props: any) => {
  const closeModal = () => {
    props.hideModal();
  };
  return <div onClick={closeModal} className={styles["outer-modal"]}></div>;
};

const CheckFlightStatusModal = (props: any) => {
  return (
    <>
      <OuterModal hideModal={props.hideCheckFlightStatusModal} />
      <InnerModal
        hideModal={props.hideCheckFlightStatusModal}
        showModal={props.showCheckFlightStatusModal}
        flightId={props.flightId}
      />
    </>
  );
};

export default CheckFlightStatusModal;
