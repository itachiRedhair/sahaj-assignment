import Booking from "../src/models/Booking";
import BookingValidator from "../src/utils/BookingValidator";
import { BookingCSVRow } from "../src/models/BookingCSV";
import CSVReader from "../src/utils/CSVReader";
import InvalidBooking from "../src/models/InvalidBooking";
import BookingWithDiscount from "../src/models/BookingWithDiscount";
import CSVMaker from "../src/utils/CSVMaker";
import FileWriter from "../src/utils/FileWriter";

const inputFilePath = "./input/bookings.csv";

let invalidBookings = [];
let bookingsWithDiscount = [];

beforeAll(async () => {
  const bookingCSVData: BookingCSVRow[] = (await new CSVReader(inputFilePath).read()) as unknown as BookingCSVRow[];

  const bookings = bookingCSVData.map(
    (data) =>
      new Booking({
        firstName: data.First_name,
        lastName: data.Last_name,
        pnr: data.PNR,
        fareClass: data.Fare_class,
        travelDate: data.Travel_date,
        pax: data.Pax,
        ticketingDate: data.Ticketing_date,
        email: data.Email,
        phone: data.Mobile_phone,
        cabin: data.Booked_cabin,
      })
  );

  for (const booking of bookings) {
    const bookingValidator = new BookingValidator(booking, ["pnr", "ticketingDate", "email", "phone", "cabin"]);
    const validation = bookingValidator.validate();
    if (validation.isValid === true) {
      bookingsWithDiscount.push(new BookingWithDiscount(booking));
    } else {
      invalidBookings.push(new InvalidBooking(booking, validation.invalidReasons));
    }
  }
});

test("invalid bookings", async () => {
  expect(invalidBookings.length).toBe(5);
});

test("booking with discounts", async () => {
  expect(bookingsWithDiscount.length).toBe(3);
});

afterAll(async () => {
  if (invalidBookings.length) {
    const invalidBookingCSV = new CSVMaker(invalidBookings, (invalidBooking: InvalidBooking) => [
      { First_name: invalidBooking.booking.firstName.value },
      { Last_name: invalidBooking.booking.lastName.value },
      { PNR: invalidBooking.booking.pnr.value },
      { Fare_class: invalidBooking.booking.fareClass.value },
      { Travel_date: (invalidBooking.booking.travelDate.value as Date).toISOString().split("T")[0] },
      { Pax: invalidBooking.booking.pax.value },
      { Ticketing_date: (invalidBooking.booking.ticketingDate.value as Date).toISOString().split("T")[0] },
      { Email: invalidBooking.booking.email.value },
      { Mobile_phone: invalidBooking.booking.phone.value },
      { Booked_cabin: invalidBooking.booking.cabin.value },
      { Error: invalidBooking.invalidReasons.join("/") },
    ]).make();
    await new FileWriter(invalidBookingCSV, "./output/invalid_bookings.csv").write();
  }

  if (bookingsWithDiscount.length) {
    const bookingWithDiscountCSV = new CSVMaker(bookingsWithDiscount, (bookingWithDiscount: BookingWithDiscount) => [
      { First_name: bookingWithDiscount.booking.firstName.value },
      { Last_name: bookingWithDiscount.booking.lastName.value },
      { PNR: bookingWithDiscount.booking.pnr.value },
      { Fare_class: bookingWithDiscount.booking.fareClass.value },
      { Travel_date: (bookingWithDiscount.booking.travelDate.value as Date).toISOString().split("T")[0] },
      { Pax: bookingWithDiscount.booking.pax.value },
      { Ticketing_date: (bookingWithDiscount.booking.ticketingDate.value as Date).toISOString().split("T")[0] },
      { Email: bookingWithDiscount.booking.email.value },
      { Mobile_phone: bookingWithDiscount.booking.phone.value },
      { Booked_cabin: bookingWithDiscount.booking.cabin.value },
      { Discount_code: bookingWithDiscount.discountCode },
    ]).make();

    await new FileWriter(bookingWithDiscountCSV, "./output/bookings.csv").write();
  }
});
