import { Field, EmailValidator, PhoneValidator, PNRValidator, TicketingDateValidator, CabinValidator } from "./Field";

export interface BookingData {
  firstName: string;
  lastName: string;
  pnr: string;
  fareClass: string;
  travelDate: string;
  pax: string;
  ticketingDate: string;
  email: string;
  phone: string;
  cabin: string;
}

export default class Booking {
  firstName: Field;
  lastName: Field;
  pnr: Field;
  fareClass: Field;
  travelDate: Field;
  pax: Field;
  ticketingDate: Field;
  email: Field;
  phone: Field;
  cabin: Field;

  static CABIN_TYPES = {
    ECONOMY: "Economy",
    PREMIUM_ECONOMY: "Premium Economy",
    BUSINESS: "Business",
    FIRST: "First",
  };

  constructor(bookingData: BookingData) {
    this.firstName = new Field(bookingData.firstName);
    this.lastName = new Field(bookingData.firstName);
    this.email = new Field(bookingData.email, new EmailValidator());
    this.pnr = new Field(bookingData.pnr, new PNRValidator());
    this.fareClass = new Field(bookingData.fareClass);
    this.travelDate = new Field(new Date(bookingData.travelDate));
    this.pax = new Field(bookingData.pax);
    this.ticketingDate = new Field(
      new Date(bookingData.ticketingDate),
      new TicketingDateValidator(this.travelDate.value as Date)
    );
    this.phone = new Field(bookingData.phone, new PhoneValidator());
    this.cabin = new Field(bookingData.cabin, new CabinValidator());
  }
}
