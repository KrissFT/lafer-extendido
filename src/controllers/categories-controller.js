const path = require('path')
const categories = require("../services/categories-services")
let baseUrl = "http://localhost:3031"
let url = '/api'

const controller = {
    apiCategories: async (req,res) => {
        let categorias = await categories.findAll()
        res.send(categorias)
    },
    apiCategoryDetail: async (req,res) => {
        const id = req.params.id;
        let categoriaAEnviar = await categories.findOne(id)
        res.send(categoriaAEnviar || {});
    },
    apiCategoryDetailName: async (req,res) => {
        const name = req.params.name;
        let categoriaAEnviar = await categories.findOnebyName(name)
        res.send(categoriaAEnviar || {});
    },
    apiCategoryCreate: async (req,res) => {
        await categories.create(req.body)

        res.redirect("/api/categorias")
    },
    apiCategoryUpdate: async (req,res) => {
        await categories.update(req.body,req.params.id)

        res.redirect("/api/categorias")
    },
    categoryUploadImage: async (req, res) => {
        // req.file
        // console.log(req.file);
        const id = req.params.id;
        let newData = {
            image: req.file.filename
        }
        let resultado = await categories.uploadImage(id, newData);
        if (resultado > 0) {
            res.send("Edición exitosa");
        } else {
            res.send("Algo malio sal");
        };
    },
    apiCategoryDelete: async (req,res) => {
        await categories.delete(req.params.id)

        res.redirect("/api/categorias")
    }
}
module.exports = controller;