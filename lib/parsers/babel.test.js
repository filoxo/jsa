import { describe, expect, it, vi } from 'vitest';
import { parseWithBabel } from './babel';
import { promises as fs } from 'node:fs';

describe('ast-worker', () => {
  const spyReadFile = vi.spyOn(fs, 'readFile');

  it('returns an ast when parsing plain javascript', async () => {
    spyReadFile.mockResolvedValue(
      `import { namedExport } from 'somewhere'
  import { something as somethingElse } from 'somewhere'
  import * as starImport from 'somewhere'
  import defaultSomething from 'somewhere'`
    );
    const result = await parseWithBabel('/path/to/index.js');
    expect(result).toMatchSnapshot();
  });

  it.todo('returns an ast when parsing typescript');

  it.todo('returns an ast when parsing code that contains jsx');
});
