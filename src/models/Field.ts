import Booking from "./Booking";

type FieldValue = string | number | Date;
export type FieldValidation = { isValid: true } | { isValid: false; invalidReason: string };

interface FieldValidator {
  readonly invalidMessage;
  validate(input: FieldValue): FieldValidation;
}

export class EmailValidator implements FieldValidator {
  private emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  readonly invalidMessage: string;
  public static DEFAULT_INVALID_MESSAGE = "Email invalid";

  constructor(invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    } else {
      this.invalidMessage = EmailValidator.DEFAULT_INVALID_MESSAGE;
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
  #phoneRegex = /^[0-9]{10}$/g;

  readonly invalidMessage: string;
  public static DEFAULT_INVALID_MESSAGE = "Phone invalid";

  constructor(invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    } else {
      this.invalidMessage = PhoneValidator.DEFAULT_INVALID_MESSAGE;
    }
  }

  validate(input: string): FieldValidation {
    const isValid = this.#phoneRegex.test(input);
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
  #pnrRegex = /^[A-Z0-9]{6}$/g;

  readonly invalidMessage: string;
  public static DEFAULT_INVALID_MESSAGE = "PNR invalid";

  constructor(invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    } else {
      this.invalidMessage = PNRValidator.DEFAULT_INVALID_MESSAGE;
    }
  }

  validate(input: string): FieldValidation {
    const isValid = this.#pnrRegex.test(input);
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
  readonly invalidMessage: string;
  public static DEFAULT_INVALID_MESSAGE = "Booked Cabin invalid";

  constructor(invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    } else {
      this.invalidMessage = CabinValidator.DEFAULT_INVALID_MESSAGE;
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
  readonly invalidMessage: string;
  public static DEFAULT_INVALID_MESSAGE = "Ticketing date invalid";

  #travelDate: Date;

  constructor(travelDate: Date, invalidMessage?: string) {
    if (invalidMessage) {
      this.invalidMessage = invalidMessage;
    } else {
      this.invalidMessage = TicketingDateValidator.DEFAULT_INVALID_MESSAGE;
    }
    this.#travelDate = travelDate;
  }

  validate(input: Date): FieldValidation {
    const isBeforeTravelDate = input < this.#travelDate;

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
  #value: FieldValue;
  #validator: FieldValidator;

  constructor(value: FieldValue, validator?: FieldValidator) {
    this.#value = value;
    this.#validator = validator;
  }

  validate(): FieldValidation {
    if (this.#validator) {
      return this.#validator.validate(this.#value);
    } else {
      return { isValid: true };
    }
  }

  public get value(): FieldValue {
    return this.#value;
  }
}
