type FieldValue = string | number;

export type FieldValidation = { valid: false; invalidReason: string } | { valid: true };

export type FieldValidator = (value: FieldValue) => FieldValidation;

export class Field {
  value: FieldValue;
  validator: FieldValidator;

  constructor(value: FieldValue, validator?: FieldValidator) {
    this.value = value;
    this.validator = validator;
  }

  validate() {
    if (this.validator) {
      return this.validator(this.value);
    } else {
      return { valid: true };
    }
  }
}
