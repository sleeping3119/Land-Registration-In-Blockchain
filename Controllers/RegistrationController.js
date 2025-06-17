const fs = require("fs");
const path = require("path");
const Registrations = JSON.parse(
  fs.readFileSync(`${__dirname}/../RegistrationData.json`)
);
exports.getAllAccounts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: Registrations.length,
    data: {
      Registrations,
    },
  });
};
exports.getRegistrationbyUsername = (req, res) => {
  const Username = req.params.Username;
  const UserType = req.params.UserType;
  const Account = Registrations.find(
    (el) => el.UserType === UserType && el.username === Username
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
exports.createNewRegistration = (req, res) => {
  const newId = Registrations.length + 1;
  const newRegistration = Object.assign({ id: newId }, req.body);
  Registrations.push(newRegistration);

  fs.writeFile(
    path.join(__dirname, "../RegistrationData.json"),
    JSON.stringify(Registrations, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to write to file",
        });
      }

      res.status(201).json({
        status: "success",
        data: {
          newRegistration,
        },
      });
    }
  );
};
