function submitForm() {
    // 1. Capturamos los valores
    const nombre = document.querySelector('input[name="nombre"]').value;
    const correo = document.querySelector('input[name="correo"]').value;
    const mensaje = document.querySelector('input[name="mensaje"]').value;

    const inputs = document.querySelectorAll(".form input");
    const boton = document.querySelector(".form button");

    // Bloqueamos el botón temporalmente para que el usuario no envíe 2 veces
    boton.textContent = "Enviando...";
    boton.disabled = true;

    // 2. ENVIAMOS LOS DATOS A TU PHP (Él se encarga de leer el .env y hablar con Make)
    fetch("/enviar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            correo: correo,
            mensaje: mensaje
        })
    })
    .then(respuesta => {
        // Comprobamos que el PHP y Make respondieron bien
        if (!respuesta.ok) {
            throw new Error("Error en la comunicación con el servidor");
        }
        return respuesta.text();
    })
    .then(data => {
        // 3. SI TODO FUE BIEN: Vaciamos campos y avisamos
        console.log("¡Enviado con éxito!", data);
        
        inputs.forEach(input => {
            input.value = "";
        });
        
        boton.textContent = "¡Mensaje enviado!";
    })
    .catch(err => {
        // SI ALGO FALLÓ
        console.error("Hubo un problema:", err);
        boton.textContent = "Error al enviar";
    })
    .finally(() => {
        // Pase lo que pase, a los 3 segundos devolvemos el botón a la normalidad
        setTimeout(() => {
            boton.textContent = "Enviar respuesta";
            boton.disabled = false;
        }, 3000);
    });
}