//Código del repo 11-11 de Aylen
async function cargarProductos(){
    let data = await fetch('/api/productos');
    console.log(data)
    let products = await data.json();
    console.log(products)

    data = await fetch('/api/categorias');
    console.log(data)
    let categories = await data.json();
    console.log(categories)

    let ul = document.querySelector("ul#productos");
    ul.innerHTML = "";

    //Crear producto
    let createButton = document.createElement("i");
    createButton.setAttribute("class", "fa-solid fa-plus");
    createButton.addEventListener('click', () => {
        let imgDetector = false
        let div = document.createElement("div");
        div.className = 'formulario';

        let labelNombre = document.createElement("label")
        labelNombre.innerHTML = "Nombre: "
        div.appendChild(labelNombre)

        let inputNombre = document.createElement("input"); // Name, type y id
        //inputNombre.setAttribute('required', '');
        div.appendChild(inputNombre);

        let br = document.createElement("br")
        div.appendChild(br)

        let labelDescription = document.createElement("label")
        labelDescription.innerHTML = "Descripción: "
        div.appendChild(labelDescription)

        let inputDescription = document.createElement("input"); // Name, type y id
        //inputDescription.setAttribute('required', '');
        div.appendChild(inputDescription);

        let labelPrice = document.createElement("label")
        labelPrice.innerHTML = "Precio: "
        div.appendChild(labelPrice)

        let inputPrice = document.createElement("input"); // Name, type y id
        inputPrice.setAttribute('type', 'number')
        //inputPrice.setAttribute('required', '');
        div.appendChild(inputPrice);

        //Categoría
        let labelCategory = document.createElement("label")
        labelCategory.setAttribute("for", "categories")
        let selectCategory = document.createElement("select")
        selectCategory.setAttribute("id", "categories")
        selectCategory.setAttribute("name", "categories")
        //selectCategory.setAttribute('required', '');

        div.appendChild(labelCategory)
        categories.forEach((category)=>{
            let categoryOption = document.createElement("option");
            categoryOption.value = category.id;
            categoryOption.innerHTML = category.name;
            selectCategory.appendChild(categoryOption);
        })
        div.appendChild(selectCategory);


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
        div.appendChild(labelImg);
        div.appendChild(inputImg);

        console.log(imgDetector)
        inputImg.addEventListener("change", () => {
            imgDetector = true
            console.log(imgDetector)
        })

        let boton = document.createElement("button");
        boton.innerHTML = "Crear"
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
        div.appendChild(boton);
        ul.innerHTML = "";
        ul.appendChild(div);
    })
    ul.appendChild(createButton);



    
    products.forEach(function(product){
        let li = document.createElement('li');

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
        li.appendChild(inputImg);

        let labelImg = document.createElement("label");
        labelImg.setAttribute("for", "image-input-"+product.id)
        if (product.image && product.image != "default.png") {
            let img = document.createElement("img")
            img.src = "/img/products/"+product.image;
            labelImg.appendChild(img);
        } else {
            let spanVacio = document.createElement("span");
            spanVacio.innerHTML = "Subir imagen";

            labelImg.appendChild(spanVacio)
        }
        li.appendChild(labelImg);

        // ID
        let spanId = document.createElement('span');
        spanId.innerHTML = `${product.id} - `;
        li.appendChild(spanId);
        
        // Nombre
        let spanName = document.createElement('span');
        spanName.innerHTML = product.name;
        li.appendChild(spanName);

        // Precio
        let spanPrice = document.createElement('span');
        spanPrice.innerHTML = ` $${product.price}`;
        li.appendChild(spanPrice);

        // Categoría
        let spanCategory = document.createElement('span');
        spanCategory.innerHTML = ` ${product.Category.name}`;
        li.appendChild(spanCategory);

        // Icono editar
        let iEditar = document.createElement('i');
        iEditar.setAttribute("class", "fa-solid fa-pen");
        iEditar.addEventListener("click", async() => {
            let div = document.createElement("div");
            div.className = 'formulario';

            let labelNombre = document.createElement("label")
            labelNombre.innerHTML = "Nombre: "
            div.appendChild(labelNombre)
    
            let inputNombre = document.createElement("input"); // Name, type y id
            inputNombre.value = product.name;
            inputNombre.setAttribute('required', '');
            div.appendChild(inputNombre);
    
            let labelDescription = document.createElement("label")
            labelDescription.innerHTML = "Descripción: "
            div.appendChild(labelDescription)
    
            let inputDescription = document.createElement("input"); // Name, type y id
            inputDescription.value = product.description;
            inputDescription.setAttribute('required', '');
            div.appendChild(inputDescription);
    
            let labelPrice = document.createElement("label")
            labelPrice.innerHTML = "Precio: "
            div.appendChild(labelPrice)
    
            let inputPrice = document.createElement("input"); // Name, type y id
            inputPrice.value = product.price;
            inputPrice.setAttribute('required', '');
            div.appendChild(inputPrice);
    
            //Categoría
            let labelCategory = document.createElement("label")
            labelCategory.setAttribute("for", "categories")
            let selectCategory = document.createElement("select")
            selectCategory.setAttribute("id", "categories")
            selectCategory.setAttribute("name", "categories")
            selectCategory.setAttribute('required', '');
    
            div.appendChild(labelCategory)
            let optionDefault = document.createElement("option")
            optionDefault.value = product.Category.id
            optionDefault.innerHTML = product.Category.name
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
            div.appendChild(selectCategory);

            let boton = document.createElement("button");
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
            div.appendChild(boton);
            ul.innerHTML = "";
            ul.appendChild(div);
        })
        li.appendChild(iEditar);
        
        // Icono borrar
        let iBorrar = document.createElement('i');
        iBorrar.setAttribute("class", "fa-solid fa-trash");
        iBorrar.addEventListener("click", async() => {
            await fetch('/api/productos/'+product.id, {
                method: "DELETE"
            })
            cargarProductos();
        })
        li.appendChild(iBorrar);
        

        ul.appendChild(li);
    })


    return products;
}

async function cargarProductosCliente(){
    let data = await fetch('/api/productos');
    console.log(data)
    let products = await data.json();
    console.log(products)

    data = await fetch('/api/categorias');
    console.log(data)
    let categories = await data.json();
    console.log(categories)

    let ul = document.querySelector("ul#productos");
    ul.innerHTML = "";
    
    products.forEach(function(product){
        let li = document.createElement('li');

        let img = document.createElement("img");
        img.src = "/img/products/"+product.image;
        li.appendChild(img);

        // ID
        let spanId = document.createElement('span');
        spanId.innerHTML = `${product.id} - `;
        li.appendChild(spanId);
        
        // Nombre
        let spanName = document.createElement('span');
        spanName.innerHTML = product.name;
        li.appendChild(spanName);

        // Precio
        let spanPrice = document.createElement('span');
        spanPrice.innerHTML = ` $${product.price}`;
        li.appendChild(spanPrice);

        // Categoría
        let spanCategory = document.createElement('span');
        spanCategory.innerHTML = ` ${product.Category.name}`;
        li.appendChild(spanCategory);

        ul.appendChild(li);
    })


    return products;
}

window.addEventListener("load", async()=>{
    let products = await cargarProductos();
    console.log(products);
})