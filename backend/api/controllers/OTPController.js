'use strict'
var moment = require('moment');
var nodemailer = require('nodemailer');

var aliveOTP = [];

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mrkettr10',
        pass: 'tan123456'
    },
    tls: { rejectUnauthorized: false },
});

module.exports = {
    post: (req, res) => {
        let data = req.body;
        let current = Math.floor(100000 + Math.random() * 900000);
        aliveOTP.push(current);
        var mailOptions = {
            from: 'Hệ thống ngân hàng CNM_CK',
            to: (data.email != '') ? data.email : "xuantan97@gmail.com",
            subject: 'Email xác nhận chuyển tiền từ CNM_CK!',
            text: 'This is auto OTP email for banking: ' + current,
            html: '<div>Xin chào, <strong>' + data.name + '</strong>,<br>Bạn vừa thực hiện chuyển tiền với số tiền: <b>' + data.amount + '</b> đến tài khoản: ' + data.to_account + '<br>Mã xác thực OTP của bạn là: <b>' + current + '</b><br>Mã này sẽ có hiệu lực trong 15 phút, sau khoảng thời gian đó vui lòng thực hiện lại giao dịch!<br>Xin cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</div> '
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.json('Email sent: ' + info.response);
            }
        });
    },
    confirm: (req, res) => {
        let OTP = req.params.otp;
        for (let i = 0; i < aliveOTP.length; i++) {
            if (OTP == aliveOTP[i]) {
                aliveOTP.splice(i, 1);
                res.json({ status: 'ok' });
                return;
            }
        }
        res.json({ status: 'wrong otp' });
        return;
    }
}