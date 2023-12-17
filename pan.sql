DROP DATABASE IF EXISTS lafer_db;
CREATE DATABASE lafer_db;

USE lafer_db;

CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255)
);
INSERT INTO categories (name) VALUES ('Panadería'),('Pastelería'),('Confitería');

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    price INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
INSERT INTO products (name, category_id, price, description, image) VALUES ('Pan francés', 1, 1500, 'Descripción','pan.png'),('Figacitas', 1, 1600, 'Descripción','pan.png'),('Pan de campo', 1, 1000, 'Descripción 3','pan.png'),('Pan al molde', 1, 1300, 'Descripción 4','pan.png'),('Pan artesanal', 1, 1100, 'Descripción 4','pan.png'),('Pan de centeno', 1, 950, 'Descripción 4','pan.png'),('Chocotorta', 2, 1500, 'Descripción 4','pan.png'),('Red velvet', 2, 1600, 'Descripción 4','pan.png'),('Mousse de chocolate', 2, 1000, 'Descripción 4','pan.png'),('Cheesecake de nutella', 2, 13000, 'Descripción 4','pan.png'),('Torta de chocolate', 2, 1100, 'Descripción 4','pan.png'),('Torta de frutilla', 2, 950, 'Descripción 4','pan.png'),('Confi', 3, 950, 'Descripción 4','pan.png'),('Confi', 3, 950, 'Descripción 4','pan.png'),('Confi', 3, 950, 'Descripción 4','pan.png'),('Confi', 3, 950, 'Descripción 4','pan.png'),('Confi', 3, 950, 'Descripción 4','pan.png'),('Confi', 3, 950, 'Descripción 4','pan.png');