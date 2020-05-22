const build_js = require('./main').build_js;
const build_types = require('./types').build_types;

async function build() {
  await build_js();
  await build_types();
}
build();
