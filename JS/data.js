//conexión con API

const showData = async () => {
    try {
        const ulr1 = "https://fipe.parallelum.com.br/api/v2/cars/brands/59/models/6277/years/2017-3";
        const ulr2 = "https://fipe.parallelum.com.br/api/v2/cars/brands/44/models/4336/years/2008-1";
        const ulr3 = "https://fipe.parallelum.com.br/api/v2/cars/brands/44/models/1943/years/2000-3";
        const ulr4 = "https://fipe.parallelum.com.br/api/v2/cars/brands/59/models/8370/years/2019-1";
        const results = await Promise.all([
            fetch(ulr1),
            fetch(ulr2),
            fetch(ulr3),
            fetch(ulr4)

        ]);
        const promiseData = await results.map(result => result.json());
        const finalData = Promise.all(promiseData);
        return finalData;

    }catch (err) {
        console.log(err)
    }
};

//seleccionar contenedor donde van las cards

const conteiner = document.getElementById("conteiner");

showData().then((data) => {
    if (data.length === 0) {
      conteiner.textContent = "No se pudieron cargar datos.";
      return;
    }

    // Crear y agregar elementos al DOM con datos obtenidos

  data.forEach((item) => {
      
    //Crear div contenedor general
    const card = document.createElement("div");
    card.className = "car__card";

    //crear div contenedor de imagen y posicionarlo dentro del div general
    const imgConteiner = document.createElement("div");
    imgConteiner.className = "img__conteiner";
    card.appendChild(imgConteiner)

    //crear div contenedor de texto y posicionarlo dentro del div general
    const textConteiner = document.createElement("div");
    textConteiner.className = "text__conteiner";
    card.appendChild(textConteiner)


    // Crear y agregar imagen local
    const imagePath = `./assets/img/${item.model}.webp`;

    const img = document.createElement("img");
    img.className = "card__img"
    img.src = imagePath;
    img.alt = `Imagen de ${item.model}`;
    imgConteiner.appendChild(img);


    //Crear elementos y optener descripciones desde base de datos
    const brand = document.createElement("h3");
    brand.textContent = item.brand || "Fabricante desconocido";

    const name = document.createElement("h4");
    name.textContent = item.model || "Modelo desconocido";

    const year = document.createElement("p");
    year.textContent = `Año: ${item.modelYear || "N/A"}`;
    
    const price = document.createElement("p");
    price.textContent = `Precio: ${item.price || "N/A"}`;

    const cartButton = document.createElement('button');
    cartButton.type = 'button';
    cartButton.className= 'cart__button'
    cartButton.textContent = 'Agregar al Carrito';
    cartButton.addEventListener('click', () => {
      alert(`Agregamos tú: ${item.model} al carrito `);
    });

    

    // Agregar elementos al contenedor de la tarjeta

    textConteiner.appendChild(brand);
    textConteiner.appendChild(name);
    textConteiner.appendChild(year);
    textConteiner.appendChild(price);
    card.appendChild(cartButton);

    // Agregar la tarjeta al contenedor principal

    conteiner.appendChild(card);

  })
});