import { useEffect, useState } from "react";
import styles from "./CheckReservationModal.module.css";
import failed from "../../assets/status/failed.png";
import success from "../../assets/status/success.png";
import copyIcon from "../../assets/copy.png";
import { format } from "date-fns";
import sr from "date-fns/locale/sr";
import { Flight } from "../../models/flight.model";
import axios from "axios";

export const InnerModal = (props: any) => {
  const [reservation, setReservation] = useState<Flight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let innerModalContent = <div></div>;

  useEffect(() => {
    getReservationInfo(props.reservationId);
  }, []);

  async function getReservationInfo(resId: string) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://flights.herokuapp.com/api/flights/reservation/${resId}`);
      const data = response.data;
      setReservation(data);
      setIsLoading(false);
    } catch (err: any) {
      setError("Не постоји резервација са унетом шифром у нашој бази података.");
      setIsLoading(false);
    }
  }

  const closeModal = () => {
    props.hideModal();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (error) {
    innerModalContent = (
      <div className={styles["non-existing-content"]}>
        <div>
          <img src={failed} alt="" />
          <p>{error}</p>
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

  if (reservation) {
    const onlyHoursAndMinutesOfStart = format(new Date(reservation.dateOfDeparture), "HH:mm");

    innerModalContent = (
      <div className={styles["res-modal"]}>
        <div>
          <img src={success} alt="" />
        </div>
        <h4>
          Шифра резервације
          <span>
            {props.reservationId} <img onClick={() => copyToClipboard(props.reservationId)} src={copyIcon} alt="" />
          </span>
        </h4>
        <p>
          Шифра лета
          <span>
            {reservation.id} <img onClick={() => copyToClipboard(reservation.id)} src={copyIcon} alt="" />
          </span>
        </p>
        <p>
          Од - До
          <span>
            {reservation.fromCity} - {reservation.toCity}
          </span>
        </p>
        <p>
          Датум поласка
          <span>
            {format(new Date(reservation.dateOfDeparture), "dd. MMMM", {
              locale: sr,
            })}
          </span>
        </p>
        <p>
          Време поласка
          <span>{onlyHoursAndMinutesOfStart}</span>
        </p>
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

const CheckReservationModal = (props: any) => {
  return (
    <>
      <OuterModal hideModal={props.hideCheckReservationModal} />
      <InnerModal
        hideModal={props.hideCheckReservationModal}
        showModal={props.showCheckReservationModal}
        reservationId={props.reservationId}
      />
    </>
  );
};

export default CheckReservationModal;
