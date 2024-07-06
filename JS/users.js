const { createApp, ref, onMounted, watch, reactive } = Vue;

const App = {
    setup() {
        const loading = ref(true);
        const error = ref(null);
        const users = ref([]);
        const user = reactive({
            id: 0,
            name: '',
            lastname: '',
            mail: '',
            gender: '',
            age: '',
            typeUser: '',
            password: '',
            admin: false
        });


        const url = "https://mrbati.pythonanywhere.com/users"

        const fetchData = async () => {
            try {
                const results = await fetch(url);
                const data = await results.json();
                users.value = data;
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
            user.admin = (user.admin === 'true' || user.admin === true);

            const updateUrl = `${url}/${user.id}`;
            const options = {
                body: JSON.stringify(user),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            try {
                await fetch(updateUrl, options);
                alert("Registro modificado");
                fetchData();                
                window.location.href = "./profile.html";
            } catch (err) {
                console.error(err);
                alert("Error al modificar Usuario");
            }
        };


        const agregar = async () => {
            const options = {
                body: JSON.stringify(user),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            try {
                await fetch(url, options);
                alert("Registro grabado");
                window.location.href = "./users.html";
            } catch (err) {
                console.error(err);
                alert("Error al agregar Usuario");
            }
        };

        const cargarUsuario = async () => {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (id) {
                try {
                    const result = await fetch(`${url}/${id}`);
                    const data = await result.json();
                    Object.assign(user, data);
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
            cargarUsuario();
        });



        return {
            loading,
            error,
            users,
            user,
            eliminar,
            modificar,
            agregar,           

        };
    },

};

createApp(App).mount("#app");
