const mongoose = require("mongoose");
const CONFIG = require("../config/environment");

mongoose
  .connect(`${CONFIG.db}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Could not connect to DB");
    console.error(error);
    process.exit(1);
  });
