const controller = require("./controllers");
const hooks = require("./hooks");
const usersRoutes = (app) => {
  try {
    app.get(
      "/users",
      { preHandler: [hooks.auth.validationToken] },
      controller.users.getUsers
    );
    app.get("/users/:userId", controller.users.getUserById);
    app.post("/users", controller.users.postUser);
    app.patch("/users", controller.users.patchUser);
    app.delete("/users", controller.users.deleteUser);

    app.post("/login", controller.users.postUserLogin);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  usersRoutes,
};
