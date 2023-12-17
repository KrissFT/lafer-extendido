//let db = require("./index")

module.exports = (sequelize,dataTypes)=>{
    let alias = "Products"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER, 
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "products",
        timestamps: false
    }
    const Products = sequelize.define(alias,cols,config)
    
    Products.associate = (models) => {
        /*  models.Categories.hasMany(Products, {
             foreignKey: 'category_id'
         }) */
         Products.belongsTo(models.Categories, { foreignKey: 'category_id' })
     
        /*  models.Images.hasMany(Products, {
             foreignKey: 'image_id'
         }) */
/*          Products.belongsTo(models.Images, { foreignKey: 'image_id' }) */
     }

   
    return Products
}