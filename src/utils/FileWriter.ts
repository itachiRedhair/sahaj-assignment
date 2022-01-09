import fs from "fs";

export default class FileWriter {
  private path: string;
  private data: string;

  constructor(data, path) {
    this.data = data;
    this.path = path;
  }

  write(): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, this.data, function (err) {
        if (err) {
          reject(err);
        }
        resolve(null);
      });
    });
  }
}
