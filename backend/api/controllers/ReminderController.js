'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

const table = 'reminder'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM reminder where user_id = ?'
        db.query(sql, [req.params.userId], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM reminder WHERE id = ?'
        db.query(sql, [req.params.reminderId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let account_number = req.params.account_number;
        let sql = 'UPDATE reminder SET ? WHERE account_number = ?'
        db.query(sql, [data, account_number], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO reminder set ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM reminder WHERE account_number = ?'
        db.query(sql, [req.params.account_number], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    }
}