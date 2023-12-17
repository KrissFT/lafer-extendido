const path = require('path')
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products-crontroller')

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

router.get(url+'/productos', productsController.apiProducts);
router.get(url+'/productos'+'/:id', productsController.apiProductDetail);

router.post(url+'/productos', productsController.apiProductCreate);

router.put(url+'/productos'+'/:id',productsController.apiProductUpdate)
router.patch(url+'/productos/:id', upload.single("image"), productsController.productUploadImage);

router.delete(url+'/productos'+'/:id', productsController.apiProductDelete)

module.exports = router;