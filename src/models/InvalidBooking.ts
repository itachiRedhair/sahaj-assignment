import Booking from "./Booking";

export default class InvalidBooking {
  #booking: Booking;
  #invalidReasons: string[];
  constructor(booking: Booking, invalidReasons: string[]) {
    this.#booking = booking;
    this.#invalidReasons = invalidReasons;
  }

  public get booking(): Booking {
    return this.#booking;
  }

  public get invalidReasons(): string[] {
    return this.#invalidReasons;
  }
}
