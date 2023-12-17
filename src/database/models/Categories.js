module.exports = (sequelize,dataTypes)=>{
    let alias = "Categories"
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
        image: {
            type: dataTypes.STRING,
            allowNull: true
        }
    }
    let config = {
        tableName: "categories",
        timestamps: false
    }
    const Categories = sequelize.define(alias,cols,config)

    Categories.associate = (models) => {
        Categories.hasMany(models.Products, {
            foreignKey: 'category_id'
        })
    }

    return Categories
}