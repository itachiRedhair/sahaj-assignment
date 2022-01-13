import {
  CabinValidator,
  EmailValidator,
  Field,
  PhoneValidator,
  PNRValidator,
  TicketingDateValidator,
} from "../src/models/Field";
import FieldsValidator from "../src/utils/FieldsValidator";

describe("Fields validator", () => {
  it("returns success validation for correct fields array", () => {
    const fieldsValidator = new FieldsValidator([
      new Field("akshay.m@gmail.com", new EmailValidator()),
      new Field("A1B2C3", new PNRValidator()),
      new Field("Economy", new CabinValidator()),
      new Field("9839212345", new PhoneValidator()),
      new Field(new Date("2021-3-21"), new TicketingDateValidator(new Date("2021-4-21"))),
    ]);
    const validation = fieldsValidator.validate();
    expect(validation.isValid).toBe(true);
  });

  it("returns failure validation for any incorrect field in the fields array", () => {
    const fieldsValidator = new FieldsValidator([
      new Field("akshay.m@gmail.com", new EmailValidator()),
      new Field("A1B2C", new PNRValidator()),
      new Field("Premium Business", new CabinValidator()),
    ]);
    const validation = fieldsValidator.validate();
    expect(validation.isValid).toBe(false);
    expect((validation as any).invalidReasons).toMatchObject([
      PNRValidator.DEFAULT_INVALID_MESSAGE,
      CabinValidator.DEFAULT_INVALID_MESSAGE,
    ]);
  });
});
