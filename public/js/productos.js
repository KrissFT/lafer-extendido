//Código del repo 11-11 de Aylen
async function cargarProductos(){
    const url = new URL(document.location.href);
    let path = url.pathname
    console.log(path)
    path = path.slice(1)
    console.log(path)

    let data = await fetch(`/api/${path}`);
    console.log(data)
    let categoryProducts = await data.json();
    console.log(categoryProducts)

    data = await fetch('/api/categorias');
    console.log(data)
    let categories = await data.json();
    console.log(categories)

    let h1 = document.querySelector("#titulo")
    h1.innerHTML = categoryProducts.name.toUpperCase()
    let ul = document.querySelector("div#productos");
    ul.innerHTML = "";
    ul.className = "row"

    
    categoryProducts.Products.forEach(function(product){
        let col = document.createElement('div')
        col.setAttribute('class', "col-md-3 py-3 py-md-0")
        
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        
        let overlay = document.createElement('div')
        overlay.setAttribute('class', 'overlay')
        let botonEditar = document.createElement('button')
        botonEditar.setAttribute('class','btn btn-secondary')
        botonEditar.setAttribute('type', 'button')
        botonEditar.setAttribute('title','Editar producto')
        let iEditar = document.createElement('i');
        iEditar.setAttribute("class", "fa-solid fa-pen");
        botonEditar.appendChild(iEditar)
        
        botonEditar.addEventListener("click", async() => {
            let div = document.createElement("form");
            div.setAttribute('id', 'form')

            let divNombre = document.createElement("div");
            divNombre.className = 'claseFormulario';
            let labelNombre = document.createElement("label")
            labelNombre.innerHTML = "Nombre: "
            divNombre.appendChild(labelNombre)
            let inputNombre = document.createElement("input"); // Name, type y id
            inputNombre.value = product.name;
            inputNombre.setAttribute('required', '');
            divNombre.appendChild(inputNombre);
            div.appendChild(divNombre)

            let divDescription = document.createElement("div");
            divDescription.className = 'claseFormulario';
            let labelDescription = document.createElement("label")
            labelDescription.innerHTML = "Descripción: "
            divDescription.appendChild(labelDescription)
    
            let inputDescription = document.createElement("input"); // Name, type y id
            inputDescription.value = product.description;
            inputDescription.setAttribute('required', '');
            divDescription.appendChild(inputDescription);
            div.appendChild(divDescription)
            
            let divPrice = document.createElement("div");
            divPrice.className = 'claseFormulario';
            let labelPrice = document.createElement("label")
            labelPrice.innerHTML = "Precio: "
            divPrice.appendChild(labelPrice)
    
            let inputPrice = document.createElement("input"); // Name, type y id
            inputPrice.value = product.price;
            inputPrice.setAttribute('required', '');
            divPrice.appendChild(inputPrice);
            div.appendChild(divPrice)

            //Categoría
            let divCategory = document.createElement("div");
            divCategory.className = 'claseFormulario';
            let labelCategory = document.createElement("label")
            labelCategory.setAttribute("for", "categories")
            labelCategory.innerHTML = "Categoría: "
            let selectCategory = document.createElement("select")
            selectCategory.setAttribute("id", "categories")
            selectCategory.setAttribute("name", "categories")
            selectCategory.setAttribute('required', '');
    
            divCategory.appendChild(labelCategory)
            let optionDefault = document.createElement("option")
            optionDefault.value = categoryProducts.id
            optionDefault.innerHTML = categoryProducts.name
            selectCategory.appendChild(optionDefault)
            
            categories.forEach((category)=>{
                if(optionDefault.value != category.id){
                    let categoryOption = document.createElement("option");
                    categoryOption.value = category.id;
                    categoryOption.innerHTML = category.name;
                    selectCategory.appendChild(categoryOption); 
                }

                /* let categoryOption = document.createElement("option");
                categoryOption.value = category.id;
                categoryOption.innerHTML = category.name;
                selectCategory.appendChild(categoryOption); */
            })
            divCategory.appendChild(selectCategory);
            div.appendChild(divCategory)

            let divBoton = document.createElement("div");
            divBoton.className = 'claseFormulario';
            let boton = document.createElement("button");
            boton.innerHTML = "Editar"
            boton.addEventListener("click", async() => {
                await fetch('/api/productos/'+product.id, {
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json" // formencode
                    },
                    body: JSON.stringify({
                        name: inputNombre.value,
                        description: inputDescription.value,
                        price: inputPrice.value,
                        category_id: selectCategory.value
                    })
                })
                cargarProductos();
            })
            divBoton.appendChild(boton)
            div.appendChild(divBoton);
            ul.innerHTML = "";
            ul.className = ""
            h1.innerHTML = "FORMULARIO DE EDICIÓN"
            ul.appendChild(div);
        })
        
        let botonEditarImg = document.createElement('button')
        botonEditarImg.setAttribute('class','btn btn-secondary')
        botonEditarImg.setAttribute('title','Editar imagen')
        botonEditarImg.setAttribute('type', 'button')
        let iEditarImg = document.createElement('i');
        iEditarImg.setAttribute('class', "fa-solid fa-image");
        //botonEditarImg.appendChild(iEditarImg)

        let inputImg = document.createElement("input");
        inputImg.setAttribute("name", "image");
        inputImg.setAttribute("type", "file");
        inputImg.style.display = "none";
        inputImg.setAttribute("id", "image-input-"+product.id);
        inputImg.addEventListener("change", async() => {
            let formData = new FormData();
            formData.append("image",inputImg.files[0])

            await fetch('/api/productos/'+product.id, {
                method: "PATCH",
                //headers:{
                //    "Content-Type": "application/json" // formencode
                //},
                body: formData
            })
            cargarProductos();
        })
        

        let labelImg = document.createElement("label");
        labelImg.className = 'i-img'
        labelImg.setAttribute("for", "image-input-"+product.id)
        

        labelImg.appendChild(iEditarImg)
        labelImg.appendChild(inputImg)
        //labelImg.appendChild(inputImg)
        //labelImg.appendChild(botonEditarImg)
        //botonEditarImg.appendChild(labelImg);
        //botonEditarImg.appendChild(inputImg);

        let botonEliminar = document.createElement('button')
        botonEliminar.setAttribute('class','btn btn-secondary')
        botonEliminar.setAttribute('title','Eliminar producto')
        botonEliminar.setAttribute('type', 'button')
        let iBorrar = document.createElement('i');
        iBorrar.setAttribute("class", "fa-solid fa-trash");
        botonEliminar.appendChild(iBorrar)

        iBorrar.addEventListener("click", async() => {
            await fetch('/api/productos/'+product.id, {
                method: "DELETE"
            })
            cargarProductos();
        })

        overlay.appendChild(botonEditar)
        overlay.appendChild(labelImg)
        overlay.appendChild(botonEliminar)

        let img = document.createElement("img");
        img.src = "/img/products/"+product.image;

        let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        let hNombre = document.createElement('h3')
        hNombre.innerHTML = product.name
        let pDescripcion = document.createElement('p')
        pDescripcion.innerHTML = product.description
        let hPrecio = document.createElement('h6')
        hPrecio.innerHTML = `$${product.price}`
        cardBody.appendChild(hNombre)
        cardBody.appendChild(pDescripcion)
        cardBody.appendChild(hPrecio)

        card.appendChild(overlay)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)

        ul.appendChild(col)

    })

    let divCrear = document.createElement('div')
    divCrear.setAttribute('class', "col-md-3 py-3 py-md-0 boton")
    //Crear producto
    let createButton = document.createElement("i");
    createButton.setAttribute("class", "fa-solid fa-plus");
    createButton.addEventListener('click', () => {
        let imgDetector = false
        let div = document.createElement("div");
        div.setAttribute('id','form');

        let divName = document.createElement("div");
        divName.className = 'claseFormulario';
        let labelNombre = document.createElement("label")
        labelNombre.innerHTML = "Nombre: "
        divName.appendChild(labelNombre)
        let inputNombre = document.createElement("input"); // Name, type y id
        //inputNombre.setAttribute('required', '');
        divName.appendChild(inputNombre);
        div.appendChild(divName)

        let divDescription = document.createElement("div");
        divDescription.className = 'claseFormulario';
        let labelDescription = document.createElement("label")
        labelDescription.innerHTML = "Descripción: "
        divDescription.appendChild(labelDescription)
        let inputDescription = document.createElement("input"); // Name, type y id
        //inputDescription.setAttribute('required', '');
        divDescription.appendChild(inputDescription);
        div.appendChild(divDescription)

        let divPrice = document.createElement("div");
        divPrice.className = 'claseFormulario';
        let labelPrice = document.createElement("label")
        labelPrice.innerHTML = "Precio: "
        divPrice.appendChild(labelPrice)
        let inputPrice = document.createElement("input"); // Name, type y id
        inputPrice.setAttribute('type', 'number')
        //inputPrice.setAttribute('required', '');
        divPrice.appendChild(inputPrice);
        div.appendChild(divPrice)

        //Categoría
        let divCategory = document.createElement("div");
        divCategory.className = 'claseFormulario';
        let labelCategory = document.createElement("label")
        labelCategory.innerHTML = 'Categoría: '
        labelCategory.setAttribute("for", "categories")
        let selectCategory = document.createElement("select")
        selectCategory.setAttribute("id", "categories")
        selectCategory.setAttribute("name", "categories")
        //selectCategory.setAttribute('required', '');
        divCategory.appendChild(labelCategory)
        categories.forEach((category)=>{
            let categoryOption = document.createElement("option");
            categoryOption.value = category.id;
            categoryOption.innerHTML = category.name;
            selectCategory.appendChild(categoryOption);
        })
        divCategory.appendChild(selectCategory);
        div.appendChild(divCategory)

        let divImage = document.createElement("div");
        divImage.className = 'claseFormulario';
        let inputImg = document.createElement("input");
        inputImg.setAttribute("name", "image");
        inputImg.setAttribute("type", "file");
        inputImg.style.display = "none";
        inputImg.setAttribute("id", "image-input");
        inputImg.setAttribute("accept", ".jpg, .png, .jpeg")
        //inputImg.setAttribute('required', '');

        let labelImg = document.createElement("label");
        labelImg.setAttribute("for", "image-input")
        let spanVacio = document.createElement("span");
        spanVacio.innerHTML = "Subir imagen";


        labelImg.appendChild(spanVacio)
        divImage.appendChild(labelImg);
        divImage.appendChild(inputImg);
        div.appendChild(divImage)

        console.log(imgDetector)
        inputImg.addEventListener("change", () => {
            imgDetector = true
            console.log(imgDetector)
        })

        let divBoton = document.createElement("div");
        divBoton.className = 'claseFormulario';
        let boton = document.createElement("button");
        boton.innerHTML = "Añadir"
        boton.addEventListener("click", async() => {
            if(inputNombre.value != "" && inputDescription.value != "" && inputPrice.value != "" && imgDetector != false){
                await fetch('/api/productos', {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json" // formencode
                    },
                    body: JSON.stringify({
                        name: inputNombre.value,
                        description: inputDescription.value,
                        price: inputPrice.value,
                        category_id: selectCategory.value,
                        image: "pan.png"
                    })
                })
    
                data = await fetch('/api/productos');
                console.log(data)
                let products = await data.json();
                console.log(products)
    
                let product
                products.forEach((producto)=>{
                    if(producto.name == inputNombre.value && producto.description == inputDescription.value && producto.image == "pan.png") {
                        let resultado = producto
                        console.log(resultado)
                        product = resultado
                    }
                })
    
                console.log(product)
                let formData = new FormData();
                formData.append("image",inputImg.files[0])
                console.log(formData)
                await fetch('/api/productos/'+product.id, {
                    method: "PATCH",
                    //headers:{
                    //    "Content-Type": "application/json" // formencode
                    //},
                    body: formData
                })
                cargarProductos();
            }
        })
        divBoton.appendChild(boton)
        div.appendChild(divBoton);
        ul.innerHTML = "";
        ul.className = ""
        ul.appendChild(div);
    })
    divCrear.appendChild(createButton);
    ul.appendChild(divCrear)


    return categoryProducts;
}

window.addEventListener("load", async()=>{
    let products = await cargarProductos();
    console.log(products);
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.parentElement.removeChild(loaderContainer);
})