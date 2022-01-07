/**
 * Models
 * 
 * Booking
 *      constructor(){
 *      }
 * 
 * InvalidBooking                   // extends Booking
 *      constructor(booking, reason){
 *          this.booking = booking
 *          invalidReason = reason
 *      }
 * 
 * BookingWithDiscount                  // extends Booking
 *      static FARE_CLASS_DISCOUNT_CODE_MAPPING
 * 
 *      constructor(booking){
 *          this.booking = booking
 *          this.discountCode = this.getDiscount()
 *      }
 * 
 *      getDiscount(){
 *          return FARE_CLASS_DISCOUNT_CODE_MAPPING[this.fareClass]
 *      }
 *           
 * 
 * Field
 *      constructor(validator)
 *      this.value
 *      this.validate(){
 *          return this.validator(this.value)
 *      }
 * 
 * alidator
 *      constructor(booking: Booking, fieldsToValidate: [String])
 *      this.validate(){ -> {valid: Boolean, reasons?: [String] }
 *          validations= []
 *          for field in fieldsToValidate:
 *              validation.push({reasons: booking[field].validate()})
 *          return validations;
 *      }
 * 
 * 
 * CSVReader
 *      this.path
 *      this.load() -> array of objects
 * 
 * 
 * FileWriter
 *      this.data
 *      this.path
 *      this.write()
 *      this.append()
 * 
 * 
 * CSVMaker
 *      constructor(parser)
 */


/**
 * Steps
 * data = CSVLoader(path).load() // Read CSV using CSVLoader
 * bookings = data.map(aData=> Booking(data))
 * bookingWithDiscounts = []
 * invalidBookings = []
 * for booking in bookings:
 *      validation = BookingValidator(booking).validate();
 *      if(validation.valid){
 *          bookingWithDiscount = new BookingWithDiscount(booking)
 *          bookingWithDiscounts.push(bookingWithDiscount)
 *      }else{
 *          
 *          invalidBookings.push()
 *      }
 * 
 * parserFunc = (data)=> [{First_name: data.firstName}, {Last_name: data.lastName}, {discount: data.discountCode}]
 * // TODO: find a way to append in csv rather than complete write
 * FileWriter(CSVMaker(parserFunc, bookingWithDiscount)).write();
 * 
 * parserFunc = (data)=> [{First_name: data.firstName}, {Last_name: data.lastName}, {Invalid: data.invalidReason}]
 * FileWriter(CSVMaker(parserFunc, bookingWithDiscount)).write();
 * 
 */

/**
 * Input example
 * Abhishek,Kumar,ABC123,F,2019-07-31,2,2019-05-21,abhishek@zzz.com,9876543210,Economy
 */

// TODO:
// typesciprt, class, interface, enums
// unit tests