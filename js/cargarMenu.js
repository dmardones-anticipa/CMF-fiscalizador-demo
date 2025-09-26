// Función asíncrona para simular la llamada fetch
async function cargarMenu() {
  const containerMenu = document.getElementById("menuCMF");

  try {
    // --- 1. Simulación de la llamada Fetch local ---
    const response = await fetch("./data/menuprincipal.json");

    if (!response.ok) {
      // Esto se activará si el archivo no existe o hay un error de lectura
      throw new Error(
        `Error al obtener datos: ${response.status} - Verifica la ruta del archivo.`
      );
    }

    // Obtener los datos y parsearlos como JSON
    const arrayMenu = await response.json();

    // --- 2. Procesar y Mostrar los Datos (Interpolación) ---

    // Limpiar el mensaje de "Cargando..."
    containerMenu.innerHTML = "";

    // Recorrer el array de menu y crear el HTML
    arrayMenu.forEach((menu) => {
      const menuHTML = `
                        <a class="nav__button" href="${menu.link}">
                            ${ menu.icon }
                            <p>${ menu.name }</p>
                        </a>
                    `;
      // Insertar el nuevo elemento HTML en el contenedor
      containerMenu.insertAdjacentHTML("beforeend", menuHTML);
    });
  } catch (error) {
    // Manejo de errores
    console.error("Hubo un error al obtener o mostrar los datos:", error);
    containerMenu.innerHTML =
      '<p style="color: red;">No se pudo cargar el menu. Inténtelo de nuevo.</p>';
  }
}

// Llamar a la función al cargar la página
cargarMenu();
