const { createApp, ref, onMounted } = Vue;

const profile = {
    setup() {
        const user = ref({});
        const error = ref(null);
        const url = "https://mrbati.pythonanywhere.com/users";

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
                try {
                    const fetchedUser = await cargarUsuario(loggedUser[0].id, url);

                    if (loggedUser[0].id === fetchedUser.id) {
                        user.value = fetchedUser;
                        console.log('User data loaded from database:', user.value);
                    } else {
                        console.error('User ID mismatch');
                    }
                } catch (err) {
                    error.value = err;
                    console.error("Error al cargar el usuario:", err);
                }
            } else {
                console.log('No user is logged in or user ID is missing');
            }
        });

        return {
            user,
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
                            <li class="list__li"><a class="btn btn-primary m-2" href="./vehiculos.html">Vehiculos</a>
                            </li>
                            <li class="list__li"><a class="btn btn-primary m-2" href="./users.html">Usuarios</a></li>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
};

createApp(profile).mount("#profile");