import React, { useEffect, useState } from "react";
import styles from "./CheckFlightStatusModal.module.css";
import sad from "../../assets/sad.png";
import inFlightFlight from "../../assets/in-air-flight.png";
import cancelledFlight from "../../assets/cancelled-flight.png";
import delayedFlight from "../../assets/delayed-flight.png";
import activeFlight from "../../assets/active-flight.png";
import landedFlight from "../../assets/landed-flight.png";
import { Flight, FlightStatus } from "../../models/flight.model";

export const InnerModal = (props: any) => {
  const [flightStatusResponse, setFlightStatusResponse] =
    useState<FlightStatus | null>(null);
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
      const response = await fetch(
        "http://localhost:8086/api/flights/6319b44f167a9b1caef8c5b3"
      );
      const data: Flight = await response.json();
      console.log(data);
      // here check if flight is delayed, cancelled or smh else
      if (data.delayed) {
        setFlightStatusResponse(FlightStatus.Delayed);
      }
      if (data.cancelled) {
        setFlightStatusResponse(FlightStatus.Cancelled);
      }
      let dateOfArrival = new Date(data.dateOfDeparture);
      let tmp = dateOfArrival.getMinutes() + 90;
      dateOfArrival.setMinutes(tmp);
      if (!data.delayed && !data.cancelled) {
        let dateOfArrival = new Date(data.dateOfDeparture);
        let tmp = dateOfArrival.getMinutes() + 90;
        dateOfArrival.setMinutes(tmp);
        console.log(dateOfArrival > new Date());

        if (
          new Date(data.dateOfDeparture) > new Date() &&
          dateOfArrival < new Date()
        ) {
          setFlightStatusResponse(FlightStatus.InFlight);
        }
        if (new Date(data.dateOfDeparture) < new Date()) {
          setFlightStatusResponse(FlightStatus.Active);
        }
        if (dateOfArrival > new Date()) {
          setFlightStatusResponse(FlightStatus.Landed);
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
          <img src={sad} />
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
      case FlightStatus.Cancelled:
        iconToDisplay = cancelledFlight;
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
        iconToDisplay = sad;
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
        reservationId={props.reservationId}
      />
    </>
  );
};

export default CheckFlightStatusModal;
