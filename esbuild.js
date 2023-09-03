const { build } = require('esbuild');
const copyStaticFiles = require('esbuild-copy-static-files');

const destDir = 'out';

const baseConfig = {
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV !== 'production',
  plugins: [
    copyStaticFiles({
      src: './src/assets',
      dest: `./${destDir}/assets`,
      dereference: true,
      errorOnExist: false,
      preserveTimestamps: true,
      recursive: true,
    })
  ],
};

const watchConfig = {
  watch: {
    onRebuild(error, result) {
      console.info('[watch] build started');
      if (error) {
        error.errors.forEach(error =>
          console.error(`> ${error.location.file}:${error.location.line}:${error.location.column}: error: ${error.text}`)
        );
      } else {
        console.info('[watch] build finished');
      }
    },
  },
};

const extensionConfig = {
  ...baseConfig,
  platform: 'node',
  mainFields: ['module', 'main'],
  entryPoints: [
    './src/extension.ts',

    './src/controller/chat.controller.ts',
    './src/controller/image.controller.ts',
    './src/controller/sidebar.controller.ts',

    './src/test/suite/extension.test.ts',
    './src/test/suite/index.ts',
    './src/test/runTest.ts',
  ],
  outdir: `./${destDir}`,
  external: ['vscode', 'mocha'],
};

(async () => {
  const args = process.argv.slice(2);

  try {
    if (args.includes('--watch')) {
      console.info('[watch] build started');
      await build({
        ...extensionConfig,
        ...watchConfig,
      });
      console.info('[watch] build finished');
    } else {
      await build(extensionConfig);
      console.info('build complete');
    }
  } catch (err) {
    process.stderr.write(err.stderr);
    process.exit(1);
  }
})();
