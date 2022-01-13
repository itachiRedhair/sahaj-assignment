import { EmailValidator, Field } from "../src/models/Field";

describe("Field", () => {
  it("always return success validation for field without validator", () => {
    const FIELD_VALUE = "akshay.m@gmail.com";
    const field = new Field(FIELD_VALUE);

    expect(field.validate()).toMatchObject({ isValid: true });
  });

  it("returns success validation for correct value using a validator", () => {
    const FIELD_VALUE = "akshay.m@gmail.com";
    const field = new Field(FIELD_VALUE, new EmailValidator());

    expect(field.validate()).toMatchObject({ isValid: true });
  });

  it("returns failure validation for incorrect value using a validator", () => {
    const FIELD_VALUE = "akshay.m@gmal";
    const field = new Field(FIELD_VALUE, new EmailValidator());

    expect(field.validate()).toMatchObject({ isValid: false, invalidReason: EmailValidator.DEFAULT_INVALID_MESSAGE });
  });
});
