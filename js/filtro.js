let btnfiltrar = document.getElementById("btnfiltrar");
let listaCorreos = document.getElementById("correo");
let txtBusqueda = document.getElementById("busqueda");
let correosHijos = listaCorreos.children;

console.log(txtBusqueda.value);

btnfiltrar.onclick = function() {
    for (let a = 0; a < correosHijos.length; a++) {
        console.log(correosHijos[a].innerText);
        console.log(txtBusqueda.value);
        if (correosHijos[a].innerText.toUpperCase().includes(txtBusqueda.value.toUpperCase())) {
            correosHijos[a].classList.remove('desactivar');
            correosHijos[a].classList.add('activo');
        } else {
            correosHijos[a].classList.add('desactivar');
            correosHijos[a].classList.remove('activo');
        }

    }
    txtBusqueda.innerText = "";
}