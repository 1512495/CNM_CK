'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

const table = 'account'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM account'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM account WHERE user_id = ? and (is_deleted <> 1 or is_deleted is null)'
        db.query(sql, [req.params.accountId], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    update: (req, res) => {
        let data = req.body;
        let accountId = req.params.accountId;
        let sql = 'UPDATE account SET ? WHERE account_number = ?'
        db.query(sql, [data, accountId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO account set ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'UPDATE account SET is_deleted = 1 WHERE account_number = ?'
        db.query(sql, [req.params.accountId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    },
    getByAccountNumber: (req, res) => {
        let sql = 'SELECT DISTINCT name, user_id, email, balance FROM account JOIN user WHERE account_number = ? AND user_id = user.id'
        db.query(sql, [req.params.account_number], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    }
}