'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

const table = 'reminder'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM reminder'
        db.query(sql, (err, response) => {
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
        let reminderId = req.params.reminderId;
        let sql = 'UPDATE reminder SET ? WHERE id = ?'
        db.query(sql, [data, reminderId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO reminder values ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM reminder WHERE id = ?'
        db.query(sql, [req.params.reminderId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    }
}