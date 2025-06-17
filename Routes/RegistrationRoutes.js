const express = require("express");
const RegistrationController = require("./../Controllers/RegistrationController");

const RegistrationRouter = express.Router();
//Middleware
//
RegistrationRouter.route("/")
  .get(RegistrationController.getAllAccounts)
  .get(RegistrationController.getRegistrationbyUsername)
  .post(RegistrationController.createNewRegistration);
RegistrationRouter.route("/:Username").get(
  RegistrationController.getRegistrationbyUsername
);
module.exports = RegistrationRouter;
