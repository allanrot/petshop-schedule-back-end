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

            const sql = 'INSERT INTO customerServices SET ?'

            connection.query(sql, serviceWithDate, (error, result) => {
                if(error)
                    res.status(400).json(error)
                else
                    res.status(201).json(result)
            })
        }

    }

    read() {

    }

    update() {

    }

    delete() {

    }
}

module.exports = new CustomerServices;