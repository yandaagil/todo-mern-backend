const { Router } = require("express");

const HealthRouter = Router();

HealthRouter.get("/", (req, res, next) => {
  console.log("Health check success");
  res.status(200).send({ status: "200", message: "Server is running" });
});

module.exports = { HealthRouter };
