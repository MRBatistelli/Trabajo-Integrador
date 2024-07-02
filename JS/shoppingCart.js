const { createApp, ref, onMounted, computed } = Vue;

const shoppingCart = {
  setup() {
    const loading = ref(true);
    const error = ref(null);
    const cart = ref([]);
    const cartID = ref([])    
    const vehiculos = ref([]);

    // Método para obtener el carrito desde API

    const url = "https://mrbati.pythonanywhere.com/cartitems"

    const fetchData = async () => {
      try {
        const results = await fetch(url);
        const data = await results.json();
        cart.value = data;
      } catch (err) {
        error.value = err;
        console.error("Error al obtener los datos:", err);
      } finally {
        loading.value = false;
      }
    };

    // Método para obtener los datos de los vehículos desde API
    const fetchVehicleData = async () => {
      try {
        const urlVehiculos = "https://mrbati.pythonanywhere.com/vehiculos";
        const results = await fetch(urlVehiculos);
        const data = await results.json();
        vehiculos.value = data;
      } catch (err) {
        error.value = err;
        console.error("Error al obtener los datos de los vehículos:", err);
      }
    };
    
    // Método para obtener cartID del localStorage
    function getCartIDFromLocalStorage() {
      cartID.value = localStorage.getItem("cartId");
    }

    // Método para combinar los datos del carrito y los vehículos
    const combineData = () => {
      return cart.value
      .filter(item => item.cartID == cartID.value)
      .map(item => { const vehiculo = vehiculos.value.find(v => v.id === item.vehiculoID);
        return {
          ...item,
          ...vehiculo
        };        
      });
    };
    
    // Método para guardar el carrito en localStorage
    function saveCartToLocalStorage() {
      localStorage.setItem("shoppingCart", JSON.stringify(cart.value));
    }

    // Metodo para vaciar el carrito
    function clearCart() {
      cart.value = [];
      cartID.value = [];
      saveCartToLocalStorage();
    }

    // Metodo para eliminar 1 articulo
    function removeItem(id) {
      item.value = item.value.filter(item => item.id !== id);
      saveCartToLocalStorage();
    }

    //Finalizar compra
    function buyCart() {
      if (cart.value.length === 0) {
        alert("El carrito está vacío. Agrega al menos un artículo.");
        return;
      }
      cart.value = [];
      saveCartToLocalStorage();
      alert(`GRACIAS POR SU COMPRA`);
    }


    // Propiedad calculada para obtener el total del carrito
    const totalPrice = computed(() => {
      const combinedData = combineData();
      return combinedData.reduce((total, item) => {
        return total + (parseFloat(item.price) || 0);
      }, 0);
    });

    onMounted(async () => {
      loading.value = true;
      getCartIDFromLocalStorage();
      await fetchData();
      await fetchVehicleData();
      loading.value = false;
    });

    return {
      cart: computed(() => combineData()),
      clearCart,
      removeItem,
      buyCart,
      totalPrice,
      loading,
      error,      
    };
  },
  template:
    `<div class="cart" >
        <h2>MI CARRITO</h2>


        <div v-for="item in cart" :key="item.id" class="conteiner">
        <div class="img__cart">
            <img :src="item.image" :alt="item.model">
        </div>
        <div class="card__description">
            <h4>{{ item.brand }}</h4> 
            <p>{{ item.model }}</p>
            <p>(Año: {{ item.year }})</p>            
        </div>
        <button @click="removeItem(item.id)"><i class="fa-solid fa-xmark"></i></button>
        <div class="column">
            <div class="card__price">
                <p>Precio: $ {{ item.price }}</p>
            </div>
            
        </div>
        </div>

        <button @click="clearCart" class="cart__btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="resume__conteiner">
              <h3>Su Compra incluye:</h3>         
              <h4><i class="fa-solid fa-gift"></i> Polarizado y Alarma</h4>         
              <h4><i class="fa-solid fa-gift"></i> Transferencia</h4>     
              <h3>Total: $ {{ totalPrice }}</h3>
              <button @click="buyCart" class="buy__btn">Finalizar Compra</button>
        </div>`
};

createApp(shoppingCart).mount("#shoppingCart");