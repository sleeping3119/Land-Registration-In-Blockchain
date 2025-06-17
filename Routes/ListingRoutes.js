const express = require("express");
const LController = require("../Controllers/ListingController");

const LRouter = express.Router();
//Middleware
LRouter.param("id", LController.checkID);
//
LRouter.route("/")
  .get(LController.getAllListings)
  //MiddlewareChaining - chaining multiple middleware functions
  .post(LController.checkBody, LController.createNewListing); //first check body runs then if no error is returned then create new tour
//
LRouter.route("/search").get(LController.getListingsbySearchQuery);

LRouter.route("/:Username")
  .get(LController.getBoughtListingbyUsername)
  .patch(LController.UpdateListing)
  .delete(LController.DeleteListing);

module.exports = LRouter;
