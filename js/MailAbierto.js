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
        const avatar = document.createElement('img');
        nombre.innerText = data.from.name;
        fecha.innerText = data.time;
        asunto.innerText = data.subject;
        mensaje.innerHTML = data.message;
        avatar.innerText = data.from.avatar;

        div.appendChild(nombre);
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
                console.log(emails);
                let elMensaje = emails.find((msg) => msg.id === id);
                createMensaje(elMensaje);
            })

        .catch(error => console.log('error', error));
    }

    api(folder);
}

mailAbierto();