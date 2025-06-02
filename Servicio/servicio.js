document.getElementById("formReclamo").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const datos = {
    nombre: form.nombre.value,
    fecha: form.fecha.value,
    domicilio: form.domicilio.value,
    email: form.email.value,
    telefono: form.telefono.value,
    dni: form.dni.value,
    bien: form.bien.value,
    detalle: form.detalle.value,
    pedido: form.pedido.value
  };

  // Simular envío de datos
  console.log("Formulario enviado:", datos);

  alert("¡Gracias! Su reclamo ha sido registrado correctamente.");
  form.reset();
});
