const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "#Services": "./src/_services",
          "#Helpers": "./src/_helpers",
        },
      },
    },
  ],
};
