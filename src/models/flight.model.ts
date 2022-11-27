export interface Flight {
  id: string;
  fromCity: string;
  toCity: string;
  dateOfDeparture: string;
  flightDuration: number;
  numberOfSeats: number;
  price: number;
  distanceBetween: number;
  reservations: any;
  company: string;
  model: string;
  cancelled?: boolean;
  delayed?: boolean;
}

export enum FlightStatus {
  InFlight = "У ЛЕТУ",
  Landed = "СЛЕТЕО",
  Cancelled = "ОДЛОЖЕН",
  Delayed = "ПОМЕРЕН",
  Active = "АКТИВАН",
}
