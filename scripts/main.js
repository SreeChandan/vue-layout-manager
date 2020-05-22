// builds js files without types
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const { configs, utils, paths } = require('./config');
const name = process.env.VERSION || require('../package.json').name;

module.exports.build_js = async function build_js() {
  await mkdirp(paths.dist);
  // eslint-disable-next-line
  console.log(chalk.cyan('Generating ESM builds...'));
  await utils.writeBundle(configs.esm, `${name}.esm.js`);
  // eslint-disable-next-line
  console.log(chalk.cyan('Done!'));

  // eslint-disable-next-line
  console.log(chalk.cyan('Generating UMD build...'));
  await utils.writeBundle(configs.umd, `${name}.js`, true);
  // eslint-disable-next-line
  console.log(chalk.cyan('Done!'));
};
