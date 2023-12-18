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
INSERT INTO products (name, category_id, price, description, image) VALUES ('Pan francés', 1, 1500, 'Por unidad:$125', 'frances.jpg'),('Figacitas', 1, 1600, 'Por unidad:$133', 'figacitas.jpg'),('Pan de campo', 1, 950, 'Por unidad:$158', 'campo.jpg'),('Pan al molde', 1, 800, 'Por unidad:$108', 'molde.jpg'),('Pan artesanal', 1, 2200, 'Por unidad:$183', 'artesanal.jpg'),('Pan de centeno', 1, 1500, 'Por unidad:$125', 'centeno.jpg'),('Chocotorta', 2, 15000, 'A pedidio', 'chocotorta.jpg'),('Pastel Red velvet', 2, 16000, 'A pedido', 'red velvet.jpg'),('Mousse de chocolate', 2, 10000, 'Porcion:$1250', 'mousse de chocolate.jpg'),('Cheesecake de nutella', 2, 13000, 'Porcion:$2370', 'cheesecake de nutella.jpg'),('Torta de chocolate', 2, 11000, 'A pedido especial', 'torta de chocolate.jpg'),('Torta de frutilla', 2, 17000, 'Porcion:$212', 'torta de frutilla.jpg'),('Facturas', 3, 2280, 'Por unidad:$190', 'medialunas.jpg'),('Tartas', 3, 3500, 'Vainilla - Chocolate - ', 'tartas.jpg'),('Pan dulce ', 3, 1700, 'Por tiempo limitado ', 'dulce.jpg'),('Budín', 3, 2700, 'Vainilla - Chocolate - Ingles', 'budin.jpg'),('Churros', 3, 950, 'Por unidad:$80', 'churros.jpg'),('Bolas de fraile', 3, 1500, 'Por unidad:$125', 'bolas.jpg');