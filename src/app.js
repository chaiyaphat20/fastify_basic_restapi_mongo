const Fastify = require("fastify");
const routers = require('./routes')

const buildApp =  (options = {}) => {
  const app = Fastify(options);
  routers.usersRoutes(app)
  return app;
};

module.exports = buildApp;
