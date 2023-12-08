const MySqlConnector = require('./Conn.js');

const dotenv = require('dotenv');

dotenv.config({path: '.env.local'});


class ConnFactory {
    getDbConnector() {
        switch(process.env.__CONFIG_SGBG__) {
            case 'mysql':
                return new MySqlConnector();
            case 'oracle':
                return new OracleConnector();
            default:
                return new MySqlConnector();
    }
}

