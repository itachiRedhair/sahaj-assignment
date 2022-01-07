type ParserFunc = (data: any) => { [key: string]: string }[];

export class CSVMaker {
  parserFunc: (data: any) => ParserFunc;
  data: any[];

  constructor(data, parserFunc) {
    this.data = data;
    this.parserFunc = parserFunc;
  }

  make() {
    const csvData = this.data.map((aData) => {
      return this.parserFunc(aData);
    });

    const columns = csvData[0].map((aData: any) => Object.entries(aData)[0][0]);

    let header = columns.join(",");

    let csvString = header;

    csvData.forEach((csvRowData) => {
      const csvRow = csvRowData.map((aData) => Object.values(aData)[0]).join(",");
      csvString = [csvString, csvRow].join("\n");
    });
    return csvString;
  }
}
