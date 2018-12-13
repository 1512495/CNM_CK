'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

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
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO staff SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM staff WHERE id = ?'
        db.query(sql, [req.params.staffId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}