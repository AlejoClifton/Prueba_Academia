let btnfiltrar = document.getElementById("btnfiltrar");
let listaCorreos = document.getElementById("correo");
let txtBusqueda = document.getElementById("busqueda");
let correosHijos = listaCorreos.children;

btnfiltrar.onclick = function() {
    let count = 0;
    for (let a = 0; a < correosHijos.length; a++) {
        if (correosHijos[a].innerText.toUpperCase().includes(txtBusqueda.value.toUpperCase())) {
            correosHijos[a].classList.remove('desactivar');
            correosHijos[a].classList.add('activo');
        } else {
            count++;
            correosHijos[a].classList.add('desactivar');
            correosHijos[a].classList.remove('activo');
        }
    }

    if (count === correosHijos.length) {
        noInformacion("1");
    }
    txtBusqueda.value = "";
}

let menuEnviar = document.getElementById("menuEnviar");
let div = document.getElementById("frmAbs")

menuEnviar.onclick = function() {
    if (!div.classList.contains("active")) {
        div.classList.add("active");
    } else {
        div.classList.remove("active");
    }

}

let menuCerrar = document.getElementById("menuCerrar");

menuCerrar.onclick = function() {
    div.classList.remove("active");
}

let menuInicio = document.getElementById("menuInicio");
let menu = document.getElementById("menu");
let main = document.getElementById("main");

menuInicio.onclick = function() {
    if (!menu.classList.contains("desactive")) {
        menu.classList.add("desactive");
        main.classList.add("active");
    } else {
        menu.classList.remove("desactive");
        main.classList.remove("active");
    }
}