export type client={
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  DNI: string,
  bookings:Array<Omit<booking,"client">>
}
export type restaurante={
  name: string;
  CIF: string;
  address: string;
  bookings: Array<Omit<booking,"restaurant">>;
}
export type booking={
  date: Date;
  client: string;
  restaurant: string;
}