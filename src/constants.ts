const FARE_CLASS_DISCOUNT_CODE_MAPPING = {
  A: "OFFER_20",
  B: "OFFER_20",
  C: "OFFER_20",
  D: "OFFER_20",
  E: "OFFER_20",
  F: "OFFER_30",
  G: "OFFER_30",
  H: "OFFER_30",
  I: "OFFER_30",
  J: "OFFER_30",
  K: "OFFER_30",
  L: "OFFER_25",
  M: "OFFER_25",
  N: "OFFER_25",
  O: "OFFER_25",
  P: "OFFER_25",
  Q: "OFFER_25",
  R: "OFFER_25",
};

const VALIDATION_FAILURE_REASONS = {
  PNR_INVALID: "PNR invalid",
  EMAIL_INVALID: "Email invalid",
  PHONE_INVALID: "Email invalid",
  TICKETING_DATE_AFTER_TRAVEL_DATE: "Ticketing date is after travel date",
  CABIN_INVALID: "Booking cabin invalid",
};

const CABIN_TYPES = {
  ECONOMY: "Economy",
  PREMIUM_ECONOMY: "Premium Economy",
  BUSINESS: "Business",
  FIRST: "First",
};

module.exports = {
  FARE_CLASS_DISCOUNT_CODE_MAPPING,
  VALIDATION_FAILURE_REASONS,
  CABIN_TYPES,
};
