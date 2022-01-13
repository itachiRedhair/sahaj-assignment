import fs from "fs";

export default class FileWriter {
  #path: string;
  #data: string;

  constructor(data: string, path: string) {
    if (typeof data !== "string") {
      throw new Error("Data should be a string");
    }
    this.#data = data;
    this.#path = path;
  }

  write(): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.#path, this.#data, function (err) {
        if (err) {
          reject(err);
        }
        resolve(null);
      });
    });
  }
}
