import React, { useState } from "react";
import styles from "./PassengersModal.module.css";
import plusImage from "../../assets/plus.png";
import minusImage from "../../assets/minus.png";

const PassengersModal = (props: any) => {
  return (
    <>
      <BackdropModal closePassengersModal={props.closePassengersModal} />
      <ModalContent
        number={props.passengersNumber}
        updatePassengersNumber={props.updatePassengersNumber}
        closePassengersModal={props.closePassengersModal}
      />
    </>
  );
};

export const BackdropModal = (props: any) => {
  return (
    <div
      className={styles.backdrop}
      onClick={() => props.closePassengersModal()}
    ></div>
  );
};

export const ModalContent = (props: any) => {
  const [localNumber, setLocalNumber] = useState<number>(props.number);

  const onSubmitHandler = () => {
    props.updatePassengersNumber(localNumber);
    props.closePassengersModal();
  };

  return (
    <div className={styles["modal-content"]}>
      <p>Унесите колико седишта желите да резервишете на Ваше име.</p>
      <div className={styles.content}>
        <h1>{localNumber}</h1>
        <div className={styles.actions}>
          <div
            className={styles.holder}
            onClick={() => setLocalNumber((prev) => prev + 1)}
          >
            <img src={plusImage} alt="" />
          </div>
          <div
            className={styles.holder}
            onClick={() => setLocalNumber((prev) => prev - 1)}
          >
            <img src={minusImage} alt="" />
          </div>
        </div>
      </div>
      <button onClick={onSubmitHandler}>Заврши</button>
    </div>
  );
};

export default PassengersModal;
