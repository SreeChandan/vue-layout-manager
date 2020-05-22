﻿const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { paths } = require('./config');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const pathTypes = path.join(paths.dist, 'types');

module.exports.build_types = async function build_types() {
  try {
    await exec('npx tsc -v');

    console.log(chalk.cyan('Removing old declarations...'));
    await fs.emptyDir(pathTypes);
    console.log('Done\n');

    console.log(chalk.cyan('Generating main declarations...'));
    await exec('npx tsc --emitDeclarationOnly');
    console.log(chalk.cyan('Done\n'));

    /*console.log('Cleaning up declaration folder...');
    await fs.copy(pathTypesSrc, pathTypes);
    await fs.remove(pathTypesSrc);
    console.log('Done\n');*/

    /*console.log('Replacing definitions...');
    await exec('node ./scripts/replaceDefs.js');
    console.log('Done\n');*/
  } catch (error) {
    console.error(error);
  }
};
