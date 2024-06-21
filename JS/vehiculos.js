
const { createApp, ref, onMounted, watch, reactive } = Vue;

const App = {
  setup() {
    const loading = ref(true);
    const error = ref(null);
    const vehiculos = ref([]);
    const vehiculo = reactive({
        id: 0,
        brand: "",
        model: "",
        year: "",
        price: 0,
        stock: 0,
        image: ""
    });
    
const url = "https://mrbati.pythonanywhere.com/vehiculos"
        
const fetchData = async () => {
      try {
        const results = await fetch(url);
        const data = await results.json();
        vehiculos.value = data;
      } catch (err) {
        error.value = err;
        console.error("Error al obtener los datos:", err);
      } finally {
        loading.value = false;
      }
    };

    const eliminar = async (id) => {
      const deleteUrl = `${url}/${id}`;
      const options = {
        method: 'DELETE',
      };
      try {
        await fetch(deleteUrl, options);
        alert("Registro Eliminado");
        fetchData(); // Actualiza la lista después de eliminar
      } catch (err) {
        console.error(err);
      }
    };

    const modificar = async () => {
      const updateUrl = `${url}/${vehiculo.id}`;
      const options = {
        body: JSON.stringify(vehiculo),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      };
      try {
        await fetch(updateUrl, options);
        alert("Registro modificado");
        fetchData();
        window.location.href = "./admin.html";
      } catch (err) {
        console.error(err);
        alert("Error al modificar Vehiculo");
      }
    };


    const agregar = async () => {
      const options = {
        body: JSON.stringify(vehiculo),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      };
      try {
        await fetch(url, options);
        alert("Registro grabado");
        window.location.href = "./admin.html";
      } catch (err) {
        console.error(err);
        alert("Error al agregar Vehiculo");
      }
    };

    const cargarVehiculo = async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) {
        try {
          const result = await fetch(`${url}/${id}`);
          const data = await result.json();
          Object.assign(vehiculo, data);
        } catch (err) {
          error.value = err;
          console.error("Error al obtener los datos:", err);
        } finally {
          loading.value = false;
        }
      }
    };
      
    
      
    
        
    onMounted(() => {
      fetchData();
      cargarVehiculo();
    });



    return {
        loading,
        error,
        vehiculos,
        vehiculo,
        eliminar,
        modificar,
        agregar
                             
      };
    },

};

createApp(App).mount("#app");
