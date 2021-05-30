const jwt = require("jsonwebtoken");
const config = require("../config");

const validationToken = async (request, reply, done) => {
  try {
    const { authorization } = request.headers;
    console.log("authorization =>", authorization);
    if (!authorization) {
      throw Error("Missing authorization in headers");
    }

    const token = authorization.split(" ")[1];
    await jwt.verify(token, config.secretKey);
  } catch (error) {
    reply.statusCode = 401
    throw error
  }
};

module.exports = {
  validationToken,
};
