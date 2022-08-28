import { describe, expect, it, vi } from "vitest";
import { jsa } from "./jsa";

describe("jsa configuration", () => {
  it(`throws when options.files is not a string or array of strings`, async () => {
    await expect(
      jsa({
        files: false,
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"files was neither a string or an array of strings."'
    );
  });

  it(`throws when options.files array is not all strings`, async () => {
    await expect(
      jsa({
        files: ["./some/okay/file.path", NaN],
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"files was given as an array but not every item is a string"'
    );
  });

  it(`fails when options.files glob does not return any matches`, async () => {
    await expect(
      jsa({
        files: "./**/never.match",
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      "\"glob './**/never.match' did not match any files\""
    );
  });
});
