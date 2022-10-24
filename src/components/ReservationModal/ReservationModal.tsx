import React from "react";
import ReservationForm from "../ReservationForm/ReservationForm";
import styles from "./ReservationModal.module.css";

const OuterModal = (props: any) => {
  const hideModal = () => {
    props.hideReservationModal();
    console.log("xd");
  };
  return <div onClick={hideModal} className={styles["outer-modal"]}></div>;
};

const ReservationModal = (props: any) => {
  return (
    <>
      <OuterModal hideReservationModal={props.hideReservationModal} />
      <ReservationForm />
    </>
  );
};

export default ReservationModal;
