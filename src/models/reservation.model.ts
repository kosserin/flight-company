export interface Reservation extends Step1Details {
  cardholderName: string;
  cardNumber: string;
  expireDate: string;
  secureCode: string;
}

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
