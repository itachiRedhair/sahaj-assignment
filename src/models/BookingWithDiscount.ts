import { BookingDiscountByFareClassCalculator } from "../utils/DiscountCalculator";
import Booking from "./Booking";

export default class BookingWithDiscount {
  #booking: Booking;
  #discountCode: string;
  constructor(booking: Booking, bookingDiscountCalculator: BookingDiscountByFareClassCalculator) {
    this.#booking = booking;
    this.#discountCode = bookingDiscountCalculator.calculateDiscount();
  }

  public get booking(): Booking {
    return this.#booking;
  }

  public get discountCode(): string {
    return this.#discountCode;
  }
}
