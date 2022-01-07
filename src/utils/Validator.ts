type InvalidData = { valid: false; invalidReasons?: string[] } | { valid: true };

export default class Validator {
  fieldsToValidate: string[];
  objToValidate: any;

  constructor(objToValidate: any, fieldsToValidate: string[]) {
    this.fieldsToValidate = fieldsToValidate;
    this.objToValidate = objToValidate;
  }

  validate(): InvalidData {
    const invalidReasons = [];

    this.fieldsToValidate.forEach((field) => {
      const validation = this.objToValidate[field].validate();
      if (validation.valid === false) {
        invalidReasons.push(validation.invalidReason);
      }
    });

    if (invalidReasons.length) {
      return { valid: false, invalidReasons };
    } else {
      return { valid: true };
    }
  }
}
