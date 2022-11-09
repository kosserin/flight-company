import React, { useState } from "react";
import {
  Reservation,
  Step1Details,
  Step2Details,
} from "../models/reservation.model";

type ReservationDetailsContextObject = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  saveStep1InfoHandler: (info: Step1Details) => void;
  saveStep2InfoHandler: (info: Step2Details) => void;
};

export const ReservationDetailsContext =
  React.createContext<ReservationDetailsContextObject>({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    saveStep1InfoHandler: (info: Step1Details) => {},
    saveStep2InfoHandler: (info: Step2Details) => {},
  });

interface Props {
  children: JSX.Element;
}

const ReservationDetailsContextProvider: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("2");
  const [email, setEmail] = useState("3@d");
  const [phoneNumber, setPhoneNumber] = useState("4");
  const [cardholderName, setCardholderName] = useState("5");
  const [cardNumber, setCardNumber] = useState("55555555555555");
  const [expirationDate, setExpirationDate] = useState("dsad");
  const [securityCode, setSecurityCode] = useState("3232");

  const saveStep1InfoHandler = (info: Step1Details) => {
    setName(info.enteredName);
    setSurname(info.enteredSurname);
    setEmail(info.enteredEmail);
    setPhoneNumber(info.enteredPhoneNumber);
  };

  const saveStep2InfoHandler = (info: Step2Details) => {
    setCardholderName(info.enteredCardholder);
    setCardNumber(info.enteredCardNumber);
    setExpirationDate(info.enteredExpirationDate);
    setSecurityCode(info.enteredSecurityCode);
  };

  const contextValue: ReservationDetailsContextObject = {
    name,
    surname,
    email,
    phoneNumber,
    cardholderName,
    cardNumber,
    expirationDate,
    securityCode,
    saveStep1InfoHandler,
    saveStep2InfoHandler,
  };

  return (
    <ReservationDetailsContext.Provider value={contextValue}>
      {props.children}
    </ReservationDetailsContext.Provider>
  );
};

export default ReservationDetailsContextProvider;
