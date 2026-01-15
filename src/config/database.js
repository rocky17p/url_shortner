const mongoose = require("mongoose");
async function connectMongodb(url) {
  return mongoose.connect(url).then(() => console.log("mongodb connected"));
}
module.exports = {
  connectMongodb,
};
