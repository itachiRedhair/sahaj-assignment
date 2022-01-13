import path from "path";
import fs from "fs";
import FileWriter from "../src/utils/FileWriter";

describe("File Writer", () => {
  it("creates an instance of file writer", () => {
    const DATA = "temp data";
    const PATH = "./temp/new_file.txt";
    const fileWriter = new FileWriter(DATA, PATH);

    expect(fileWriter).toHaveProperty("write");
  });

  it("throw an error when provided data is not string", () => {
    const DATA = {};
    const PATH = "./temp/new_file.txt";
    expect(() => new FileWriter(DATA as any, PATH)).toThrow();
  });

  it("writes provided data string to a provided path", async () => {
    const DATA = "temp data string";
    const PATH = "./__tests__/temp/new_file.txt";

    if (fs.existsSync(PATH)) {
      fs.unlinkSync(PATH);
    }

    await new FileWriter(DATA, PATH).write();

    expect(fs.existsSync(PATH)).toBeTruthy();
    expect(fs.readFileSync(PATH).toString()).toBe(DATA);
  });
});
