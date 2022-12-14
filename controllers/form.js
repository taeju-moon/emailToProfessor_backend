const Form = require("../models/form");
const { Category } = require("../models/category");

const getForms = (req, res) => {
  Form.find()
    .then((forms) =>
      res.status(200).json({ status: "success", data: { forms } })
    )
    .catch((error) => res.status(400).json({ status: "fail", error }));
};

const getForm = (req, res) => {
  Form.findById(req.params.id)
    .then((form) => res.status(200).json({ status: "success", data: { form } }))
    .catch((error) => res.status(400).json({ status: "failure", error }));
};

const createForm = async (req, res) => {
  const form = new Form(req.body);
  form.category = await Category.findOne({ name: req.body.category });
  form
    .save()
    .then((result) =>
      res.status(200).json({ status: "success", data: { result } })
    )
    .catch((error) => res.status(400).json({ status: "fail", error }));
};

const updateForm = (req, res) => {
  Form.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.status(200).json({ status: "success", data }))
    .catch((error) => res.status(400).json({ status: "fail", error }));
};

const deleteForm = (req, res) => {
  Form.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json({ status: "success", message: "deleted" }))
    .catch((error) => res.status(400).json({ status: "fail", error }));
};

module.exports = { getForms, getForm, createForm, updateForm, deleteForm };
