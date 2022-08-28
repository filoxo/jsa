import { describe, expect, it, vi } from "vitest";
import { parseWithSvelte } from "./svelte";
import { promises as fs } from "node:fs";

describe("ast-worker", () => {
  const spyReadFile = vi.spyOn(fs, "readFile");

  it("returns an ast when parsing plain javascript", async () => {
    spyReadFile.mockResolvedValue(
      `<script>
import { onDestroy, onMount } from 'svelte';
export let name
</script>

<style>
section {
  font-size: 1.5rem;
}
</style>

<section>{name} is mounted!</section>`
    );

    const result = await parseWithSvelte("/path/to/App.svelte");
    expect(result).toMatchSnapshot();
  });
});
