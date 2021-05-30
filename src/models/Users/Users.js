const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient(); //default localhost
redisClient.on("error", (error) => {
  console.error("redis error ->", error);
});
const redisGetAsync = promisify(redisClient.get).bind(redisClient)

const config = require("../../config");
const Users = require("./schema");

const generatePassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
};

const comparePassword = async (password, existsPassword) => {
  const isPasswordCorrect = bcrypt.compareSync(password, existsPassword);
  if (!isPasswordCorrect) {
    throw new Error("password incorrect!");
  }
  return true;
};

const createNewUser = async (docs = {}) => {
  const insertDoc = { ...docs };
  insertDoc.password = await generatePassword(docs.password);
  const newUser = new Users(insertDoc);
  return await newUser.save();
};

const getUsers = async (password) => {
  const redisCacheKey = `getUsers`;
  // const getUserInCache = await redisClient.get(redisCacheKey);
  const getUserInCache = await redisGetAsync(redisCacheKey);
  if (getUserInCache) {
    console.log("getUserInCache ->", getUserInCache);
    return JSON.parse(getUserInCache);
  }
  const result = await Users.find();

  //cache into Redis by 600 second or 10 minutes
  redisClient.setex(redisCacheKey, 60 * 10, JSON.stringify(result));
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
  const result = await Users.deleteOne({ _id: userId });
  return result;
};

const loginUser = async (username, password) => {
  const user = await Users.findOne({
    username,
  });
  if (!user) {
    throw new Error("Unauthorized");
  }
  await comparePassword(password, user.password);

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    config.secretKey,
    { expiresIn: 60 * 1000 }
  );

  return token;
};

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUser,
  loginUser,
};
