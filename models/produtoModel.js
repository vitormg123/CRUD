const db = require('../config/db'); // ajuste o caminho conforme seu projeto

const Produto = {
    getAll: (categoria, callback) => {
        let query = `
            SELECT produtos.id, produtos.nome, produtos.descricao, produtos.preco,
                   produtos.quantidade, categorias.nome AS categoria_nome
            FROM produtos
            JOIN categorias ON produtos.categoria = categorias.id
        `;
        if (categoria) {
            query += ' WHERE produtos.categoria = ?';
            db.query(query, [categoria], callback);
        } else {
            db.query(query, callback);
        }
    },

    getNovidades: (callback) => {
        const query = `
            SELECT produtos.id, produtos.nome, produtos.descricao, produtos.preco,
                   produtos.quantidade, categorias.nome AS categoria_nome
            FROM produtos
            JOIN categorias ON produtos.categoria = categorias.id
            WHERE produtos.created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)
            ORDER BY produtos.created_at DESC
        `;
        db.query(query, callback);
    },

    findById: (id, callback) => {
        const query = `
            SELECT produtos.id, produtos.nome, produtos.descricao, produtos.preco,
                   produtos.quantidade, categorias.nome AS categoria_nome
            FROM produtos
            JOIN categorias ON produtos.categoria = categorias.id
            WHERE produtos.id = ?
        `;
        db.query(query, [id], callback);
    },

    create: (produtoData, callback) => {
        const query = `
            INSERT INTO produtos (nome, descricao, preco, quantidade, categoria)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            produtoData.nome,
            produtoData.descricao,
            produtoData.preco,
            produtoData.quantidade,
            produtoData.categoria
        ];
        db.query(query, values, callback);
    },

    update: (id, produtoData, callback) => {
        const query = `
            UPDATE produtos
            SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria = ?
            WHERE id = ?
        `;
        const values = [
            produtoData.nome,
            produtoData.descricao,
            produtoData.preco,
            produtoData.quantidade,
            produtoData.categoria,
            id
        ];
        db.query(query, values, callback);
    },

    delete: (id, callback) => {
        const query = `DELETE FROM produtos WHERE id = ?`;
        db.query(query, [id], callback);
    }
};

module.exports = Produto;
