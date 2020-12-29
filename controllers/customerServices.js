const CustomerServices = require('../models/customerServices')

module.exports = app => {
    app.post('/customer-services', (req, res) => {
        const customerService = req.body
        CustomerServices.create(customerService, res);
    })
    app.get('/customer-services', (req, res) => {
        CustomerServices.read(res);
    })
    app.get('/customer-services/:id', (req, res) => {
        const id = parseInt(req.params.id)
        CustomerServices.searchId(id, res)
    })
    app.patch('/customer-services/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        CustomerServices.update(id, values, res)
    })
    app.delete('/customer-services/:id', (req, res) => {
        const id = parseInt(req.params.id)
        CustomerServices.delete(id, res)
    })
}
