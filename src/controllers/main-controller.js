const path = require('path')
const products = require("../services/products-services")
let baseUrl = "http://localhost:3031"
let url = '/api'

const controller = {
    home: (req, res) => {
        let filepath = path.resolve(__dirname, '../views/index.html')
        res.sendFile(filepath)
        // res.redirect(url);
    },
    productos: (req, res) => {
        let filepath = path.resolve(__dirname, '../views/productos.html')
        res.sendFile(filepath)
        // res.redirect(url);
    },
    panaderia: (req, res) => {
        let filepath = path.resolve(__dirname, '../views/panaderia.html')
        res.sendFile(filepath)
        // res.redirect(url);
    },
    pasteleria: (req, res) => {
        let filepath = path.resolve(__dirname, '../views/pasteleria.html')
        res.sendFile(filepath)
        // res.redirect(url);
    },
    confiteria: (req, res) => {
        let filepath = path.resolve(__dirname, '../views/confiteria.html')
        res.sendFile(filepath)
        // res.redirect(url);
    },
    apiHome: (req,res) => {
        res.send({
            productos: baseUrl + url + "/productos",
        });
    }
}
module.exports = controller;