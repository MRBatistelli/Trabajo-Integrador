const { createApp, ref, onMounted, computed } = Vue;

const shoppingCart = {
  setup() {
    const loading = ref(true);
    const error = ref(null);
    const cart = ref([]);
    const cartID = ref(null);
    const vehiculos = ref([]);

    // Método para obtener el carrito desde API
    const url = "https://mrbati.pythonanywhere.com/cartitems";

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
        .map(item => {
          const vehiculo = vehiculos.value.find(v => v.id === item.vehiculoID);
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

    // Método para guardar eliminar cartId
    function deleteCartIdFromLocalStorage() {
      localStorage.removeItem("cartId");
    }

    // Método para vaciar el carrito y eliminar todos los artículos del backend
    async function clearCart() {
      try {
        const cartId = localStorage.getItem("cartId");
        if (!cartId) {
          throw new Error("No hay carrito activo.");
        }

        // Función para eliminar el carrito creado
        const deleteCart = async (cartId) => {
          const deleteCartUrl = `https://mrbati.pythonanywhere.com/carts/${cartId}`;
          const deleteCartOptions = {
            method: 'DELETE',
          };
          const deleteCartResponse = await fetch(deleteCartUrl, deleteCartOptions);
          if (!deleteCartResponse.ok) {
            throw new Error(`Error al eliminar el carrito: ${deleteCartResponse.statusText}`);
          }
        };

        // Función para eliminar todos los artículos del carrito en el backend
        const deleteItemPromises = cart.value.map(async (item) => {
          const deleteItemUrl = `https://mrbati.pythonanywhere.com/cartitems/${item.id}`;
          const deleteItemOptions = {
            method: 'DELETE',
          };
          const deleteItemResponse = await fetch(deleteItemUrl, deleteItemOptions);
          if (!deleteItemResponse.ok) {
            throw new Error(`Error al eliminar el artículo: ${deleteItemResponse.statusText}`);
          }
        });

        // Esperar a que todas las eliminaciones de artículos se completen
        await Promise.all(deleteItemPromises);

        // Eliminar el carrito en el backend
        await deleteCart(cartId);

        // Vaciar el carrito en el frontend
        cart.value = [];
        deleteCartIdFromLocalStorage();
        saveCartToLocalStorage();
        alert("Carrito vaciado exitosamente.");
      } catch (err) {
        console.error("Error al vaciar el carrito:", err);
      }
    }




    // Método para eliminar un artículo del carrito
    async function removeItem(itemId) {
      try {
        const cartId = localStorage.getItem("cartId");
        if (!cartId) {
          throw new Error("No hay carrito activo.");
        }

        // Encuentra el item en el carrito
        const cartItem = cart.value.find(item => item.id);
        console.log(cartItem)
        if (!cartItem) {
          throw new Error("El artículo no se encuentra en el carrito.");
        }

        const deleteUrl = `https://mrbati.pythonanywhere.com/cartitems/${cartItem.id}`;
        const options = {
          method: 'DELETE',
        };

        const response = await fetch(deleteUrl, options);
        if (!response.ok) {
          throw new Error(`Error al eliminar el artículo: ${response.statusText}`);
        }

        alert("Artículo eliminado del carrito.");

        // Actualiza el carrito eliminando el item localmente
        cart.value = cart.value.filter(item => item.id !== itemId);
        saveCartToLocalStorage();
        window.location.href = "./buy.html";
      } catch (err) {
        console.error("Error al eliminar el artículo:", err);
      }
    }

    // Finalizar compra
    function buyCart() {
      if (cart.value.length === 0) {
        alert("El carrito está vacío. Agrega al menos un artículo.");
        return;
      }
      cart.value = [];
      saveCartToLocalStorage();
      deleteCartIdFromLocalStorage();
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
    `<div class="cart">
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
        <div class="resume__conteiner">
          <h3>Su Compra incluye:</h3>         
          <h4><i class="fa-solid fa-gift"></i> Polarizado y Alarma</h4>         
          <h4><i class="fa-solid fa-gift"></i> Transferencia</h4>     
          <h3>Total: $ {{ totalPrice }}</h3>
          <button @click="buyCart" class="buy__btn">Finalizar Compra</button>
        </div>
      </div>`
};

createApp(shoppingCart).mount("#shoppingCart");