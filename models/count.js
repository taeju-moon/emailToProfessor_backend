const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
  copiedTime: {
    type: Number,
  },
  accessTime: {
    type: Number,
  },
});

const Count = mongoose.model("Count", countSchema);
module.exports = Count;
