function mailAbierto() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const folder = urlParams.get('folder');

    console.log(id)

    function createMensaje(data) {
        const div = document.createElement('div');
        const nombre = document.createElement('h2');
        const fecha = document.createElement('h3');
        const asunto = document.createElement('p');
        const mensaje = document.createElement('p');
        const mail = document.createElement('h2');

        asunto.classList.add("select_Asunto");
        mensaje.classList.add("select_Mensaje");
        mail.classList.add("select_Mail");

        nombre.innerText = "Nombre: " + data.from.name;
        mail.innerText = "Mail: " + data.from.email;
        fecha.innerText = "Fecha: " + data.time;
        asunto.innerHTML = "<b>Asunto: </b>" + data.subject;
        mensaje.innerHTML = "<b>Mensaje: </b>" + data.message;

        div.appendChild(nombre);
        div.appendChild(mail);
        div.appendChild(fecha);
        div.appendChild(asunto);
        div.appendChild(mensaje);

        document.getElementById('seleccionado').appendChild(div);
    }

    function api(folder = "inbox") {
        fetch("https://academia.tim.teknosgroup.com/clifton-ba16/api/messages/" + folder, requestOptions)
            .then(data => data.text())
            .then(function(data) {
                let emails = JSON.parse(data);
                let elMensaje = emails.find((msg) => msg.id === id);
                createMensaje(elMensaje);
            })

        .catch(error => console.log('error', error));
    }

    api(folder);
}

mailAbierto();