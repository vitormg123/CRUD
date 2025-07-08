const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (data, valor, quantidade, produto_id) VALUES (?, ?, ?, ?)';
        const values = [venda.data, venda.valor, venda.quantidade, venda.produto_id];
        db.query(query, values, (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM vendas';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    update: (id, venda, callback) => {
        const query = 'UPDATE vendas SET data = ?, valor = ?, quantidade = ?, produto_id = ? WHERE id = ?';
        const values = [venda.data, venda.valor, venda.quantidade, venda.produto_id, id];
        db.query(query, values, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Venda;
