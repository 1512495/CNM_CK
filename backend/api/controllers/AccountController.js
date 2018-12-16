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
        let sql = 'SELECT * FROM account WHERE id = ?'
        db.query(sql, [req.params.accountId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let accountId = req.params.accountId;
        let sql = 'UPDATE account SET ? WHERE id = ?'
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
        let sql = 'DELETE FROM account WHERE id = ?'
        db.query(sql, [req.params.accountId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    }
}