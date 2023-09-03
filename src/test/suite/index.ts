import * as path from 'path';
import Mocha from 'mocha';
import { glob } from 'glob';

export async function run() {
	const mocha = new Mocha({
    ui: 'tdd',
		color: true
	});

	const testsRoot = path.resolve(__dirname, '..');

  try {
    const files = await glob('**/**.test.js', { cwd: testsRoot });

    files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

    try {
      mocha.run((failures) => {
        if (failures > 0) {
          new Error(`${failures} tests failed.`);
        } else {
          return;
        }
      });
    } catch (err) {
      console.error(err);
    }
  } catch (error) {
    console.error(error);
  }
}
