import csvtojson from "csvtojson";

type ParsedJsonFromCSV = { [key: string]: string }[];
export default class CSVReader {
  #path: string;

  constructor(path) {
    this.#path = path;
  }

  read(): Promise<ParsedJsonFromCSV> {
    return csvtojson().fromFile(this.#path) as unknown as Promise<ParsedJsonFromCSV>;
  }
}
