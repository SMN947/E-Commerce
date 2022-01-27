'use strict';
var dbConn = require('./dbSetup');
//Product object create
var Product = function (product) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.description = product.description;
    this.category = product.category;
    this.image = product.image;
    this.rating_rate = product.rating_rate;
    this.rating_count = product.rating_count
};
Product.create = function (newProduct, result) {
    dbConn.query("INSERT INTO EcommerceData set ?", newProduct, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Product.findById = function (id, result) {
    dbConn.query("Select * from EcommerceData where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Product.findAll = function (result) {
    dbConn.query("Select * from EcommerceData", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('products : ', res);
            result(null, res);
        }
    });
};
Product.update = function (id, product, result) {
    dbConn.query("UPDATE EcommerceData SET title=?,price=?,description=?,category=?,image=?,rating_rate=?,rating_count=? WHERE id = ?", [product.title, product.price, product.description, product.category, product.image, product.rating_rate, product.rating_count, product.id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Product.delete = function (id, result) {
    dbConn.query("DELETE FROM EcommerceData WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Product;