export interface Flight {
  id: string;
  fromCity: string;
  toCity: string;
  dateOfDeparture: string;
  flightDuration: number;
  numberOfSeats: number;
  price: number;
  distanceBetween: number;
  reservations: Reservation[];
  company: string;
  model: string;
  canceled?: boolean;
  delayed?: boolean;
}

export interface Reservation {
  id: string;
  lastName: string;
}

export enum FlightStatus {
  InFlight = "У ЛЕТУ",
  Landed = "СЛЕТЕО",
  Canceled = "ОДЛОЖЕН",
  Delayed = "ПОМЕРЕН",
  Active = "АКТИВАН",
}
