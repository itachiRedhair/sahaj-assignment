import Booking from "../models/Booking";
import { FieldValidation } from "../models/Field";

type BookingValidation = { isValid: false; invalidReasons?: string[] } | { isValid: true };

export default class BookingValidator {
  private fieldsToValidate: string[];
  booking: any;

  constructor(booking: Booking, fieldsToValidate: string[]) {
    this.fieldsToValidate = fieldsToValidate;
    this.booking = booking;
  }

  validate(): BookingValidation {
    const invalidReasons = [];

    this.fieldsToValidate.forEach((field) => {
      const validation: FieldValidation = this.booking[field].validate();
      if (validation.isValid === false) {
        invalidReasons.push(validation.invalidReason);
      }
    });

    if (invalidReasons.length) {
      return { isValid: false, invalidReasons };
    } else {
      return { isValid: true };
    }
  }
}
