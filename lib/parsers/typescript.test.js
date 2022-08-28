import { describe, expect, it, vi } from 'vitest';
import { parseWithTypescript } from './typescript';
import { promises as fs } from 'node:fs';

describe('ast-worker', () => {
  const spyReadFile = vi.spyOn(fs, 'readFile');

  it.todo('returns an ast when parsing typescript', async () => {
    spyReadFile.mockResolvedValue(
      `import { namedExport } from 'somewhere'
  import type { someType } from 'somewhere'
  import { something as somethingElse } from 'somewhere'
  import * as starImport from 'somewhere'
  import defaultSomething from 'somewhere'`
    );

    const result = await parseWithTypescript('/path/to/index.js');
    expect(result).toMatchSnapshot();
  });
});
