let db = require("../database/models/index")

const service = {
    findAll:async () => {
        let categorias = await db.Categories.findAll({
            include: [{
                model: db.Products
            }]
        })
        return categorias
    },
    findOne: async (id) =>{
        let categoria = await db.Categories.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.Products
            }]
        })
        return categoria || {}
    },
    findOnebyName: async (name) =>{
        let categoria = await db.Categories.findOne({
            where: {
                name: name
            },
            include: [{
                model: db.Products
            }]
        })
        return categoria || {}
    },
    //create
    create: async (data) =>{
        let categoriaACrear = {
            name: data.name,
            image: data.image
        }
        db.Categories.create(categoriaACrear)
    },
    //destroy
    delete: async (id) =>{
        db.Categories.destroy({
            where: {
                id: id
            }
        })
    },
    //update
    update: async (data,id) => {
        let categoriaAEditar = {
            name: data.name
        }     

        db.Categories.update(categoriaAEditar, {
            where: {
                id: id
            }
        })
    },
    uploadImage: async (id, data) => {
        let newData = {
            image: data.image
        };

        // newData.images.forEach((image) => {
        //     Image.create({
        //         name: image.filename,
        //         product_id: id
        //     })
        // })

        let resultado = db.Categories.update(newData, {
            where: {
                id: id
            }
        });

        return resultado;
    } // U
}

module.exports = service