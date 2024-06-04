const { HealthRouter } = require("./health.route");
const { TodoRouter } = require("./todo.route");

const _routes = [
  ["/health", HealthRouter],
  ["/todo", TodoRouter],
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};

module.exports = routes;
