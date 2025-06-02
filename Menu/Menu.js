
// Variables globales
let carrito = [];
let pizzaSeleccionada = "";

// Función para inicializar todo cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
  // Eventos para botones "Añadir al carrito"
  initAgregarAlCarrito();

  // Evento para mostrar carrito
  document.getElementById("verCarrito")?.addEventListener("click", mostrarCarrito);

  // Cierre de modales si clic fuera
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });

  // Inicializar botones toggle para menús
  initToggleMenu(".bloque", "toggleMenuBtn", "Conoce nuestras Pizzas más vendidas");
  initToggleMenu(".bloque2", "toggleMenuBtnSemi", "Pizzas Semi Dulces");

  // Inicializar filtros
  initFiltros();
});
// carrito.js

function initAgregarAlCarrito() {
  document.querySelectorAll(".bloque button, .bloque2 button , .bloqueM button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const bloque = e.target.closest(".bloque, .bloque2, .bloqueM");
      pizzaSeleccionada = bloque.getAttribute("data-nombre");
      document.getElementById("modalCantidad").style.display = "flex";
      document.getElementById("cantidadInput").value = 1;
    });
  });

  // Botón para confirmar cantidad
  document.getElementById("confirmarCantidad")?.addEventListener("click", enviarAlCarrito);

  // Botón cerrar modal cantidad
  document.getElementById("cerrarModalCantidad")?.addEventListener("click", () => {
    document.getElementById("modalCantidad").style.display = "none";
    pizzaSeleccionada = "";
  });
}

function enviarAlCarrito() {
  const cantidad = parseInt(document.getElementById("cantidadInput").value);
  if (!pizzaSeleccionada || cantidad < 1) return;

  const existente = carrito.find((item) => item.nombre === pizzaSeleccionada);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre: pizzaSeleccionada, cantidad });
  }

  document.getElementById("modalCantidad").style.display = "none";
  pizzaSeleccionada = "";
}

function mostrarCarrito() {
  const tbody = document.querySelector("#tablaCarrito tbody");
  tbody.innerHTML = "";

  if (carrito.length === 0) {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td colspan="3" style="text-align:center;">El carrito está vacío</td>`;
    tbody.appendChild(fila);
  } else {
    carrito.forEach((item, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td><button onclick="eliminarDelCarrito(${index})" class="Eliminar">Eliminar</button></td>
      `;
      tbody.appendChild(fila);
    });
  }

  document.getElementById("modalCarrito").style.display = "flex";
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

function cerrarModalCarrito() {
  document.getElementById("modalCarrito").style.display = "none";
}

// menuToggle.js

function initToggleMenu(selectorBloques, idBoton, textoOriginal) {
  const bloques = document.querySelectorAll(selectorBloques);
  const toggleBtn = document.getElementById(idBoton);
  const visiblesIniciales = 3;
  let menuAbierto = false;

  bloques.forEach((bloque, i) => {
    bloque.style.display = i < visiblesIniciales ? "flex" : "none";
  });

  toggleBtn?.addEventListener("click", () => {
    menuAbierto = !menuAbierto;
    bloques.forEach((bloque, i) => {
      bloque.style.display = menuAbierto ? "flex" : (i < visiblesIniciales ? "flex" : "none");
    });
    toggleBtn.textContent = menuAbierto ? "Cerrar menú" : textoOriginal;
  });
}
// buscador 
document.addEventListener("DOMContentLoaded", () => {
  const inputBusqueda = document.getElementById("buscadorPizzas");
  const toggleMenuBtn = document.getElementById("toggleMenuBtn");
  const toggleMenuBtnSemi = document.getElementById("toggleMenuBtnSemi");

  inputBusqueda.addEventListener("input", aplicarFiltros);

  function aplicarFiltros() {
    const texto = inputBusqueda.value.trim().toLowerCase();

    // Mostrar u ocultar toggles según si hay texto
    if (texto.length > 0) {
      toggleMenuBtn.style.display = "none";
      toggleMenuBtnSemi.style.display = "none";
    } else {
      toggleMenuBtn.style.display = "inline-block";
      toggleMenuBtnSemi.style.display = "inline-block";
    }

    const bloques = Array.from(document.querySelectorAll(".bloque, .bloque2,.bloqueM"));

    let pizzas = bloques.map(bloque => {
      const nombre = bloque.getAttribute("data-nombre") || "";
      const nombreLower = nombre.toLowerCase();

      return { bloque, nombre, nombreLower };
    });

    if (texto.length > 0) {
      pizzas = pizzas.filter(pizza => pizza.nombreLower.includes(texto));
    } else {
      // Sin texto: mostrar sólo los primeros visiblesIniciales (toggle)
      const visiblesIniciales = 3;

      const bloquesNormales = document.querySelectorAll(".bloque");
      bloquesNormales.forEach((bloque, i) => {
        bloque.style.display = i < visiblesIniciales ? "flex" : "none";
      });

      const bloquesSemi = document.querySelectorAll(".bloque2");
      bloquesSemi.forEach((bloque, i) => {
        bloque.style.display = i < visiblesIniciales ? "flex" : "none";
      });
      
      // Ocultar mensaje si existía
      eliminarMensajeNoEncontrado();

      return; // Salir, ya mostramos toggles
    }

    // Si hay texto: ocultar todos y mostrar sólo los que coinciden
    document.querySelectorAll(".bloque, .bloque2,.bloqueM,.Subtitulo").forEach(b => b.style.display = "none");

    if (pizzas.length === 0) {
      mostrarMensajeNoEncontrado();
    } else {
      eliminarMensajeNoEncontrado();
      pizzas.forEach(p => p.bloque.style.display = "flex");
    }
  }

  function mostrarMensajeNoEncontrado() {
    // Contenedor entre nav y footer donde insertar el mensaje
    const contenedor = document.getElementById("mensajeBuscadorContainer");
    if (!contenedor) return;

    if (!document.getElementById("mensajeNoEncontrado")) {
      const mensaje = document.createElement("div");
      mensaje.id = "mensajeNoEncontrado";
      mensaje.textContent = "No se encontraron pizzas";
      mensaje.style.textAlign = "center";
      mensaje.style.margin = "20px 0";
      mensaje.style.fontSize = "1.2rem";
      mensaje.style.color = "#555";
      contenedor.appendChild(mensaje);
    }
  }

  function eliminarMensajeNoEncontrado() {
    const mensaje = document.getElementById("mensajeNoEncontrado");
    if (mensaje) {
      mensaje.remove();
    }
  }
});
