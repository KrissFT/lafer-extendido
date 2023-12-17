async function cargarProductos(){
    let data = await fetch('/api/productos');
    console.log(data)
    let products = await data.json();
    console.log(products)

    data = await fetch('/api/categorias');
    console.log(data)
    let categories = await data.json();
    console.log(categories)

    let muestra = document.querySelector("#muestra")
    console.log(products.reverse())

    for (let i = 0; i < 4; i++) {
        let col = document.createElement('div')
        col.setAttribute('class', "col-md-3 py-3 py-md-0")
        
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        
        let img = document.createElement("img");
        img.src = "/img/products/"+products[i].image;

        let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        let hNombre = document.createElement('h3')
        hNombre.innerHTML = products[i].name
        let pDescripcion = document.createElement('p')
        pDescripcion.innerHTML = products[i].description
        let hPrecio = document.createElement('h6')
        hPrecio.innerHTML = `$${products[i].price}`
        cardBody.appendChild(hNombre)
        cardBody.appendChild(pDescripcion)
        cardBody.appendChild(hPrecio)

        card.appendChild(img)
        //card.appendChild(cardBody)
        col.appendChild(card)

        muestra.appendChild(col)
    }

    let cats = document.querySelector("#categorias")
    cats.innerHTML = ""
    cats.className = "row"

    categories.forEach(function(category){
        let col = document.createElement('div')
        col.setAttribute('class', "col-md-3 py-3 py-md-0")
        
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        
        let overlay = document.createElement('div')
        overlay.setAttribute('class', 'overlay')
        let botonEditar = document.createElement('button')
        botonEditar.setAttribute('class','btn btn-secondary')
        botonEditar.setAttribute('title', 'Cambiar nombre')
        botonEditar.setAttribute('type', 'button')
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
            inputNombre.value = category.name;
            inputNombre.setAttribute('required', '');
            divNombre.appendChild(inputNombre);
            div.appendChild(divNombre)

            let divBoton = document.createElement("div");
            divBoton.className = 'claseFormulario';
            let boton = document.createElement("button");
            boton.innerHTML = "Editar"
            boton.addEventListener("click", async() => {
                await fetch('/api/categorias/'+category.id, {
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json" // formencode
                    },
                    body: JSON.stringify({
                        name: inputNombre.value
                    })
                })
                cargarProductos();
            })
            divBoton.appendChild(boton)
            div.appendChild(divBoton);
            cats.innerHTML = "";
            cats.className = ""
            /* ul.className = "" */
            /* h1.innerHTML = "FORMULARIO DE EDICIÓN" */
            cats.appendChild(div);
        })

        let botonEliminar = document.createElement('button')
        botonEliminar.setAttribute('class','btn btn-secondary')
        botonEliminar.setAttribute('title','Eliminar categoría')
        botonEliminar.setAttribute('type', 'button')
        let iBorrar = document.createElement('i');
        iBorrar.setAttribute("class", "fa-solid fa-trash");
        botonEliminar.appendChild(iBorrar)

        iBorrar.addEventListener("click", async() => {
            await fetch('/api/categorias/'+category.id, {
                method: "DELETE"
            })
            cargarProductos();
        })

        overlay.appendChild(botonEditar)
        overlay.appendChild(botonEliminar)

        let img = document.createElement("img");
        if(category.Products.length > 0){
            img.src = "/img/products/"+category.Products[0].image;
        }else{
            img.src = "/img/products/pan.png"
        }
        

        let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        let hNombre = document.createElement('h3')
        hNombre.innerHTML = category.name
        let hBoton = document.createElement('h6')
        let buttonBoton = document.createElement('button')
        let aBoton = document.createElement('a')
        aBoton.setAttribute('class', 'pan')
        aBoton.setAttribute('href', `/${category.name}`)
        aBoton.innerHTML = 'Catálogo'
        buttonBoton.appendChild(aBoton)
        hBoton.appendChild(buttonBoton)

        cardBody.appendChild(hNombre)
        cardBody.appendChild(hBoton)

        card.appendChild(overlay)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)

        cats.appendChild(col)

    })

    let divCrear = document.createElement('div')
    divCrear.setAttribute('class', "col-md-3 py-3 py-md-0 boton")
    //Crear producto
    let createButton = document.createElement("i");
    createButton.setAttribute("class", "fa-solid fa-plus");
    createButton.addEventListener('click', () => {
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


        let divBoton = document.createElement("div");
        divBoton.className = 'claseFormulario';
        let boton = document.createElement("button");
        boton.innerHTML = "Añadir"
        boton.addEventListener("click", async() => {
            if(inputNombre.value != ""){
                await fetch('/api/categorias', {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json" // formencode
                    },
                    body: JSON.stringify({
                        name: inputNombre.value
                    })
                })
    
                cargarProductos();
            }
        })
        divBoton.appendChild(boton)
        div.appendChild(divBoton);
        cats.innerHTML = ""
        cats.className = ""
        cats.appendChild(div);
    })
    divCrear.appendChild(createButton);
    cats.appendChild(divCrear)

    return products;
}

window.addEventListener("load", async()=>{
    let products = await cargarProductos();
    console.log(products);
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.parentElement.removeChild(loaderContainer);
})