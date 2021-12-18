require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  const uri = env.MONGODB_URI;
  // * mongoDB connect *
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useMongoClient: true,
    })
    .then(() => console.log(`mongoDB connected`))
    .catch(err => console.error(`failed connection cause ${err}`));
};
