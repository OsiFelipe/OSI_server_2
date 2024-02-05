"use strict";

const {
  verificaToken,
  verifyRole,
  verificaTokenClient,
  verifyRoleClient,
} = require("../middlewares/auth");

const routes = [
  require("./routes/client.routes"),
  require("./routes/user.routes"),
  require("./routes/well.routes"),
  require("./routes/proposal.routes"),
  require("./routes/tally.routes"),
  require("./routes/product.routes"),
  require("./routes/sales.routes"),
  require("./routes/customTool.routes"),
  require("./routes/login.routes"),
  require("./routes/combo.routes"),
  require("./routes/pulling.routes"),
  require("./routes/pullingDesign.routes"),
  require("./routes/test.routes"),
];

module.exports = function router(app) {
  try {
    return (
      routes &&
      routes.forEach((route) => {
        route(
          app,
          verificaToken,
          verifyRole,
          verificaTokenClient,
          verifyRoleClient
        );
      })
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
