const { createApp, ref, onMounted, watch } = Vue;

const App = {
  setup() {
    const loading = ref(true);
    const error = ref(null);
    const cars = ref([]);
    const cart = ref([]);


    // Fetch data cuando el componente se monta
    onMounted(async () => {
      try {
        const url = "https://mrbati.pythonanywhere.com/vehiculos"
        const results = await fetch(url);
        const data = await results.json();
        cars.value = data;
      } catch (err) {
        error.value = err;
        console.error("Error al obtener los datos:", err);
      } finally {
        loading.value = false;
      }
    });

    
    // Método para guardar el carrito en localStorage
    function saveCartToLocalStorage() {
      localStorage.setItem("shoppingCart", JSON.stringify(cart.value));
    }


    // Funcion para agregar artículos al carrito
    function addToCart(car) {

      // Comprobar si el artículo ya está en el carrito
      const itemInCart = cart.value.find(item => item.id === car.codeFipe);
      if (itemInCart) {
        alert(`El artículo ${car.model} ya está en el carrito.`);
        return;
      }

      //Pasar precio de string a num
      let price = 'N/A';
      if (car.price) {
        let priceJson = car.price;        
        price = parseFloat(priceJson);
      }


      //agregar producto al carrito
      const newItem = {
        image: car.image,
        brand: car.brand || 'Desconocido',
        model: car.model || 'Desconocido',
        year: car.year || 'N/A',
        price: price || 'N/A',        
        id: car.id
      };
      cart.value.push(newItem);
      alert(`Agregaste ${car.model} al carrito.`);
      saveCartToLocalStorage();
    }

    return {
      loading,
      error,
      cars,
      addToCart,
    };
  },
  template: `
      <div>
        <div v-if="loading" class="main__banner">Cargando...</div>
        <div v-else-if="error" class="main__banner">No se pudieron cargar datos.</div>
        <div v-else id="conteiner">
            <div v-for="car in cars" :key="car.model" class="car__card">
                <div class="img__conteiner">
                    <img class="card__img" :src="car.image"
                        :alt="'Imagen de ' + car.model" />
                </div>
                <div class="text__conteiner">
                    <h3>{{ car.brand }}</h3>
                    <h4>{{ car.model }}</h4>
                    <p>Año: {{ car.year }}</p>
                    <p>Precio: $ {{ car.price }}</p>
                    <p>Stock: {{ car.stock }}</p>
                </div>
                <button @click="addToCart(car)" class="cart__button">Agregar al Carrito</button>
            </div>
        </div>
    </div>`
};

createApp(App).mount("#app");