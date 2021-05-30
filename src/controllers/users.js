const userModel = require("../models/Users/Users");

const getUsers = async (request, reply) => {
  console.log("getUsers");
  const users = await userModel.getUsers();
  reply.send(users);
};
const getUserById = async (request, reply) => {
  const { userId } = request.params;
  const user = await userModel.getUserById(userId);
  reply.send(user);
};

const postUser = async (request, reply) => {
  const { body } = request;
  const user = await userModel.createNewUser(body);
  reply.send(user);
};

const patchUser = async (request, reply) => {
  const { userId, name, surname } = request.body;
  const updatedUser = await userModel.updateUserById(userId, { name, surname });
  reply.send(updatedUser);
};

const deleteUser = async (request, reply) => {
  const { userId } = request.body;
  console.log({ userId });
  const result = await userModel.deleteUser(userId);
  reply.send(result);
};

const postUserLogin = async (request, reply) => {
  console.log("login");
  const { username, password } = request.body;
  const userToken = await userModel.loginUser(username, password);
  return userToken;
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser,
  postUserLogin,
};
