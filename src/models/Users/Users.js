const bcrypt = require("bcrypt");
const Users = require("./schema");

const generatePassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
};
const createNewUser = async (docs = {}) => {
  const insertDoc = { ...docs };
  insertDoc.password = await generatePassword(docs.password);
  const newUser = new Users(insertDoc);
  return await newUser.save();
};

const getUsers = async (password) => {
  const result = await Users.find();
  return result;
};

const getUserById = async (id) => {
  const result = await Users.find({ _id: id });
  return result;
};
const updateUserById = async (userId, doc) => {
  const updatedUser = await Users.updateOne(
    {
      _id: userId,
    },
    doc, //ค่าที่จะอัพเดต
    {
      returnOriginal: false, //ให้รีเทินค่าที่อัพเดตออกไป
    }
  );
  return updatedUser;
};
const deleteUser = async (userId) => {
  const result = await Users.deleteOne({_id:userId});
  return result;
};

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUser,
};
