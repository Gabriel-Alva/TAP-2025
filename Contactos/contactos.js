
//GEOLOCALIZACION-------------------------------------------------------------------------
const ubicaciones = [
  {
    nombre: "Pizzería el Paladar del Inka (Av. Velasco Astete Kennedy, B-G-14)",
    lat: -13.537009371433228,
    lng: -71.95460982600919,
  },
  {
    nombre: "El Paladar Del Inka (Larapa Grande)",
    lat: -13.534966771390286,
    lng: -71.90656592600922,
  },
  {
    nombre: "Pizzería el Paladar del Inka (Miguel Grau 1132)",
    lat: -13.52803647124535,
    lng: -71.98152502567294,
  },
];

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function verificarEstadoLocal() {
  const ahora = new Date();
  const hora = ahora.getHours();
  return hora >= 16 && hora < 23 ? "Abierto 🟢" : "Cerrado 🔴";
}
  if (window.location.pathname.endsWith("contactos.html")) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          let distanciaMin = Infinity;
          let ubicacionCercana = "";
          let tiempoCaminando = 0;
          let tiempoBus = 0;

          ubicaciones.forEach((ubi) => {
            const distancia = calcularDistancia(
              userLat,
              userLng,
              ubi.lat,
              ubi.lng
            );
            if (distancia < distanciaMin) {
              distanciaMin = distancia;
              ubicacionCercana = ubi.nombre;
              tiempoCaminando = distancia * 12;
              tiempoBus = distancia * 3;
            }
          });

          const estado = verificarEstadoLocal();
          const resultado = `
            <p><strong>La ubicación más cercana es:</strong> ${ubicacionCercana}</p>
            <p>Distancia aproximada: ${distanciaMin.toFixed(2)} km</p>
            <p><strong>Estado actual del local:</strong> ${estado}</p>
            <p>Tiempo estimado:</p>
            <ul>
              <li>A pie: ${Math.round(tiempoCaminando)} minutos</li>
              <img class="Pato" src="../Recursos/gif/Pato.gif" />
              <li>En bus: ${Math.round(tiempoBus)} minutos</li>
              <img class="Bus" src="../Recursos/gif/Bus.gif" />
            </ul>
          `;
          document.getElementById("ubicacion-mas-cercana").innerHTML =
            resultado;
        },
        () => {
          document.getElementById("ubicacion-mas-cercana").textContent =
            "No se pudo obtener su ubicación.";
        }
      );
    } else {
      document.getElementById("ubicacion-mas-cercana").textContent =
        "La geolocalización no está disponible en este navegador.";
    }
  }
//VERIFICACION DE FORMULARIO CON REDIRECCION A WHATSAPP
 // Formulario-----------------------------------------------------------
  const formulario = document.querySelector("form");
  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      if (!nombre || !correo || !telefono || !mensaje) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const telefonoRegex = /^\d{9,}$/;

      if (!correoRegex.test(correo)) {
        alert("Ingrese un correo válido.");
        return;
      }

      if (!telefonoRegex.test(telefono)) {
        alert("El teléfono debe tener al menos 9 dígitos.");
        return;
      }

      const mensajeWhatsapp = `Hola, soy *${nombre}*.\nCorreo: ${correo}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}`;
      const numeroDestino = "51914035205";
      const urlWhatsapp = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(
        mensajeWhatsapp
      )}`;

      const divResultado = document.getElementById("mensaje-formulario");
      divResultado.innerHTML = `<p style="color: green;"><strong>✅ Gracias ${nombre}, serás redirigido a WhatsApp...</strong></p>`;

      formulario.reset();

      setTimeout(() => {
        window.open(urlWhatsapp, "_blank");
      }, 2000);
    });
  }