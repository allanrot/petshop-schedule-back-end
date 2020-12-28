class Tables {
    init(connection) {
        this.connection = connection
        this.createCustomerServices()
    }

    createCustomerServices() {
        const sql =
            'CREATE TABLE IF NOT EXISTS customerServices (id int NOT NULL AUTO_INCREMENT,' +
            'client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL,' +
            'date datetime NOT NULL, dateCreatedAt datetime NOT NULL,' +
            'status varchar(20) NOT NULL, comments text, ' +
            'PRIMARY KEY(id))'
        this.connection.query(sql, (error) => {
            if(error)
                console.log(error)
            else
                console.log('[SQL]Create table customerService query executed with success')
        })
    }
}

module.exports = new Tables