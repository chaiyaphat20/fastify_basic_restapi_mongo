const controller = require('./controllers')
const usersRoutes = (app) => {
  try {
    app.get("/users",controller.users.getUsers);
    app.get("/users/:userId",controller.users.getUserById);
    app.post("/users",controller.users.postUser);
    app.patch("/users",controller.users.patchUser);
    app.delete("/users",controller.users.deleteUser);
  } catch (error) {}
};

module.exports = {
  usersRoutes,
};
