var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

//Creo el Mail recibido
function createMail(data, folder) {
    const div = document.createElement('div');
    const nombre = document.createElement('h2');
    const fecha = document.createElement('h3');
    const asunto = document.createElement('p');
    const divEliminar = document.createElement('div')
    var eliminar = document.createElement('i');
    eliminar.classList.add("fas");
    eliminar.classList.add("fa-trash");
    nombre.innerText = data.from.name;
    fecha.innerText = data.time;
    asunto.innerText = data.subject;
    const id = data.id;

    eliminar.onclick = function() {
        var deleteOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("https://academia.tim.teknosgroup.com/clifton-ba16/api/messages/" + folder + "/" + id, deleteOptions)
            .then(response => response.text())
            .then(result => {
                document.getElementById("correo").innerHTML = "";
                api(folder);
            })
            .catch(error => console.log('error', error));
    }

    divEliminar.appendChild(eliminar)
    div.appendChild(nombre);
    div.appendChild(fecha);
    div.appendChild(asunto);
    div.appendChild(divEliminar);
    console.log(div)
    asunto.addEventListener("click", () => {
        window.location = "/selected.html?id=" + id + "&folder=" + folder;
    })
    nombre.addEventListener("click", () => {
        window.location = "/selected.html?id=" + id + "&folder=" + folder;
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
function createDiv(data, tipo, folder) {
    if (tipo === 1) {
        for (let i = 0; i < data.length; i++) {
            let dataItem = createMail(data[i], folder);
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
            createDiv(emails, 1, string);
        })

    .catch(function(data) { console.log(data) });
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

function enviarMail(data) {
    var enviarMailOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
        from: {
            name: "Alejo Tomás Clifton Goldney",
            avatar: "assets/images/avatars/vincent.jpg",
            email: "cliftonalejo@gmail.com"
        },
        to: [{
            name: data.txtNombre.value,
            email: data.txtMail.value
        }],
        subject: data.txtAsunto.value,
        message: data.txtMensaje.value,
        read: true,
        starred: false,
        important: true,
        hasAttachments: false,
        labels: []
    };


    fetch("https://academia.tim.teknosgroup.com/clifton-ba16/api/messages/sent", enviarMailOptions)
        .then(response => response.text())
        .then(result => {
            document.getElementById("correo").innerHTML = "";
            api("sent");
        })
        .catch(error => console.log('error', error));
}