const Count = require("../models/count");

const createCount = (req, res) => {
  const count = new Count({ copiedTime: 0, accessTime: 0 });
  count
    .save()
    .then(() => res.status(200).json({ status: "success" }))
    .catch((error) => res.status(400).json({ error }));
};

const getCount = (req, res) => {
  Count.findById("6320209d65eeee03483e7c64")
    .then((data) => res.status(200).json({ status: "success", data }))
    .catch((error) => res.status(400).json({ error }));
};

const addAccessTime = async (req, res) => {
  try {
    const count = await Count.findById("6320209d65eeee03483e7c64");
    count.accessTime++;
    count.save();
    res.status(200).json({ status: "success", data: count });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addCopiedTime = async (req, res) => {
  try {
    const count = await Count.findById("6320209d65eeee03483e7c64");
    count.copiedTime++;
    count.save();
    res.status(200).json({ status: "success", data: count });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { createCount, getCount, addAccessTime, addCopiedTime };
