const prodExternals = {
  //lodash: "lodash",
  "lodash/cloneDeep": "cloneDeep",
};
module.exports = {
  css: { extract: false },
  configureWebpack: {
    externals: process.env.NODE_ENV === "production" ? prodExternals : {},
  },
};
