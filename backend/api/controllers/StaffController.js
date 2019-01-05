'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const SECRET = "JWT secret key ahihii";

var refreshTokens = {};

const table = 'staff'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM staff'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM staff WHERE id = ?'
        db.query(sql, [req.params.staffId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let staffId = req.params.staffId;
        let sql = 'UPDATE staff SET ? WHERE id = ?'
        db.query(sql, [data, staffId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO staff set ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM staff WHERE id = ?'
        db.query(sql, [req.params.staffId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    },
    login: (req, res) => {
        console.log(req.body);
        let username = req.body.username;
        let password = req.body.password;
        db.query('SELECT * from staff where username = "' + username + '"', (err, response) => {
            if (response) {
                if (response.length > 0) {
                    if (response[0].password == password) {
                        let staff = { email: response[0].email, username: response[0].username, name: response[0].name, id: response[0].id };
                        let token = jwt.sign(staff, SECRET, { expiresIn: 1000 });
                        var refreshToken = randtoken.uid(256);
                        let temp = { access_token: token, refresh_token: refreshToken };
                        db.query('UPDATE staff SET ? where id = ?', [temp, response[0].id]);
                        refreshTokens[refreshToken] = username;
                        return res.json({ token: 'JWT ' + token, refresh_token: refreshToken, staff: staff });
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
}