import Booking from "./Booking";

export default class BookingWithDiscount {
  private static FARE_CLASS_DISCOUNT_CODE_MAPPING: { [key: string]: string } = {
    A: "OFFER_20",
    B: "OFFER_20",
    C: "OFFER_20",
    D: "OFFER_20",
    E: "OFFER_20",
    F: "OFFER_30",
    G: "OFFER_30",
    H: "OFFER_30",
    I: "OFFER_30",
    J: "OFFER_30",
    K: "OFFER_30",
    L: "OFFER_25",
    M: "OFFER_25",
    N: "OFFER_25",
    O: "OFFER_25",
    P: "OFFER_25",
    Q: "OFFER_25",
    R: "OFFER_25",
  };

  booking: Booking;
  discountCode: string;
  constructor(booking: Booking) {
    this.booking = booking;
    this.discountCode = this.calculateDiscount();
  }

  calculateDiscount(): string {
    const discountCode = BookingWithDiscount.FARE_CLASS_DISCOUNT_CODE_MAPPING[this.booking.fareClass.value as string];

    return discountCode || "";
  }
}
