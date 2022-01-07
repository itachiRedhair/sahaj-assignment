import { Field, FieldValidator } from "./Field";

export interface BookingData {
  firstName: FirstName;
  // lastName: Field;
  pnr: PNR;
  fareClass: Field;
  // travelDate: Field;
  // pax: Field;
  // ticketingDate: Field;
  // email: Field;
  // phone: Field;
  // cabin: Field;
}

export default class Booking {
  firstName: FirstName;
  // lastName: Field;
  pnr: PNR;
  fareClass: FareClass;
  // travelDate: Field;
  // pax: Field;
  // ticketingDate: Field;
  // email: Field;
  // phone: Field;
  // cabin: Field;

  static CABIN_TYPES = {
    ECONOMY: "Economy",
    PREMIUM_ECONOMY: "Premium Economy",
    BUSINESS: "Business",
    FIRST: "First",
  };

  constructor(bookingData: BookingData) {
    this.firstName = bookingData.firstName;
    // this.lastName = bookingData.lastName;
    this.pnr = bookingData.pnr;
    this.fareClass = bookingData.fareClass;
    // this.travelDate = bookingData.travelDate;
    // this.pax = bookingData.pax;
    // this.ticketingDate = bookingData.ticketingDate;
    // this.email = bookingData.email;
    // this.phone = bookingData.phone;
    // this.cabin = bookingData.cabin;
  }
}

export class FirstName extends Field {
  constructor(value: string) {
    super(value);
  }
}

export class PNR extends Field {
  static validator: FieldValidator = (value) => {
    const regexPattern = /^[A-Z0-9]{6}$/g;
    if (regexPattern.test(value as string)) {
      return { valid: true };
    } else {
      return { valid: false, invalidReason: "Invalid pnr" };
    }
  };

  constructor(value: string) {
    super(value, PNR.validator);
  }
}

export class FareClass extends Field {
  constructor(value: string) {
    super(value);
  }
}
