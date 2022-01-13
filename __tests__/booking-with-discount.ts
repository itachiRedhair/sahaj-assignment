import Booking from "../src/models/Booking";
import BookingWithDiscount from "../src/models/BookingWithDiscount";
import { BookingDiscountByFareClassCalculator } from "../src/utils/DiscountCalculator";

const DEFAULT_BOOKING_DATA = {
  firstName: "First_name",
  lastName: "Last_name",
  pnr: "PNR",
  travelDate: "2019-05-31",
  pax: "Pax",
  ticketingDate: "2019-04-31",
  email: "Email",
  phone: "Mobile_phone",
  cabin: "Booked_cabin",
};

describe("Booking with discount", () => {
  it("gets correct discount for the provided fare class", () => {
    const FARE_CLASS = "E";
    const EXPECTED_DISCOUNT_CODE = "OFFER_20";

    const booking = new Booking({ ...DEFAULT_BOOKING_DATA, fareClass: FARE_CLASS });
    const bookingWithDiscount = new BookingWithDiscount(booking, new BookingDiscountByFareClassCalculator(booking));

    expect(bookingWithDiscount.discountCode).toBe(EXPECTED_DISCOUNT_CODE);
  });

  it("sets empty discount code for fareclass that are not valid for discount", () => {
    const FARE_CLASS = "Z";
    const EXPECTED_DISCOUNT_CODE = "";

    const booking = new Booking({ ...DEFAULT_BOOKING_DATA, fareClass: FARE_CLASS });
    const bookingWithDiscount = new BookingWithDiscount(booking, new BookingDiscountByFareClassCalculator(booking));

    expect(bookingWithDiscount.discountCode).toBe(EXPECTED_DISCOUNT_CODE);
  });

  it("sets empty discount code for incorrect fareclass", () => {
    const FARE_CLASS = "any_random_value";
    const EXPECTED_DISCOUNT_CODE = "";

    const booking = new Booking({ ...DEFAULT_BOOKING_DATA, fareClass: FARE_CLASS });
    const bookingWithDiscount = new BookingWithDiscount(booking, new BookingDiscountByFareClassCalculator(booking));

    expect(bookingWithDiscount.discountCode).toBe(EXPECTED_DISCOUNT_CODE);
  });
});
