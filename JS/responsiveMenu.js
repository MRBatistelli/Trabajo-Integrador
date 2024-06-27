//Selecionar etiquetas
const footer = document.querySelector('#footer');


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
    <p class="team__name">Desarrolado por: DIEGO LAIME - ENZO ESQUERCIA - JOSE GONZALEZ - MAURO BATISTELLI</p>
</div> `;