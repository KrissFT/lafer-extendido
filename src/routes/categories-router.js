const path = require('path')
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories-controller')

const multer = require("multer");
const storage = multer.diskStorage({
    /*
        file.originalname
        file.fieldname
    */
    destination: path.resolve(__dirname, "../../public/img/products"),
    filename: function(req, file, cb){
        // console.log(file);
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    }
})

const upload = multer({
    storage: storage
})

let url = '/api'

router.get(url+'/categorias', categoriesController.apiCategories);
router.get(url+'/categorias'+'/:id', categoriesController.apiCategoryDetail);
router.get(url+'/:name', categoriesController.apiCategoryDetailName);

router.post(url+'/categorias', categoriesController.apiCategoryCreate);

router.put(url+'/categorias'+'/:id',categoriesController.apiCategoryUpdate)
router.patch(url+'/categorias/:id', upload.single("image"), categoriesController.categoryUploadImage);

router.delete(url+'/categorias'+'/:id', categoriesController.apiCategoryDelete)

module.exports = router;