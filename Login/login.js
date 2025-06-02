
// Script para manejar la validación del formulario
const loginForm = document.getElementById("loginForm");
const messageContainer = document.getElementById("messageContainer");
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevenir el envío tradicional del formulario

  // Limpiar mensajes anteriores
  messageContainer.innerHTML = "";
  messageContainer.className = "mt-4 text-center text-sm"; // Reset class

  // Obtener los valores de los campos
  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validaciones básicas
  if (nombre === "") {
    displayMessage("Por favor, ingresa tu nombre.", "error");
    return;
  }

  if (email === "") {
    displayMessage("Por favor, ingresa tu correo electrónico.", "error");
    return;
  } else if (!isValidEmail(email)) {
    displayMessage("Por favor, ingresa un correo electrónico válido.", "error");
    return;
  }

  if (password === "") {
    displayMessage("Por favor, ingresa tu contraseña.", "error");
    return;
  } else if (password.length < 6) {
    // Ejemplo: contraseña mínima de 6 caracteres
    displayMessage("La contraseña debe tener al menos 6 caracteres.", "error");
    return;
  }

  // Simulación de verificación exitosa
  // En una aplicación real, aquí harías una llamada a un servidor para verificar las credenciales.
  displayMessage(
    `¡Verificación exitosa, ${nombre}! Redirigiendo... (simulado)`,
    "success"
  );

  // Aquí podrías, por ejemplo, limpiar el formulario o redirigir al usuario
  // loginForm.reset();
  // setTimeout(() => { window.location.href = '/dashboard'; }, 2000); // Ejemplo de redirección
});

/**
 * Muestra un mensaje en el contenedor de mensajes.
 * @param {string} text - El texto del mensaje.
 * @param {string} type - El tipo de mensaje ('success' o 'error').
 */
function displayMessage(text, type) {
  messageContainer.textContent = text;
  if (type === "success") {
    messageContainer.classList.add("text-green-600");
    messageContainer.classList.remove("text-red-600");
  } else if (type === "error") {
    messageContainer.classList.add("text-red-600");
    messageContainer.classList.remove("text-green-600");
  }
}

/**
 * Valida un formato básico de correo electrónico.
 * @param {string} email - El correo electrónico a validar.
 * @returns {boolean} - True si el formato es válido, false en caso contrario.
 */
function isValidEmail(email) {
  // Expresión regular simple para validación de email.
  // Para una validación más robusta, se podrían usar librerías o regex más complejas.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
