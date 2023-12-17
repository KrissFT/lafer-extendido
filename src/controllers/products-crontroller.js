const path = require('path')
const products = require("../services/products-services")
let baseUrl = "http://localhost:3031"
let url = '/api'

const controller = {
    apiProducts: async (req,res) => {
        let panes = await products.findAll()
        res.send(panes);
    },
    apiProductDetail: async (req,res) => {
        const id = req.params.id;
        let panAEnviar = await products.findOne(id)
        res.send(panAEnviar || {});
    },
    apiProductCreate: async (req,res) => {
        await products.create(req.body)

        res.redirect("/api/productos")
    },
    apiProductUpdate: async (req,res) => {
        await products.update(req.body,req.params.id)

        res.redirect("/api/productos")
    },
    productUploadImage: async (req, res) => {
        // req.file
        // console.log(req.file);
        const id = req.params.id;
        let newData = {
            image: req.file.filename
        }
        let resultado = await products.uploadImage(id, newData);
        if (resultado > 0) {
            res.send("Edición exitosa");
        } else {
            res.send("Algo malio sal");
        };
    },
    apiProductDelete: async (req,res) => {
        await products.delete(req.params.id)

        res.redirect("/api/productos")
    }
}
module.exports = controller;