  const { createApp, ref, onMounted, watch } = Vue;

      const shoppingCart = {
        setup() {        
          const cart = ref(getCartFromLocalStorage());
          const options = ref({
            alarma: false,
            polarizado: false
          })

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
          
          return {
            cart,
            options,
            clearCart,
            removeItem
          };
        },
        template: 
        `<div class="cart" >
        <h2>MI CARRITO</h2>


        <div v-for="item in cart" :key="item.id" class="conteiner">
        <div class="img__cart">
            <img :src="'./assets/img/' + item.model + '.webp'" alt="">
        </div>
        <div class="card__description">
            <h4>{{ item.brand }}</h4> 
            <p>{{ item.model }}</p>
            <p>(Año: {{ item.year }})</p>
        </div>
        <button @click="removeItem(item.id)"><i class="fa-solid fa-xmark"></i></button>
        <div class="column">
            <div class="card__price">
                <p>Precio: {{ item.price }}</p>
            </div>
            
        </div>
        </div>

        <button @click="clearCart" class="cart__btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="resume__conteiner">
              <h3>Resumen del Pedido</h3>
              
                    <div class="checkbox">
                        <input type="checkbox" id="alarma" v-model="options.alarma">
                        <label for="alarma">Añadir Alarma</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" id="polarizado" v-model="options.polarizado">
                        <label for="polarizado">Añadir Polarizado</label>
                    </div>
                    
              <h3>Total</h3>
        </div>`
      };

      createApp(shoppingCart).mount("#shoppingCart");