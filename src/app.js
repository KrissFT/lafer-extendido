const express = require('express');
const app = express();

const port = 3031;
app.listen(port,()=>console.log("Servidor iniciado en el puerto "+port));

const static = express.static('public')
app.use(static)

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const mainRouter = require('./routes/main-router');
app.use(mainRouter);

const productsRouter = require('./routes/products-router');
app.use(productsRouter);

const categoriesRouter = require('./routes/categories-router');
app.use(categoriesRouter);