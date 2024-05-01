//selecionar etiquetas
const abrirMenu = document.querySelector("#abrir");
const cerrarMenu = document.querySelector("#cerrar");
const nav = document.querySelector("#nav");

//Escuchador de eventos para abrir y cerrar el munú
abrirMenu.addEventListener("click", () => {
    nav.classList.add('visible');
});
cerrarMenu.addEventListener('click', () => {
    nav.classList.remove('visible')
});

