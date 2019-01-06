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
        .get(userController.loginRequired, staffController.get)
        .post(userController.loginRequired, staffController.store);

    app.route('/staff/:staffId')
        .get(userController.loginRequired, staffController.detail)
        .put(userController.loginRequired, staffController.update)
        .delete(userController.loginRequired, staffController.delete);


    app.route('/account')
        .get(userController.loginRequired, accountController.get)
        .post(userController.loginRequired, accountController.store);

    app.route('/account/:accountId')
        .get(userController.loginRequired, accountController.detail) //get by user_id
        .put(userController.loginRequired, accountController.update)
        .delete(userController.loginRequired, accountController.delete)

    app.route('/account_number/:account_number')
        .get(userController.loginRequired, accountController.getByAccountNumber);

    app.route('/reminder')
        .get(userController.loginRequired, reminderController.get)
        .post(userController.loginRequired, reminderController.store);

    app.route('/reminder/:userId')
        .get(userController.loginRequired, reminderController.get);

    app.route('/reminder/:reminderId')
        .put(userController.loginRequired, reminderController.update)
        .delete(userController.loginRequired, reminderController.delete);


    app.route('/transaction')
        .get(userController.loginRequired, transactionController.get)
        .post(userController.loginRequired, transactionController.store);

    app.route('/transaction/:transactionId')
        .get(userController.loginRequired, transactionController.get_history)
        .put(userController.loginRequired, transactionController.update)
        .delete(userController.loginRequired, transactionController.delete);



    app.route('/user')
        .get(userController.loginRequired, userController.get)
        .post(userController.store);


    app.route('/user/:userId')
        .get(userController.loginRequired, userController.detail)
        .put(userController.loginRequired, userController.update)
        .delete(userController.loginRequired, userController.delete);

    app.route('/otp').post(userController.loginRequired, OTPController.post);
    app.route('/confirm/:otp').post(userController.loginRequired, OTPController.confirm);
}