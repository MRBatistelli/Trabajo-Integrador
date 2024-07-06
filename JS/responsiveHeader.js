(function () {
    const { createApp, ref, onMounted } = Vue;


    const header = {
        setup() {
            const user = ref([]);


            function getLoggedUserFromLocalStorage() {
                const loggedUser = localStorage.getItem("loggedUser");
                return loggedUser ? JSON.parse(loggedUser) : null;
            }

            function logout() {                                
                localStorage.removeItem('loggedUser');
                localStorage.removeItem('cartId')
                localStorage.removeItem('shoppingCart')
                window.location.href = '/';

            }


            onMounted(() => {
                const loggedUser = getLoggedUserFromLocalStorage();
                if (loggedUser) {
                    user.value = loggedUser;
                    console.log('user.value after set:', user.value);
                } else {
                    console.log('No user is logged in');
                }
            });


            return {
                user,
                logout
            };
        },

        template: `
    <section class="nav__logo">
        <img class="nav__img" src="./assets/img/logo.webp" alt="logo">
        <a href="index.html" class="nav__index">
            <h1 class="nav__title">LOS INDOMABLES</h1>
            <p>Fuerza y Pasión por los Autos</p>
        </a>
    </section>

    <div class="responsive__menu-abrir" id="abrir"><i class="fa-solid fa-bars"></i></div>

    <nav class="nav__conteiner" id="nav">
        <div class="responsive__menu-cerrar" id="cerrar"><i class="fa-solid fa-xmark"></i></div>

        <ul class="list">
            <li v-if="user.length == 0" class="list__li"><a class="list__item list--register" href="./register.html">Registrarse</a></li>
            <li v-else class="list__li"><a class="list__item list--register" href="./profile.html">¡Hola {{user[0].name}}!</a></li>
            <li v-if="user.length == 0" class="list__li"><a class="list__item list--login" href="./login.html">Ingresar <i class="fa-solid fa-right-to-bracket"></i></a></li>
            <li v-else class="list__li"><a class="list__item list--logout" v-on:click="logout">Salir <i class="fa-solid fa-right-from-bracket"></i></a></li>
            <li class="list__li"><a class="list__item list--cart" href="./buy.html"><i class="fa-solid fa-cart-shopping"></i></a></li>            
        </ul>
    </nav>`
    };

    createApp(header).mount("#header");
})();

//MENU RESPONSIVO

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