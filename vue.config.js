const prodExternals = [
  //lodash: "lodash",
  "lodash",
  /lodash\/.*/,
  //
];
module.exports = {
  css: { extract: false },
  configureWebpack: {
    externals: process.env.NODE_ENV === "production" ? prodExternals : [],
  },
};
