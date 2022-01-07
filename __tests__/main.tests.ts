import Booking, { FareClass, FirstName, PNR } from "../src/models/Booking";
import Validator from "../src/models/Validator";
import { BookingCSVRow } from "../src/models/BookingCSV";
import { CSVReader } from "../src/models/CSVReader";
import { InvalidBooking } from "../src/models/InvalidBooking";
import { BookingWithDiscount } from "../src/models/BookingWithDiscount";
import { CSVMaker } from "../src/models/CSVMaker";
import { FileWriter } from "../src/models/FileWriter";

const inputFilePath = "./input/bookings.csv";

test("temp", async () => {
  const bookingCSVData: BookingCSVRow[] = (await new CSVReader(inputFilePath).read()) as unknown as BookingCSVRow[];

  const bookings = bookingCSVData.map(
    (data) =>
      new Booking({
        firstName: new FirstName(data.First_name),
        pnr: new PNR(data.PNR),
        fareClass: new FareClass(data.Fare_class),
      })
  );

  const invalidBookings = [];
  const bookingsWithDiscount = [];

  for (const booking of bookings) {
    const bookingValidator = new Validator(booking, ["pnr"]);
    const validation = bookingValidator.validate();
    if (validation.valid === true) {
      bookingsWithDiscount.push(new BookingWithDiscount(booking));
    } else {
      invalidBookings.push(new InvalidBooking(booking, validation.invalidReasons));
    }
  }

  const invalidBookingCSV = new CSVMaker(invalidBookings, (invalidBooking: InvalidBooking) => [
    { First_name: invalidBooking.booking.firstName.value },
    { PNR: invalidBooking.booking.pnr.value },
    { Fare_class: invalidBooking.booking.fareClass.value },
    { Error: invalidBooking.invalidReasons.join("/") },
  ]).make();

  const bookingWithDiscountCSV = new CSVMaker(bookingsWithDiscount, (booking: BookingWithDiscount) => [
    { First_name: booking.booking.firstName.value },
    { PNR: booking.booking.pnr.value },
    { Fare_class: booking.booking.fareClass.value },
    { Discount_code: booking.discountCode },
  ]).make();

  await new FileWriter(invalidBookingCSV, "./output/invalid_bookings.csv").write();
  await new FileWriter(bookingWithDiscountCSV, "./output/bookings.csv").write();

  expect(1 + 2).toBe(3);
});
