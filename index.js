const mongoose = require("mongoose");
const buildApp = require("./src/app");
const config = require("./src/config");

const startApp = async () => {
  try {
    const appOptions = {
      logger: true,
    };
    const app = buildApp(appOptions);
    await app.listen(config.port, config.hostname);
    console.log(`app is listening on port ${config.port}`);
    await mongoose.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("mongoConnect");
  } catch (error) {
    console.log(error);
  }
};

startApp();
