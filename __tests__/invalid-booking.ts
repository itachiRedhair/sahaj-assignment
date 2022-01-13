import Booking, { BookingData } from "../src/models/Booking";
import InvalidBooking from "../src/models/InvalidBooking";

describe("Invalid Booking", () => {
  it("creates an instance of InvalidBooking", () => {
    const bookingData: BookingData = {
      firstName: "First_name",
      lastName: "Last_name",
      pnr: "PNR",
      fareClass: "Fare_class",
      travelDate: "2019-05-31",
      pax: "Pax",
      ticketingDate: "2019-04-31",
      email: "Email",
      phone: "Mobile_phone",
      cabin: "Booked_cabin",
    };

    const booking = new Booking(bookingData);
    const INVALID_REASONS = ["reason1", "reason2"];
    const invalidBooking = new InvalidBooking(booking, INVALID_REASONS);

    expect(invalidBooking).toBeDefined();
    expect(invalidBooking.booking).toBe(booking);
    expect(invalidBooking.invalidReasons).toBe(INVALID_REASONS);
  });
});
