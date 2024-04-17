import { fetchTract } from "../api/tract";
import { expect, test } from "vitest";

test("basic fetchTract", async () => {
  const data = await fetchTract(1, "mississippi");
  // fetchTract(1, "mississippi").then((data: any) => {
  //   expect(data).toBe(["hello"]);
  // });
  //
  expect(data).eql(["000100","000101","000102","000103","000104"]);
});
