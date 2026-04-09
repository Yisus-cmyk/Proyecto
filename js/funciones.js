    //Movimiento del ratón
const cursor = document.querySelector(".cursor-personalizado");

document.addEventListener("mousemove", (e) => {
    cursor.style.setProperty("--x", e.clientX + "px" )
    cursor.style.setProperty("--y", e.clientY + "px" )
});
    //Animacion Parallax Typo
const deslizarDrch = document.querySelector(".trazo p");
        const deslizarIzq = document.querySelector(".bruto p");
        let scrollActual = 0;
        let targetScroll = 0;
        const ease = 0.8;

        function AnimacionTipo(){
            targetScroll = window.scrollY;
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

console.log("Contenido cargado correctamente.")