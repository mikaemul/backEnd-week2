'use strict';
const { validationResult } = require('express-validator');
const catModel = require('../models/catModel');

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  await res.json(cats);
};

const cat_get = async (req, res) => {
  const cat = await catModel.getCat(req.params.id);
  await res.json(cat[0]);
};
const cat_create_post = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }else {
    const params = [
      req.body.name,
      req.body.age,
      req.body.weight,
      req.body.owner,
      req.file.filename,
    ];
    const result = await catModel.addCat(params);
    await res.json(result);
  }
};
const cat_update_put = async (req, res) => {
  const params = [
    req.body.name,
    req.body.age,
    req.body.weight,
    req.body.owner,
    req.body.id,
  ];
  const result = await catModel.updateCat(params);
  await res.json(result);
};
const cat_delete = async (req, res) => {
  const params = [
    req.params.id,
  ];
  const result = await catModel.deleteCat(params);
  await res.json(result);
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_create_post,
  cat_update_put,
  cat_delete,
};
