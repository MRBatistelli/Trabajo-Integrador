const { createApp, ref, onMounted, watch } = Vue;

    const shoppingCart = {
      setup() {        
        const cart = ref(getCartFromLocalStorage());

        // Método para obtener el carrito desde localStorage
        function getCartFromLocalStorage() {
          const cartData = localStorage.getItem("shoppingCart");
          return cartData ? JSON.parse(cartData) : [];
        }

        // Método para guardar el carrito en localStorage
        function saveCartToLocalStorage() {
          localStorage.setItem("shoppingCart", JSON.stringify(cart.value));
        }

        // Método para agregar artículos al carrito
        function addToCart(car) {
          cart.value.push({
            brand: car.brand || 'Desconocido',
            model: car.model || 'Desconocido',
            year: car.modelYear || 'N/A',
            price: car.price || 'N/A',
          });
          saveCartToLocalStorage();
          alert(`Agregaste ${car.model} al carrito.`);
        }

        // Método para vaciar el carrito
        function clearCart() {
          cart.value = [];
          saveCartToLocalStorage();
        }
        
        return {
          cart,
          addToCart,
          clearCart
        };
      },
      template: 
      `<div class="cart">
      <h2>Carrito de Compras</h2>
      <ul>
          <li v-for="item in cart" :key="item.model">
              {{ item.brand }} - {{ item.model }} (Año: {{ item.year }}) - Precio: {{ item.price }}
          </li>
      </ul>
      <button @click="clearCart">Vaciar carrito</button>
      </div>`
    };

    createApp(shoppingCart).mount("#shoppingCart");