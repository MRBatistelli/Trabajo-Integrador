//Seleccionar inputs
function checkForms() {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const emailError = document.querySelector("#check__user");
    const passwordError = document.querySelector("#check__password");

    let error = false;

    // Reset de mensajes de error
    emailError.innerText = "\u00A0";
    passwordError.innerText = "\u00A0"; 

    // Verificar campo email vacío
    if (emailInput.value.trim() === "") {
        emailError.innerText = "Completa usuario/mail";
        error = true;
        emailInput.focus();
    }

    // Verificar longitud de la contraseña
    if (passwordInput.value.trim().length < 8) {
        passwordError.innerText = "La clave debe tener al menos 8 caracteres";
        if (!error) {
            passwordInput.focus();
        }
        error = true;
    }

    if (!error) {
        // Si no hay errores, reinicia campos y muestra un mensaje de confirmación
        emailInput.value = "";
        passwordInput.value = "";
        emailError.innerText = "\u00A0";
        passwordError.innerText = "\u00A0";

        alert("Los datos fueron ingresados correctamente");
    }

    return !error; // Devuelve falso si hay un error para evitar el envío del formulario
}