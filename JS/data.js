const { createApp, ref, onMounted } = Vue;
const App = {
  setup() {
    const loading = ref(true);
    const error = ref(null);
    const cars = ref([]);
    const cart = ref([]);
    const loggedUser = localStorage.getItem("loggedUser");
    const loggedUserArray = JSON.parse(loggedUser)
        

    
    // Fetch data cuando el componente se monta
    onMounted(async () => {
      try {
        const url = "https://mrbati.pythonanywhere.com/vehiculos";
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

    // Función para crear un carrito en el backend
    async function createCart() {
      try {
        const urlCarts = "https://mrbati.pythonanywhere.com/carts";
        const userID = loggedUserArray[0].id;
        console.log(userID)
        const response = await fetch(urlCarts, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userID })
        });
        const data = await response.json();
        return data.id; // Devolver el ID del carrito creado
      } catch (err) {
        console.error("Error al crear el carrito:", err);
        throw err;
      }
    }

    // Función para agregar artículos al carrito
    async function addToCart(car) {
      try {
        // Comprobar si el usuario esta logueado     
      if (loggedUser === null) {        
        alert('Debe registrarse para poder realizar una compra');
        return;
      }

        // Pasar precio de string a num
        let price = 'N/A';
        if (car.price) {
          price = parseFloat(car.price);
        }

        // Crear un nuevo carrito si no existe
        let cartId = localStorage.getItem("cartId");
        if (!cartId) {
          cartId = await createCart();
          localStorage.setItem("cartId", cartId);
        }

        // Agregar producto al carrito en el backend
        const urlCartItems = "https://mrbati.pythonanywhere.com/cartitems";
        await fetch(urlCartItems, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cartID: parseInt(cartId),
            vehiculoID: parseInt(car.id),
            quantity: 1
          })
        });

        // Agregar producto al carrito en el frontend
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
      } catch (err) {
        console.error("Error al agregar el artículo al carrito:", err);
      }
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
                </div>
                <button @click="addToCart(car)" class="cart__button">Agregar al Carrito</button>
            </div>
        </div>
    </div>`
};

createApp(App).mount("#app");