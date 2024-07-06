const { createApp, ref, onMounted } = Vue;

const profile = {
    setup() {
        const user = ref({});
        const userCart = ref([]);        
        const error = ref(null);
        const loading = ref(true);
        const url = "https://mrbati.pythonanywhere.com/users";
        const urlCart = "https://mrbati.pythonanywhere.com/carts";

        async function fetchDataCart(loggedUserID) {
            try {
                const results = await fetch(urlCart);
                const data = await results.json();
                userCart.value = data.filter(item => item.userID === loggedUserID);
                console.log(`Compras realizadas:`, userCart.value);
            } catch (err) {
                error.value = err;
                console.error("Error al obtener los datos:", err);
            } finally {
                loading.value = false;
            }
        }

        function getLoggedUserFromLocalStorage() {
            const loggedUser = localStorage.getItem("loggedUser");
            return loggedUser ? JSON.parse(loggedUser) : null;
        }

        async function cargarUsuario(id, url) {
            try {
                const response = await fetch(`${url}/${id}`);
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                throw error;
            }
        }

        onMounted(async () => {
            const loggedUser = getLoggedUserFromLocalStorage();            

            if (loggedUser && loggedUser[0].id) {
                const loggedUserID = loggedUser[0].id; // Mueve la definición aquí
                try {
                    const fetchedUser = await cargarUsuario(loggedUserID, url);

                    if (loggedUserID === fetchedUser.id) {
                        user.value = fetchedUser;
                        console.log('Usuario cargado desde la base de datos:', user.value);
                        await fetchDataCart(loggedUserID); // Pasar el ID del usuario logueado
                    } else {
                        console.error('ID de usuario no encontrado');
                    }
                } catch (err) {
                    error.value = err;
                    console.error("Error al cargar el usuario:", err);
                }
            } else {
                console.log('El usuario no se encuentra logueado');
            }
        });

        return {
            user,
            userCart,            
            error                
        };
    },

    template: `<div class="main-body">
        <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                            <img src="./assets/img/profile.webp" alt="Admin" class="rounded-circle" width="150">
                            <div class="mt-3">
                                <h4>{{user.name}}</h4>
                                <p class="text-secondary mb-1">{{user.typeUser}}</p>
                                <p class="text-muted font-size-sm">{{user.mail}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Nombre:</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {{user.name}} {{user.lastname}}
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Email</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {{user.mail}}
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Tipo de Usuario:</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {{user.typeUser}}
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Sexo:</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {{user.gender}}
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Edad</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {{user.age}}
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-12">
                                <a class="btn btn-info" :href="'updateUser.html?id=' + user.id">Editar</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row gutters-sm">
                    <div class="col-sm-6 mb-3 text-center">
                        <div class="card h-100">
                            <div v-if="user.admin" class="card-body">
                                <h6 class="d-flex align-items-center mb-3">Panel Administrador</h6>
                                <li class="list__li"><a class="btn btn-primary m-2" href="./vehiculos.html">Vehículos</a></li>
                                <li class="list__li"><a class="btn btn-primary m-2" href="./users.html">Usuarios</a></li>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row gutters-sm">
                    <div class="col-sm-6 mb-3 text-center">
                        <div class="card h-100">
                            <div class="card-body">
                                <h6 class="d-flex align-items-center mb-3">Compras Realizadas</h6>
                                <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Nº de Usuario</th>
                            <th scope="col">Nª de Compra</th>
                            <th scope="col">Fecha</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="" v-for="item in userCart" :key="item.id">                            
                            <td>{{item.userID}}</td>
                            <td>{{item.id}}</td>
                            <td>{{item.createdAt}}</td>                            
                        </tr>

                    </tbody>
                </table>
            </div>                      
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
};

createApp(profile).mount("#profile");