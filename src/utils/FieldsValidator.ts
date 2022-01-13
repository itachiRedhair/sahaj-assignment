import { Field, FieldValidation } from "../models/Field";

type FieldsValidation = { isValid: false; invalidReasons?: string[] } | { isValid: true };

export default class FieldsValidator {
  #fieldsToValidate: Field[];

  constructor(fieldsToValidate: Field[]) {
    this.#fieldsToValidate = fieldsToValidate;
  }

  validate(): FieldsValidation {
    const invalidReasons = [];

    this.#fieldsToValidate.forEach((field) => {
      const validation: FieldValidation = field.validate();
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
