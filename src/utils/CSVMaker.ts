type ParserFunc = (data: any) => { [key: string]: string }[];

export default class CSVMaker {
  private parserFunc: ParserFunc;
  private data: any[];

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

    const csvRows = [];

    csvData.forEach((csvRowData) => {
      const csvRow = csvRowData.map((aData) => Object.values(aData)[0]).join(",");
      csvRows.push(csvRow);
    });
    return [header, ...csvRows].join("\n");
  }
}
