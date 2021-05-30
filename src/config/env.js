require('dotenv').config()
const config = {
  nodeENV: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  hostname: process.env.HOSTNAME || "localhost",
  mongodb:{
    uri:process.env.MONGOURL || 'mongodb://localhost/basic101'
  },
  secretKey : process.env.SECRET_KEY
};

module.exports = config;