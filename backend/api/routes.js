'use strict';
module.exports = function (app) {
    var staffController = require('./controllers/StaffController');
    var userController = require('./controllers/UserController');
    var accountController = require('./controllers/AccountController');
    var reminderController = require('./controllers/ReminderController');
    var transactionController = require('./controllers/TransactionController');
    var OTPController = require('./controllers/OTPController');


    app.route('/user/login')
        .post(userController.login);
    app.route('/staff/login')
        .post(staffController.login);

    app.route('/token')
        .post(userController.token);

    // todoList Routes
    app.route('/staff')
        .get(staffController.get)
        .post(staffController.store);

    app.route('/staff/:staffId')
        .get(staffController.detail)
        .put(staffController.update)
        .delete(staffController.delete);


    app.route('/account')
        .get(accountController.get)
        .post(accountController.store);

    app.route('/account/:accountId')
        .get(accountController.detail) //get by user_id
        .put(accountController.update)
        .delete(accountController.delete)

    app.route('/account_number/:account_number')
        .get(accountController.getByAccountNumber);

    app.route('/reminder')
        .get(reminderController.get)
        .post(reminderController.store);

    app.route('/reminder/:userId')
        .get(reminderController.get);

    app.route('/reminder/:reminderId')
        .put(reminderController.update)
        .delete(reminderController.delete);


    app.route('/transaction')
        .get(transactionController.get)
        .post(transactionController.store);

    app.route('/transaction/:transactionId')
        .get(transactionController.get_history)
        .put(transactionController.update)
        .delete(transactionController.delete);



    app.route('/user')
        .get(userController.loginRequired, userController.get)
        .post(userController.store);


    app.route('/user/:userId')
        .get(userController.detail)
        .put(userController.update)
        .delete(userController.delete);

    app.route('/otp').post(OTPController.post);
    app.route('/confirm/:otp').post(OTPController.confirm);
}