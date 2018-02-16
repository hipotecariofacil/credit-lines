import pool from '../services/pool';

const executeQuery = (sql, data = [] ) => {
    return new Promise((resolve, reject)=> {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            };
            connection.query(sql, data, (err, rows) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)))
            });
        });
    });
}

export default {executeQuery};