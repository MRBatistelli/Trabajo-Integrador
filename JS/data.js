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
            const urls = [
              "https://fipe.parallelum.com.br/api/v2/cars/brands/29/models/7758/years/2021-1",
              "https://fipe.parallelum.com.br/api/v2/cars/brands/29/models/8058/years/2018-1",
              "https://fipe.parallelum.com.br/api/v2/cars/brands/44/models/1943/years/2000-3",
              "https://fipe.parallelum.com.br/api/v2/cars/brands/44/models/4336/years/2008-1",
              "https://fipe.parallelum.com.br/api/v2/cars/brands/59/models/6277/years/2017-3",
              "https://fipe.parallelum.com.br/api/v2/cars/brands/59/models/8370/years/2019-1"
            ];
            const results = await Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all(results.map(res => res.json()));
            cars.value = data;
          } catch (err) {
            error.value = err;
            console.error("Error fetching data:", err);
          } finally {
            loading.value = false;
          }
        });

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
            id: car.codeFipe
          });
          saveCartToLocalStorage();
          alert(`Agregaste ${car.model} al carrito.`);
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
                    <img class="card__img" :src="'./assets/img/' + car.model + '.webp'"
                        :alt="'Imagen de ' + car.model" />
                </div>
                <div class="text__conteiner">
                    <h3>{{ car.brand }}</h3>
                    <h4>{{ car.model }}</h4>
                    <p>Año: {{ car.modelYear }}</p>
                    <p>Precio: {{ car.price }}</p>
                </div>
                <button @click="addToCart(car)" class="cart__button">Agregar al Carrito</button>
            </div>
        </div>
    </div>`
    };

    createApp(App).mount("#app");