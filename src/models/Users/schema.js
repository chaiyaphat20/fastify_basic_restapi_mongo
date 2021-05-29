const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
},{
  timestamp:true,
  versionKey:false,
  collection:"users"
});


module.exports = mongoose.model("Users",userSchema,)