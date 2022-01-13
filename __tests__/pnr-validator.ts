import { PNRValidator } from "../src/models/Field";

describe("PNR Validator", () => {
  it("creates and instance of PNR validator without invalidMessage", () => {
    const pnrValidator = new PNRValidator();

    expect(pnrValidator).toHaveProperty("validate");
    expect(pnrValidator).toHaveProperty("invalidMessage");
  });

  it("creates and instance of PNR validator with invalidMessage", () => {
    const invalidMessage = "test - PNR invalid";
    const pnrValidator = new PNRValidator(invalidMessage);

    expect(pnrValidator).toHaveProperty("validate");
    expect(pnrValidator).toHaveProperty("invalidMessage");
  });

  it("gives success validation for correct PNR", () => {
    const pnr = "ABC123";
    const pnrValidator = new PNRValidator();

    expect(pnrValidator.validate(pnr)).toMatchObject({ isValid: true });
  });

  it("gives failure validation for incorrect PNR with default invalid message", () => {
    const pnr = "ABC12";
    const pnrValidator = new PNRValidator();

    expect(pnrValidator.validate(pnr)).toMatchObject({
      isValid: false,
      invalidReason: PNRValidator.DEFAULT_INVALID_MESSAGE,
    });
  });

  it("gives failure validation for incorrect PNR with provided invalid message", () => {
    const pnr = "ABC12";
    const invalidMessage = "test - PNR invalid";
    const pnrValidator = new PNRValidator(invalidMessage);

    expect(pnrValidator.validate(pnr)).toMatchObject({
      isValid: false,
      invalidReason: invalidMessage,
    });
  });
});
