const mysql = require('mysql');

module.exports = class MySQLService {

    Connection;

    constructor() {
        this.initialize();
    }

    initialize() {
        try {
            this.Connection = mysql.createConnection({
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                host: process.env.MYSQL_HOST,
                database: process.env.MYSQL_DATABASE
            });

            this.Connection.connect();
        } catch (error) {
            throw error;
        }
    }

    save(entityName, parameters) {
        return new Promise((resolve, reject) => {
            const parametersKeys = Object.keys(parameters);
            const parametersValues = Object.values(parameters);

            let queryParametersRef = [];
            for (let i = 0; i < parametersKeys.length; i++) { queryParametersRef.push('?') };

            const query = `INSERT INTO ${entityName}(${parametersKeys.join(', ')}) VALUES (${queryParametersRef.join(', ')});`;

            this.Connection.query(query, [...parametersValues], (err, result, _) => {
                if (err) reject(err);

                resolve(
                    result
                );
            });
        });
    }

    update(entityName, entityIdObject, parameters) {
        return new Promise((resolve, reject) => {
            const entityIdKey = Object.keys(entityIdObject)[0];
            const entityIdValue = Object.values(entityIdObject)[0];

            const parametersKeys = Object.keys(parameters);
            const parametersValues = Object.values(parameters);

            let keysSetQuery = '';
            let queryParametersRef = [];

            for (let i = 0; i < parametersKeys.length; i++) { 
                queryParametersRef.push('?');

                if (i == parametersKeys.length-1) {
                    keysSetQuery += `${parametersKeys[i]} = ? `
                }else{
                    keysSetQuery += `${parametersKeys[i]} = ?, `
                }
            };

            const query = `UPDATE ${entityName} SET ${keysSetQuery} WHERE ${entityIdKey} = ?;`;

            this.Connection.query(query, [...parametersValues, entityIdValue], (err, result, _) => {
                if (err) reject(err);

                resolve(
                    result
                );
            });
        });
    }

    query(sqlString, params) {
        return new Promise((resolve, reject) => {
            this.Connection.query(sqlString, params, (err, result, _) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    queryWithPagination(sqlString, params = [], page = 1, pageSize = 10) {
        return new Promise((resolve, reject) => {
            const pagination = [((+page - 1) * +pageSize), (+page * +pageSize)];
            if (params) {
                params?.push(...pagination);
                sqlString += ' LIMIT ?, ?';
            }

            this.Connection.query(sqlString, params, (err, result, _) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}