const moment = require('moment')
const connection = require('../infrastructure/connection')

class CustomerServices {

    create(customerService, res) {
        // CREATING AND FORMATTING DATES
        const dateCreatedAt = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(customerService.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        // VALIDATIONS
        const dateIsValid = moment(date).isSameOrAfter(dateCreatedAt)
        const clientIsValid = customerService.client.length >= 5
        const validations = [
            {
                name: 'date',
                valid: dateIsValid,
                message: 'Date must be greater than or equal to the current date'
            },
            {
                name: 'client',
                valid: clientIsValid,
                message: 'Client must have at least five characters'
            }
        ]

        // HANDLING ERRORS
        const errors = validations.filter(field => !field.valid)
        const errorsExists = errors.length
        if(errorsExists) {
            res.status(400).json(errors)
        } else {
            const serviceWithDate = {...customerService, dateCreatedAt, date}

            const sql = `INSERT INTO customerServices SET ?`

            connection.query(sql, serviceWithDate, (error, results) => {
                if(error)
                    res.status(400).json(error)
                else
                    res.status(201).json(customerService)
            })
        }

    }

    read(res) {
        const sql = `SELECT * FROM customerservices`

        connection.query(sql, (error, results) => {
            if(error)
                res.status(400).json(error)
            else
                res.status(200).json(results)
        })
    }

    update(id, values, res) {
        if(values.date)
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const sql = `UPDATE customerservices SET ? WHERE id=?`

        connection.query(sql, [values, id], (error, results) => {
            if(error)
                res.status(400).json(error)
            else
                res.status(200).json({...values, id})
        })
    }

    delete(id, res) {
        const sql = `DELETE FROM customerservices WHERE id=${id}`

        connection.query(sql, id, (error, results) => {
            if(error)
                res.status(400).json(error)
            else
                res.status(200).json({id})
        })
    }

    searchId(id, res) {
        const sql = `SELECT * FROM customerservices WHERE id=${id}`

        connection.query(sql, (error, results) => {
            const service = results[0]

            if(error)
                res.status(400).json(error)
            else
                res.status(200).json(service)
        })
    }
}

module.exports = new CustomerServices;