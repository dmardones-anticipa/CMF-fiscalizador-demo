// Función asíncrona para simular la llamada fetch
async function cargarSelectorTipo(tipo) {
  const selectTipo = document.getElementById(`${tipo.toLowerCase()}`);

  const tipoSelector = `selector${tipo}`

  try {
    // --- 1. Simulación de la llamada Fetch local ---
    const response = await fetch(`./data/informeHistorico/selectores/${ tipoSelector }.json`);

    if (!response.ok) {
      // Esto se activará si el archivo no existe o hay un error de lectura
      throw new Error(
        `Error al obtener datos: ${response.status} - Verifica la ruta del archivo.`
      );
    }

    // Obtener los datos y parsearlos como JSON
    const arraySelectorTipo = await response.json();

    // --- 2. Procesar y Mostrar los Datos (Interpolación) ---

    // Limpiar el mensaje de "Cargando..."
    selectTipo.innerHTML = "";

    // Recorrer el array de menu y crear el HTML
    arraySelectorTipo.forEach((selector) => {
      const selectorHTML = `
                        <option value="${ selector.id }" 
                                ${ selector.selected && 'selected' }  
                                ${ selector.disabled && 'disabled'}
                        >${ selector.label }</option>
                    `;
      // Insertar el nuevo elemento HTML en el contenedor
      selectTipo.insertAdjacentHTML("beforeend", selectorHTML);
    });
  } catch (error) {
    // Manejo de errores
    console.error("Hubo un error al obtener o mostrar los datos:", error);
    selectTipo.innerHTML =
      '<p style="color: red;">No se pudo cargar el selector. Inténtelo de nuevo.</p>';
  }
}
// Llamar a la función al cargar la página
cargarSelectorTipo("Tipo");
cargarSelectorTipo("Institucion");
cargarSelectorTipo("Periodo");
