//Seleccionar inputs
function checkForms() {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const capchaInput = document.querySelector("#capcha__txt");
    const ageInput = document.querySelector("#age");
    const emailError = document.querySelector("#check__user");
    const passwordError = document.querySelector("#check__password");
    const capchaError = document.querySelector("#check__capcha");
    const ageError = document.querySelector("#check__age");

    let error = false;

    // Reset de mensajes de error
    emailError.innerText = "\u00A0";
    passwordError.innerText = "\u00A0"; 
    capchaError.innerText = "\u00A0";
    ageError.innerText = "\u00A0";
    
    // Verificar campo email vacío
    if (emailInput.value.trim() === "") {
        emailError.innerText = "Completar email";
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

    // Verificar texto ingresado en capcha
    if ((capchaInput.value.trim()).toLowerCase() !== "cac2024") {
        capchaError.innerText = "Verifique el texto ingresado";
        error = true;
        capchaError.focus();
    }

    //verificar que el usuario sea mayor de edad
    const age = parseInt(ageInput.value.trim(), 10);

    if (isNaN(age) || age < 18 || age > 99) {
        ageError.innerText = "Debe tener entre 18 y 99 años de edad para registrarse";
        error = true;
        ageError.focus();
    }



    if (!error) {
        // Si no hay errores, reinicia campos y muestra un mensaje de confirmación
        emailInput.value = "";
        passwordInput.value = "";
        capchaInput.value = "";
        ageInput.value = "";
        emailError.innerText = "\u00A0";
        passwordError.innerText = "\u00A0";
        capchaError.innerText = "\u00A0";
        ageError.innerText = "\u00A0";

        alert("Los datos fueron ingresados correctamente");
    }

    return !error; // Devuelve falso si hay un error para evitar el envío del formulario
}