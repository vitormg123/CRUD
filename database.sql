CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'usuario') NOT NULL
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Inserir categorias básicas para o sistema
INSERT INTO categorias (nome) VALUES ('Masculino');
INSERT INTO categorias (nome) VALUES ('Feminino');
INSERT INTO categorias (nome) VALUES ('Infantil');

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    categoriaId INT NOT NULL,
    FOREIGN KEY (categoriaId) REFERENCES categorias(id)
);

CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produtoId INT NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    dataVenda DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produtoId) REFERENCES produtos(id)
);
