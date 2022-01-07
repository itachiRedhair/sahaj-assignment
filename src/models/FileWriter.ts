import fs from "fs";

export class FileWriter {
  path: string;
  data: string;

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
