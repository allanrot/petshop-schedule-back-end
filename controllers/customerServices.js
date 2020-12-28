const CustomerServices = require('../models/customerServices')

module.exports = app => {
    app.get('/customer-services', (req, res) =>
        res.send('You are in Customer Services'))
    app.post('/customer-services', (req, res) => {
        const customerService = req.body
        CustomerServices.create(customerService, res);
    })
}
