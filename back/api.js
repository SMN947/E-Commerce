const fs = require('fs');
const sqlService = require("./sql.service")

module.exports = (router) => {
  router.get('/', sqlService.findAll);
  // Create a new product
  router.post('/', sqlService.create);
  // Retrieve a single product with id
  router.get('/:id', sqlService.findById);
  // Update a product with id
  router.put('/:id', sqlService.update);
  // Delete a product with id
  router.delete('/:id', sqlService.delete);

};  