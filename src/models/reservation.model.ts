export interface Reservation extends Step1Details, Step2Details {}

export interface Step1Details {
  enteredName: string;
  enteredSurname: string;
  enteredEmail: string;
  enteredPhoneNumber: string;
}

export interface Step2Details {
  enteredCardholder: string;
  enteredCardNumber: string;
  enteredExpirationDate: string;
  enteredSecurityCode: string;
}

export interface CheckReservationModel {
  resId: string;
  surname: string;
  flightId: string;
  from: string;
  to: string;
  dateOfDeparture: string;
}
