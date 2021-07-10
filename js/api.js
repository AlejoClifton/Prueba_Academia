var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

//Creo el Mail recibido
function createMail(data) {
    const div = document.createElement('div');
    const nombre = document.createElement('h2');
    const fecha = document.createElement('h3');
    const asunto = document.createElement('p');
    nombre.innerText = data.from.name;
    fecha.innerText = data.time;
    asunto.innerText = data.subject;
    const id = data.id;
    const mensaje = data.message;

    div.appendChild(nombre);
    div.appendChild(fecha);
    div.appendChild(asunto);

    div.addEventListener("click", () => {
        window.location = "/selected.html?id=" + id + "?mensaje=" + mensaje + "?div=" + div;
    })
    return div;

}
//Creo el Menu recibido
function createMenu(data) {
    const nombre = document.createElement('li');
    nombre.innerText = data.name;

    nombre.addEventListener("click", () => {
        document.getElementById("correo").innerHTML = "";
        api(data.name);
    })

    document.getElementById("menu-li").appendChild(nombre);

}
//Crea div
function createDiv(data, tipo) {
    if (tipo === 1) {
        for (let i = 0; i < data.length; i++) {
            let dataItem = createMail(data[i]);
            document.getElementById('correo').appendChild(dataItem);
        }
    }
    if (tipo === 2) {
        for (let i = 0; i < data.length; i++) {
            createMenu(data[i]);
        }
    }
}

function api(string = "inbox") {
    fetch("https://academia.tim.teknosgroup.com/clifton-ba16/api/messages/" + string, requestOptions)
        .then(data => data.text())
        .then(function(data) {
            let emails = JSON.parse(data);
            console.log(emails);
            createDiv(emails, 1);
        })

    .catch(error => console.log('error', error));
}
document.addEventListener("DOMContentLoaded", () => {

    api();

    fetch("http://academia.tim.teknosgroup.com/clifton-ba16/api/folders", requestOptions)
        .then(response => response.text())
        .then(function(response) {
            let parciado = JSON.parse(response);
            createDiv(parciado, 2);
        })
        .catch(error => console.log('error', error));

})