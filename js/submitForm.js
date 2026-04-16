function submitForm() {
    const nombre = document.querySelector('input[name="nombre"]').value;
    const correo = document.querySelector('input[name="correo"]').value;
    const mensaje = document.querySelector('input[name="mensaje"]').value;

    console.log(nombre,"nombre")
    console.log(correo,"correo")
    console.log(mensaje,"idea")

    fetch("https://hook.eu1.make.com/elp6ioymxouae46u3rjq4rw6ijrkoowi", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-make-apikey":"trazo_bruto_9f3KxP2Lm8Qv7ZrA6dHs4YtNwE1uB5cJ"
        },
        body: JSON.stringify({
            nombre,
            correo,
            mensaje
        })
    })
    .catch(err => {
        console.error(err);
    });
}