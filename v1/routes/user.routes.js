const express = require("express");
const userController = require("../../controllers/user.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/user")
    .get(verificaToken, verifyRole([0, 1, 2]), userController.getUsers)
    .post(verificaToken, verifyRole([0]), userController.addUser);

  router
    .route("/user/:idUser")
    .put(verificaToken, verifyRole([0]), userController.editUser)
    .delete(verificaToken, verifyRole([0]), userController.deleteUser);

  app.use(process.env.URI_API, router);
};
