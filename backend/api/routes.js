'use strict';
module.exports = function(app) {
    var staffController = require('./controllers/StaffController');
    var userController = require('./controllers/UserController');
    var accountController = require('./controllers/AccountController');
    var reminderController = require('./controllers/ReminderController');
    var transactionController = require('./controllers/TransactionController');


    // todoList Routes
    app.route('/staff')
        .get(staffController.get)
        .post(staffController.store);


    app.route('/staff/:staffId')
        .get(staffController.detail)
        .put(staffController.update)
        .delete(staffController.delete);
};