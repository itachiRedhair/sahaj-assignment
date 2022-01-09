import Booking from "./Booking";

type FieldValue = string | number | Date;
export type FieldValidation = { isValid: true } | { isValid: false; invalidReason: string };

interface FieldValidator {
  invalidMessage: string;
  validate(input: FieldValue): FieldValidation;
}

export class EmailValidator implements FieldValidator {
  private emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  invalidMessage: string = "Email invalid";

  constructor(invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    }
  }

  validate(input: string): FieldValidation {
    const isValid = this.emailRegex.test(input);
    if (isValid) {
      return { isValid: true };
    }

    return {
      isValid: false,
      invalidReason: this.invalidMessage,
    };
  }
}

export class PhoneValidator implements FieldValidator {
  private phoneRegex = /^[0-9]{10}$/g;

  invalidMessage: string = "Phone invalid";

  constructor(invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    }
  }

  validate(input: string): FieldValidation {
    const isValid = this.phoneRegex.test(input);
    if (isValid) {
      return { isValid: true };
    }

    return {
      isValid: false,
      invalidReason: this.invalidMessage,
    };
  }
}

export class PNRValidator implements FieldValidator {
  private pnrRegex = /^[A-Z0-9]{6}$/g;
  invalidMessage: string = "PNR invalid";

  constructor(invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    }
  }

  validate(input: string): FieldValidation {
    const isValid = this.pnrRegex.test(input);
    if (isValid) {
      return { isValid: true };
    }

    return {
      isValid: false,
      invalidReason: this.invalidMessage,
    };
  }
}

export class CabinValidator implements FieldValidator {
  invalidMessage: string = "Booked Cabin invalid";

  constructor(invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    }
  }

  validate(input: string): FieldValidation {
    const isFound = Object.values(Booking.CABIN_TYPES).includes(input);
    if (isFound) {
      return { isValid: true };
    }

    return {
      isValid: false,
      invalidReason: this.invalidMessage,
    };
  }
}
export class TicketingDateValidator implements FieldValidator {
  invalidMessage: string = "Ticketing date invalid";
  private travelDate: Date;

  constructor(travelDate: Date, invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    }
    this.travelDate = travelDate;
  }

  validate(input: Date): FieldValidation {
    const isBeforeTravelDate = input < this.travelDate;

    if (isBeforeTravelDate) {
      return { isValid: true };
    }

    return {
      isValid: false,
      invalidReason: this.invalidMessage,
    };
  }
}

export class Field {
  value: FieldValue;
  validator: FieldValidator;

  constructor(value: FieldValue, validator?: FieldValidator) {
    this.value = value;
    this.validator = validator;
  }

  validate() {
    if (this.validator) {
      return this.validator.validate(this.value);
    }
  }
}
