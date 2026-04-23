    //Movimiento del ratón
const cursor = document.querySelector(".cursor-personalizado");

document.addEventListener("mousemove", (e) => {
    cursor.style.setProperty("--x", e.clientX + "px" )
    cursor.style.setProperty("--y", e.clientY + "px" )
});
document.addEventListener("mouseover", (e) => {
    if(e.target.closest("a, button, input, .carrusel")){
        cursor.classList.add("cursor-activo")
    }else{
        cursor.classList.remove("cursor-activo")
    }
});

const botonMenu = document.querySelector(".btn-menu");
const navMenu = document.querySelector("nav.menu");
const trazoBruto = document.querySelector(".parallaxText");

botonMenu.addEventListener("click", () =>{
    botonMenu.classList.toggle("desplegado")
    navMenu.classList.toggle("activo")
    trazoBruto.classList.toggle("oscuro")
    if(navMenu.classList.contains("activo")){
        document.body.style.overflow = "hidden"
    }else{
        document.body.style.overflow = ""
    }
});

    //Animacion Parallax Typo
        const deslizarDrch = document.querySelector(".trazo p");
        const deslizarIzq = document.querySelector(".bruto p");
        let scrollActual = 0;
        let targetScroll = 0;
        const ease = 0.8;

        function AnimacionTipo(){

            if (navMenu.classList.contains("activo")){
                targetScroll = 0; 
            } else {
                targetScroll = window.scrollY;
            };

            scrollActual += (targetScroll - scrollActual) * ease;

            const widthDrch = deslizarDrch.offsetWidth / 2;
            const widthIzq = deslizarIzq.offsetWidth / 2;

            const xDrch = -widthDrch + (scrollActual * 0.2 % widthDrch);
            const xIzq = -(scrollActual * 0.2 % widthIzq);

            deslizarDrch.style.transform = `translateX(${xDrch}px)`;
            deslizarIzq.style.transform = `translateX(${xIzq}px)`;
        requestAnimationFrame(AnimacionTipo);
        };
        AnimacionTipo();

    //Animación header
    const header = document.querySelector("header");
    let scrollDown = window.scrollY;

    window.addEventListener("scroll", () => {
        const scrollActualY = window.scrollY;
        
        if(scrollActualY > scrollDown && scrollActualY > 80 && window.innerWidth > 1180){
            header.classList.add("header-hidden")
        }else{
            header.classList.remove("header-hidden")
        }
        scrollDown = scrollActualY
    });

const logo = document.querySelector(".logo");

document.addEventListener("mousemove", (e) => {
    const posicion = logo.getBoundingClientRect();
    const xCentro = posicion.left + (posicion.width / 2);
    const yCentro = posicion.top + (posicion.height / 2);

    const distanciaX = e.clientX - xCentro;
    const distanciaY = e.clientY - yCentro;
        //Rango de atracción
    const rangoX = 300;
    const rangoY = 80;

    if(Math.abs(distanciaX) < rangoX && Math.abs (distanciaY) < rangoY){
        const moverX = distanciaX * 0.10;
        const moverY = distanciaY * 0.3;
        logo.style.transform = `translate(${moverX}px, ${moverY}px)`;
    }else{
        logo.style.transform = `translate(0px, 0px)`;
    }
});

window.addEventListener("load", () => {
    const carrusel = document.querySelector(".carrusel");
    let isDown = false;
    let startX;
    let scrollLeft;
    let autoPlayInterval;

    // 1. Clonamos las imágenes para el efecto infinito
    carrusel.innerHTML += carrusel.innerHTML;

    // 2. FUNCIÓN PARA INICIAR EL MOVIMIENTO AUTOMÁTICO
    const startAutoPlay = () => {
        clearInterval(autoPlayInterval)

        autoPlayInterval = setInterval(() => {
            if (!isDown) { // Solo se mueve si el usuario no está arrastrando
                carrusel.scrollLeft += 1; // Velocidad (1px cada 40ms)
            }
        }, 30);
    };

    // 3. FUNCIÓN PARA DETENER EL MOVIMIENTO
    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // --- INTERACCIÓN DE ARRASTRE ---
    carrusel.addEventListener('mousedown', (e) => {
        isDown = true;
        stopAutoPlay(); // Pausamos el auto-scroll al tocar
        startX = e.pageX - carrusel.offsetLeft;
        scrollLeft = carrusel.scrollLeft;
    });

    carrusel.addEventListener('mouseleave', () => {
        isDown = false;
        startAutoPlay(); // Reanudamos al salir el ratón
    });

    carrusel.addEventListener('mouseup', () => {
        isDown = false;
        startAutoPlay(); // Reanudamos al soltar el click
    });

    carrusel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carrusel.offsetLeft;
        const walk = (x - startX) * 2; 
        carrusel.scrollLeft = scrollLeft - walk;
    });

    // --- LÓGICA DE BUCLE INFINITO (TELETRANSPORTE) ---
    carrusel.addEventListener("scroll", () => {
        const mitad = carrusel.scrollWidth / 2;
        
        if (carrusel.scrollLeft >= mitad) {
            carrusel.scrollLeft = 1;
        } else if (carrusel.scrollLeft <= 0) {
            carrusel.scrollLeft = mitad - 1;
        }
    });
    startAutoPlay();

});
console.log("Contenido cargado correctamente.")