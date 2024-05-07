//Selecionar etiquetas
const header = document.querySelector('#header');
const footer = document.querySelector('#footer');


header.innerHTML = `<section class="nav__logo">
<img class="nav__img" src="./assets/img/logo.webp" alt="logo">
<a href="index.html" class="nav__index">
    <h1 class="nav__title">LOS INDOMABLES</h1>
    <p>Fuerza y Pasión sobre Ruedas</p>
</a>
</section>

<div class="responsive__menu-abrir" id="abrir"><i class="fa-solid fa-bars"></i></div>


<nav class="nav__conteiner" id="nav">

<div class="responsive__menu-cerrar" id="cerrar"><i class="fa-solid fa-xmark"></i></div>

<ul class="list">
    <li class="list__li"><a class="list__item list--register" href="./register.html">Registrarse</a></li>
    <li class="list__li"><a class="list__item list--login" href="./login.html">Ingresa <i
                class="fa-solid fa-right-to-bracket"></i></a></li>
    <li class="list__li"><a class="list__item list--cart" href="./buy.html"><i
                class="fa-solid fa-cart-shopping"></i></a></li>
</ul>

</nav>`,

    footer.innerHTML = `<div class="footer__nav">
<div class="img__conteiner"><img class="footer__img" src="./assets/img/logo.webp" alt="logo"></div>
<section>
    <nav>
        <ul class="nav__list">
            <li class="nav__item"><a href="./about.html">Acerca de Nosotros</a></li>
            <li class="nav__item"><a href="./contact.html">Contacto</a></li>
            <li class="nav__item"><a href="./paymentMethods.html">Medios de Pago</a></li>
            <li class="nav__item"><a href="./warranty.html">Garantia</a></li>
        </ul>
    </nav>
</section>
<section>
    <nav>
        <ul class="nav__list social__media">
            <li class="nav__item"><a href="https://twitter.com/?lang=es" target="_blank"><i
                        class="fa-brands fa-x-twitter"></i></a></li>
            <li class="nav__item"><a href="https://www.instagram.com/" target="_blank"><i
                        class="fa-brands fa-instagram"></i></a>
            </li>
            <li class="nav__item"><a href="https://www.facebook.com/" target="_blank"><i
                        class="fa-brands fa-facebook"></i></a>
            </li>
            <li class="nav__item"><a href="https://www.linkedin.com/" target="_blank"><i
                        class="fa-brands fa-linkedin"></i></a>
            </li>
             
        </ul>          
    </nav>      
</section>  
</div>
<div class="team">
    <h3 class="team__name">Desarrolado por: DIEGO LAIME - ENZO ESQUERCIA - JOSE GONZALEZ - MAURO BATISTELLI</h3>
</div> `;

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
