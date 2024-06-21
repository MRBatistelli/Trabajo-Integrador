  const { createApp, ref, onMounted, computed } = Vue;

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
                  
          // Metodo para vaciar el carrito
          function clearCart() {
            cart.value = [];
            saveCartToLocalStorage();
          }

          // Metodo para eliminar 1 articulo
          function removeItem(id) {
            cart.value = cart.value.filter(item => item.id !== id);
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
      return cart.value.reduce((total, item) => {
        {
          return total + item.price;
        }
        
      }, 0);
    });
          
          return {
            cart,        
            clearCart,
            removeItem,
            buyCart,
            totalPrice
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