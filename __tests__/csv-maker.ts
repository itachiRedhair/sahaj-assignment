import Booking, { BookingData } from "../src/models/Booking";
import CSVMaker from "../src/utils/CSVMaker";

describe("CSV Maker", () => {
  it("makes a csv from the provided data and parser function", () => {
    const data = [
      { a: "1", b: "2", c: "3" },
      { a: "4", b: "5", c: "6" },
      { a: "7", b: "8", c: "9" },
    ];
    const parserFunc = (data) => {
      return [{ A: data.a }, { B: data.b }, { C: data.c }];
    };
    const EXPECTED_CSV_STRING = `A,B,C
1,2,3
4,5,6
7,8,9`;

    const csvString = new CSVMaker(data, parserFunc).make();

    expect(csvString).toBe(EXPECTED_CSV_STRING);
  });
});
