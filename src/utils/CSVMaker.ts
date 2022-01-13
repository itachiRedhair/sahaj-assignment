type ParserFunc = (data: any) => { [key: string]: string }[];

export default class CSVMaker {
  #parserFunc: ParserFunc;
  #data: any[];

  constructor(data, parserFunc) {
    this.#data = data;
    this.#parserFunc = parserFunc;
  }

  #getCSVData() {
    return this.#data.map((aData) => {
      return this.#parserFunc(aData);
    });
  }

  #getHeader(csvData) {
    const columns = csvData[0].map((aData: any) => Object.entries(aData)[0][0]);

    return columns.join(",");
  }

  #getCSVRows(csvData) {
    const csvRows = [];

    csvData.forEach((csvRowData) => {
      const csvRow = csvRowData.map((aData) => Object.values(aData)[0]).join(",");
      csvRows.push(csvRow);
    });
    return csvRows;
  }

  make() {
    const csvData = this.#getCSVData();

    const header = this.#getHeader(csvData);
    const csvRows = this.#getCSVRows(csvData);

    return [header, ...csvRows].join("\n");
  }
}
