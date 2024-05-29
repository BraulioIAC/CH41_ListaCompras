let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras")
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid=true;
let precio = 0;
let cont = 0;
let contProductos = 0;
let contPrecio = 0;

let datos= new Array(); // Aqui se almacena la información de la tabla

function validarCantidad(){
    if(txtNumber.value.length==0 || isNaN(txtNumber.value) || Number(txtNumber.value) < 0){
        return false;
    }
    return true;
}

function getPrecio(){
    return Math.floor((Math.random()*100) * 100)/100
}


btnAgregar.addEventListener("click", function (event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    isValid=true;
    // Validación de datos
    if(txtNombre.value.length<3){
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto<br>";
        alertValidaciones.style.display = "block"
        txtNombre.style.border = "solid red medium";
        isValid=false;
    }//length menor que 3
    if (! validarCantidad()){
        alertValidacionesTexto.innerHTML+="La <strong>Cantidad</strong> no es válida";
        alertValidaciones.style.display = "block"
        txtNumber.style.border = "solid red medium";
        isValid=false;
    }
    if(isValid){
        precio = getPrecio();
        cont++;
        contProductos+=parseFloat(txtNumber.value);
        contPrecio+=precio*parseFloat(txtNumber.value);
        let row = `<tr>
            <td>${cont}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </<tr>`;

        let elemento = `{"id": ${cont},
                        "nombre": "${txtNombre.value}",
                        "cantidad": "${txtNumber.value}",
                        "precio": ${precio}
        }`;
        datos.push(JSON.parse(elemento));
        localStorage.setItem("datos", JSON.stringify(datos))
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        contadorProductos.innerText = cont;
        productosTotal.innerText = contProductos;
        precioTotal.innerText = `$ ${contPrecio.toFixed(2)}`;
        localStorage.setItem("cont",cont);
        localStorage.setItem("contProductos",contProductos);
        localStorage.setItem("contPrecio",contPrecio);
        txtNombre.value="";
        txtNumber.value=""
        txtNombre.focus();
    }
});

btnClear.addEventListener("click",function (event){
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    cuerpoTabla.innerHTML="";
    contadorProductos.innerText="0";
    productosTotal.innerHTML="0";
    precioTotal.innerHTML="$ 0";
    cont = 0;
    contProductos = 0;
    contPrecio = 0;
    localStorage.setItem("cont",cont);
    localStorage.setItem("contProductos",contProductos);
    localStorage.setItem("contPrecio",contPrecio);
    datos = new Array();
    localStorage.removeItem("datos");
    contadorProductos.innerText=cont;
    productosTotal.innerHTML=contProductos;
    precioTotal.innerHTML=contPrecio;
})

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("cont") != null){
        cont=Number(this.localStorage.getItem("cont"));
    }
    if(this.localStorage.getItem("contProductos") != null){
        contProductos=Number(this.localStorage.getItem("contProductos"));
    }
    if(this.localStorage.getItem("contPrecio") != null){
        contPrecio=Number(this.localStorage.getItem("contPrecio"));
    }

    if(this.localStorage.getItem("datos") != null){
        datos=JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) =>{
            let row = `<tr>
                            <td>${r.id}</td>
                            <td>${r.nombre}</td>
                            <td>${r.cantidad}</td>
                            <td>${r.precio}</td>
                        </<tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
    });
}


    contadorProductos.innerText = cont;
    productosTotal.innerText = contProductos;
    contPrecio.innerText = `$ ${contPrecio}`
})