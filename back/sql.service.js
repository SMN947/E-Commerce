'use strict';
const Product = require('./product.model');
exports.findAll = (req, res) => {
  Product.findAll(function (err, product) {
    if (err)
      res.send(err);
    res.send(product);
  });
};
exports.create = function (req, res) {
  
  console.log(req)
  const new_product = new Product(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Product.create(new_product, function (err, product) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "Product added successfully!", data: product });
    });
  }
};
exports.findById = function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};
exports.update = function (req, res) {
  console.log(req.body)
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Product.update(req.params.id, new Product(req.body), function (err, product) {
      if (err)
        res.send(err);
      res.json({ error: false, message: 'Product successfully updated' });
    });
  }
};
exports.delete = function (req, res) {
  Product.delete(req.params.id, function (err, product) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Product successfully deleted' });
  });
};