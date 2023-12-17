function setCookie(nombre, valor, dias) {
    // Crear una fecha con los días de duración
    var fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    // Crear la cadena de la cookie con el nombre, el valor y la fecha de expiración
    var cookie = nombre + "=" + valor + "; expires=" + fecha.toUTCString() + "; path=/";
    // Asignar la cookie al documento
    document.cookie = cookie;
  }

  window.addEventListener("load", async()=>{
    let socket = io();

    socket.emit("asdasd", "Holi")

    socket.on("connected-total", (conectados) =>{
        // console.log(conectados);
    })

    socket.on("mensajes", (mensajes)=> {
        cargarMensajes(mensajes);
    })
    let inputName = document.querySelector("input#chat-name");
    let inputMessage = document.querySelector("input#chat-msg");
    let sendButton = document.querySelector("button#send-msg");
    

    sendButton.addEventListener("click", () => {
        if (inputName.value.length > 0 && inputMessage.value.length > 0) {
            inputName.disabled = true;
            socket.emit("nuevo-mensaje",{
                nombre: inputName.value,
                mensaje: inputMessage.value
            })
            inputMessage.value = "";
        }
    })

    let dataSacadaDeLaCookie = getCookie("theme")      
    let body = document.body;
    body.classList.add(dataSacadaDeLaCookie || "asd");

    // Almacenamiento local -> localStorage (window)
    // Almacenamiento en sesión -> sessionStorage (window)
    // let correo = prompt("Escribe tu correo");
    let correo = "asd"
    if (correo) {
        sessionStorage.setItem("email", correo);
        console.log("Correo ingresado: "+sessionStorage.getItem("email"));
    }

    let correoEnSesion = sessionStorage.getItem("email")
    document.querySelector("h2").innerHTML = "Bienvenido "+ (correoEnSesion ? correoEnSesion : "Invitado")

    let products = await cargarProductos();
    // console.log(products);

    document.querySelector("h2").addEventListener("click", ()=>{
        if (dataSacadaDeLaCookie) {
            setCookie("theme","", -1)
        } else {
            setCookie("theme","dark", 10)
        }
    })
    // setCookie("theme","dark", 10)      
    // alert(document.cookie)
    
    // let dataSacadaDeLaCookie = recuperarDeLaCookie("theme");
    // console.log(dataSacadaDeLaCookie);
    
      
    
})