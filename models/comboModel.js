const db = require('../config/db');

const combo = {
    create: (combo, callback) => {
        const query = 'INSERT INTO combos (nome, descricao, preco, quantidade, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [combo.nome, combo.descricao, combo.preco, combo.quantidade, combo.categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT combos.*, categorias.nome AS categoria_nome FROM combos JOIN categorias ON combos.categoria = categorias.id WHERE combos.id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, combo, callback) => {
        const query = 'UPDATE combos SET nome = ?, preco = ?, descricao = ?, quantidade = ?, categoria = ? WHERE id = ?';
        db.query(query, [combo.nome, combo.preco, combo.descricao, combo.quantidade, combo.categoria, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM combos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (categoria, callback) => {
        let query = 'SELECT combos.id, combos.nome, combos.descricao, combos.preco, combos.quantidade, categorias.nome AS categoria_nome FROM combos JOIN categorias ON combos.categoria = categorias.id';
        
        if (categoria) {
            query += ' WHERE combos.categoria = ?';
        }
    
        db.query(query, [categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    
};

module.exports = combo;