import Booking from "./Booking";

export class InvalidBooking {
  booking: Booking;
  invalidReasons: string[];
  constructor(booking: Booking, invalidReasons: string[]) {
    this.booking = booking;
    this.invalidReasons = invalidReasons;
  }
}
