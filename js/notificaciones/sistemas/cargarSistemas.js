// Función asíncrona para simular la llamada fetch
export async function cargarSistemas(tipoFrecuencia) {
  const containerSistemas = document.getElementById("sistemas");

  try {
    // --- 1. Simulación de la llamada Fetch local ---
    const response = await fetch("./data/notificaciones/frecuencia/frecuencias.json");

    if (!response.ok) {
      // Esto se activará si el archivo no existe o hay un error de lectura
      throw new Error(
        `Error al obtener datos: ${response.status} - Verifica la ruta del archivo.`
      );
    }

    // Obtener los datos y parsearlos como JSON
    const arrayFrecuencias = await response.json();

    console.log("FRECUENCIAS: ", arrayFrecuencias)

    // Agrupar por tipo de frecuencia
    const agrupado = arrayFrecuencias.filter((s) => s.tipoFrecuencia == tipoFrecuencia)
    console.log("Lista de agrupado por tipo: ", agrupado);

    // --- 2. Procesar y Mostrar los Datos (Interpolación) ---

    // Limpiar el mensaje de "Cargando..."
    containerSistemas.innerHTML = "";

    // Recorrer el array de menu y crear el HTML
    agrupado.forEach((sistema) => {
      const sistemasHTML = `
                        <div class="card_sistema">
                            <div class="card__title">
                                <p>Frecuencia</p>
                                <b>${sistema.tipoFrecuencia.toLowerCase()}</b>
                            </div>
                            <div class="card__value">
                                <h3>${sistema.valor}</h3>
                                <p>Sistema</p>
                                <b>${sistema.tipoSistema}</b>
                            </div>
                        </div>
                    `;
      // Insertar el nuevo elemento HTML en el contenedor
      containerSistemas.insertAdjacentHTML("beforeend", sistemasHTML);
    });
  } catch (error) {
    // Manejo de errores
    console.error("Hubo un error al obtener o mostrar los datos:", error);
    containerSistemas.innerHTML =
      '<p style="color: red;">No se pudo cargar los sistemas. Inténtelo de nuevo.</p>';
  }
}

// Llamar a la función al cargar la página
// cargarSistemas("Diaria");
