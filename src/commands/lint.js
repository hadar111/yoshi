const {createRunner} = require('haste-core');
const parseArgs = require('minimist');
const LoggerPlugin = require('../plugins/haste-plugin-yoshi-logger');
const globs = require('../globs');
const {isTypescriptProject, getTsconfigPath, getTslintPath, shouldRunStylelint, watchMode} = require('../utils');

const runner = createRunner({
  logger: new LoggerPlugin()
});

const shouldWatch = watchMode();
const cliArgs = parseArgs(process.argv.slice(2));

module.exports = runner.command(async tasks => {
  if (shouldWatch) {
    return;
  }

  const {eslint, tslint, stylelint} = tasks;

  if (await shouldRunStylelint()) {
    await stylelint({pattern: [`${globs.base()}/**/*.scss`, `${globs.base()}/**/*.less`], options: {formatter: 'string'}});
  }

  if (isTypescriptProject()) {
    await tslint({
      options: {fix: cliArgs.fix, formatter: cliArgs.format || 'stylish'},
      tsconfigFilePath: getTsconfigPath(),
      tslintFilePath: getTslintPath()
    });
  } else {
    await eslint({
      pattern: ['*.js', `${globs.base()}/**/*.js`],
      options: {cache: true, cacheLocation: 'target/.eslintcache', fix: cliArgs.fix, formatter: cliArgs.format}
    });
  }
});
