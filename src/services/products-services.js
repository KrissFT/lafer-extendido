let db = require("../database/models/index");
let panes = require("../data/panes");
const service = {
    findAll:async () => {
        let productos = await db.Products.findAll({
            include: [{
                model: db.Categories
            }]
        })
        return productos
    },
    findOne: async (id) =>{
        let pan = await db.Products.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.Categories
            }]
        })
        return pan || {}
    },
    //create
    create: async (data) =>{
        let panACrear = {
            name: data.name,
            category_id: data.category_id,
            image: data.image,
            description: data.description,
            price: data.price
        }
        db.Products.create(panACrear)
    },
    //destroy
    delete: async (id) =>{
        db.Products.destroy({
            where: {
                id: id
            }
        })
    },
    //update
    update: async (data,id) => {
        let panAEditar = {
            name: data.name,
            category_id: data.category_id,
            description: data.description,
            price: data.price
        }     

        db.Products.update(panAEditar, {
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

        let resultado = db.Products.update(newData, {
            where: {
                id: id
            }
        });

        return resultado;
    } // U
};

module.exports = service