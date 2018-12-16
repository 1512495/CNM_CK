'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

const table = 'transaction'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM transaction'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM transaction WHERE id = ?'
        db.query(sql, [req.params.transactionId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let transactionId = req.params.transactionId;
        let sql = 'UPDATE transaction SET ? WHERE id = ?'
        db.query(sql, [data, transactionId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO transaction set ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM transaction WHERE id = ?'
        db.query(sql, [req.params.transactionId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    }
}