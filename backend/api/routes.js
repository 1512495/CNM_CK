'use strict';
module.exports = function(app) {
  var staffController = require('./controllers/StaffController')

  // todoList Routes
  app.route('/staff')
    .get(staffController.get)
    .post(staffController.store);


  app.route('/staff/:staffId')
    .get(staffController.detail)
    .put(staffController.update)
    .delete(staffController.delete);
};
