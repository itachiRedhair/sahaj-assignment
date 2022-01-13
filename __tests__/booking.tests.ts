import Booking, { BookingData } from "../src/models/Booking";

describe("Booking", () => {
  it("creates an instance of Booking from booking data", () => {
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

    expect(booking).toBeDefined();
    expect(booking).toBeInstanceOf(Booking);
    expect(booking.firstName.value).toBe(bookingData.firstName);
    expect(booking.lastName.value).toBe(bookingData.lastName);
    expect(booking.pnr.value).toBe(bookingData.pnr);
    expect(booking.fareClass.value).toBe(bookingData.fareClass);
    expect(booking.travelDate.value.toString()).toBe(new Date(bookingData.travelDate).toString());
    expect(booking.pax.value).toBe(bookingData.pax);
    expect(booking.ticketingDate.value.toString()).toBe(new Date(bookingData.ticketingDate).toString());
    expect(booking.email.value).toBe(bookingData.email);
    expect(booking.phone.value).toBe(bookingData.phone);
    expect(booking.cabin.value).toBe(bookingData.cabin);
  });
});
