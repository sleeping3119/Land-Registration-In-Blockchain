const fs = require("fs");
const Listings = JSON.parse(
  fs.readFileSync(`${__dirname}/../listingData.json`)
);
//Middleware functions
exports.checkID = (req, res, next, val) => {
  console.log(`TourId is: ${val}`);
  const id = req.params.id * 1;
  if (id > Listings.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID provided",
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  next();
};
//
exports.getAllListings = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: Listings.length,
    data: {
      Listings,
    },
  });
};
exports.getBoughtListingbyUsername = (req, res) => {
  console.log(req.params);
  const Username = req.params.Username;
  const PropertyStatus = req.params.PropertyStatus;
  const Listing = Listings.find(
    (el) => el.username === Username && el.status === PropertyStatus
  );
  if (!Account)
    return res.status(404).json({
      status: "fail",
      message: `No listings found for ${Username}`,
    });
  res.status(200).json({
    status: "success",
    data: {
      Account,
    },
  });
};
exports.getListingsbySearchQuery = (req, res) => {
  const { query } = req.query;
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide a search query.",
    });
  }

  const filteredListings = Listings.filter((listing) =>
    listing.location.toLowerCase().includes(cleanQuery.toLowerCase())
  );

  if (filteredListings.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: `No listings found for ${cleanQuery}`,
    });
  }

  res.status(200).json({
    status: "success",
    data: filteredListings,
  });
};
exports.createNewListing = (req, res) => {
  //console.log(req.body);
  const newId = [Listings.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  Listings.push(newTour);
  fs.writeFile(`${__dirname}/../listingData.json`, JSON.stringify(), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
};

exports.UpdateListing = (req, res) => {
  const jsonObject = req.body;
  const firstKey = Object.keys(jsonObject)[0];
  const firstValue = jsonObject[firstKey];
  console.log(req.params.id);
  const id = req.params.id * 1;

  Listings[id][firstKey] = firstValue;

  const newTour = Listings[id];
  fs.writeFile(
    `${__dirname}/../listingData.json`,
    JSON.stringify(Listings),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.DeleteListing = (req, res) => {
  const id = req.params.id * 1;
  const deletedListing = Listings.splice(id, 1)[0];

  fs.writeFile(
    `${__dirname}/../listingData.json`,
    JSON.stringify(Listings),
    (err) => {
      res.status(204).json({
        status: "success",
        data: deletedListing,
      });
    }
  );
};
