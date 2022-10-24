export interface Flight {
  id: string;
  fromCity: string;
  toCity: string;
  flightDuration: number;
  dateOfDeparture: string;
  numberOfSeats: number;
  price: number;
  distanceBetween: number;
  seatsReserved?: any;
  areSeatsAvailable?: any;
  reservations?: any;
  company?: string;
  model?: string;
}
