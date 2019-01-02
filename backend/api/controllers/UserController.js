'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const SECRET = "JWT secret key ahihii"

var refreshTokens = {};

const table = 'user'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM user'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM user WHERE id = ?'
        db.query(sql, [req.params.userId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let userId = req.params.userId;
        let sql = 'UPDATE user SET ? WHERE id = ?'
        db.query(sql, [data, userId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO user set ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM user WHERE id = ?'
        db.query(sql, [req.params.userId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    },
    login: (req, res) => {
        console.log(req.body);
        let username = req.body.username;
        let password = req.body.password;
        db.query('SELECT * from user where username = "' + username + '"', (err, response) => {
            if (response) {
                if (response.length > 0) {
                    if (response[0].password == password) {
                        let user = { email: response[0].email, username: response[0].username, id: response[0].id };
                        let token = jwt.sign(user, SECRET, { expiresIn: 1000 });
                        var refreshToken = randtoken.uid(256);
                        let temp = { access_token: token, refresh_token: refreshToken };
                        db.query('UPDATE user SET ? where id = ?', [temp, response[0].id]);
                        refreshTokens[refreshToken] = username;
                        return res.json({ token: 'JWT ' + token, refresh_token: refreshToken, user: user });
                    } else {
                        return res.json("Wrong username or password!");
                    }
                }
                else {
                    return res.json("Wrong username or password!");
                }
            }
            else {
                res.json("Wrong username or password!");
            }
        });
    },

    token: (req, res) => {
        var username = req.body.username
        var refreshToken = req.body.refreshToken
        if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
            db.query('SELECT * from user where username = "' + username + '"', (err, response) => {
                if (response) {
                    let user = { email: response[0].email, username: response[0].username, id: response[0].id };
                    let token = jwt.sign(user, SECRET, { expiresIn: 1000 });
                    let temp = { access_token: token, refresh_token: refreshToken };
                    db.query('UPDATE user SET ? where id = ?', [temp, response[0].id]);
                    return res.json({ token: 'JWT ' + token });
                }
                else {
                    return res.json("Something went wrong");
                }
            })
        }
        else {
            return res.status(401).json({ message: 'Unauthorized user!' })
        }
    },

    loginRequired: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized user!' });
        }
    }
}