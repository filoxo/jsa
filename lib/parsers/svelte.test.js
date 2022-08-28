import { describe, expect, it, vi } from 'vitest';
import { parseWithSvelte } from './svelte';
import { promises as fs } from 'node:fs';

describe('ast-worker', () => {
  const spyReadFile = vi.spyOn(fs, 'readFile');

  it.todo('returns an ast when parsing plain javascript', async () => {
    spyReadFile.mockResolvedValue(`// TODO: add some Svelte code here`);

    const result = await parseWithSvelte('/path/to/index.js');
    expect(result).toMatchSnapshot();
  });
});
