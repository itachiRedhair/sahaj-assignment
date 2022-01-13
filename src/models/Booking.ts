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
  #firstName: Field;
  #lastName: Field;
  #pnr: Field;
  #fareClass: Field;
  #travelDate: Field;
  #pax: Field;
  #ticketingDate: Field;
  #email: Field;
  #phone: Field;
  #cabin: Field;

  static readonly CABIN_TYPES = {
    ECONOMY: "Economy",
    PREMIUM_ECONOMY: "Premium Economy",
    BUSINESS: "Business",
    FIRST: "First",
  };

  constructor(bookingData: BookingData) {
    this.#firstName = new Field(bookingData.firstName);
    this.#lastName = new Field(bookingData.lastName);
    this.#email = new Field(bookingData.email, new EmailValidator());
    this.#pnr = new Field(bookingData.pnr, new PNRValidator());
    this.#fareClass = new Field(bookingData.fareClass);
    this.#travelDate = new Field(new Date(bookingData.travelDate));
    this.#pax = new Field(bookingData.pax);
    this.#ticketingDate = new Field(
      new Date(bookingData.ticketingDate),
      new TicketingDateValidator(this.#travelDate.value as Date)
    );
    this.#phone = new Field(bookingData.phone, new PhoneValidator());
    this.#cabin = new Field(bookingData.cabin, new CabinValidator());
  }

  get firstName(): Field {
    return this.#firstName;
  }

  get lastName(): Field {
    return this.#lastName;
  }
  get email(): Field {
    return this.#email;
  }
  get pnr(): Field {
    return this.#pnr;
  }
  get fareClass(): Field {
    return this.#fareClass;
  }
  get travelDate(): Field {
    return this.#travelDate;
  }
  get pax(): Field {
    return this.#pax;
  }
  get ticketingDate(): Field {
    return this.#ticketingDate;
  }
  get phone(): Field {
    return this.#phone;
  }
  get cabin(): Field {
    return this.#cabin;
  }
}
