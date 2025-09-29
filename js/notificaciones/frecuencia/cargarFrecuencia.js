// Función asíncrona para simular la llamada fetch
async function cargarFrecuencias() {
  const containerFrecuencias = document.getElementById("frecuencias");

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

    // Agrupar por tipo de frecuencia
    const agrupado = arrayFrecuencias.reduce((acc, curr) => {
    const { tipoFrecuencia } = curr;
    const found = acc.find((item) => item.tipoFrecuencia === tipoFrecuencia);
    if (found) {
        found.count += 1;
    } else {
        acc.push({ tipoFrecuencia, count: 1 });
    }
    return acc;
    }, []);

    console.log("Agrupado por tipo:", agrupado);

    // --- 2. Procesar y Mostrar los Datos (Interpolación) ---

    // Limpiar el mensaje de "Cargando..."
    containerFrecuencias.innerHTML = "";

    // Recorrer el array de menu y crear el HTML
    agrupado.forEach((frecuencia) => {
      const frecuenciasHTML = `
                        <div class="card_resultados frecuencia ${ frecuencia.tipoFrecuencia == "Diaria" && "activ" }" data-frecuencia="${ frecuencia.tipoFrecuencia }">
                            <div class="card_resultados__res">
                                <div class="card_resultados__number">
                                    <p>${ frecuencia.count }</p>
                                </div>
                            </div>
                            <div class="card_resultados__title">
                                <p>Frecuencia ${ frecuencia.tipoFrecuencia }</p>
                            </div>
                        </div>
                    `;
      // Insertar el nuevo elemento HTML en el contenedor
      containerFrecuencias.insertAdjacentHTML("beforeend", frecuenciasHTML);
    });
  } catch (error) {
    // Manejo de errores
    console.error("Hubo un error al obtener o mostrar los datos:", error);
    containerFrecuencias.innerHTML =
      '<p style="color: red;">No se pudo cargar las frecuencias. Inténtelo de nuevo.</p>';
  }
}

// Llamar a la función al cargar la página
cargarFrecuencias();
