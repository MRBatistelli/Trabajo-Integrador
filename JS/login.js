const { createApp, ref } = Vue;

createApp({
    setup() {
        const email = ref('');
        const password = ref('');
        const loading = ref(false);
        const error = ref(null);
        const message = ref('');
        const loguedUser = ref([]);
        const url = "https://mrbati.pythonanywhere.com/users"


        function saveLoggedUserToLocalStorage() {
            localStorage.setItem("loggedUser", JSON.stringify(loguedUser.value));
          }

        const login = async () => {
            loading.value = true;
            error.value = null;
            try {
                const response = await fetch(url);
                const users = await response.json();
                const user = users.find(user => user.mail === email.value && user.password === password.value);
                if (user) {
                    message.value = 'Login exitoso';                    
                    if(user.admin === true){
                        window.location.href = "./index.html";
                    }else{window.location.href = "./index.html";}
                    loguedUser.value.push(user);
                    saveLoggedUserToLocalStorage()
                } else {
                    message.value = 'Error de login: Credenciales inválidas';                    
                }
            } catch (err) {
                error.value = err;
                console.error("Error al obtener los datos:", err);
            } finally {
                loading.value = false;
            }
        };

        return {
            email,
            password,
            loading,
            error,
            message,
            login
        };
    }
}).mount('#app');
