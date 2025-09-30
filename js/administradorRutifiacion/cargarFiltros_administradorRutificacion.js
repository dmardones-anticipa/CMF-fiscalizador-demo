// Función asíncrona para cargar filtros desde un JSON
async function cargarFiltros() {
  try {
    // 1. Obtener los selectores del DOM
    const selectTipo = document.getElementById("tipo");
    const selectInstitucion = document.getElementById("institucion");
    const selectArchivo = document.getElementById("archivo");

    // 2. Fetch del archivo JSON
    const response = await fetch("./data/administradorRutificacion/index.json");

    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo de filtros (${response.status})`);
    }

    const data = await response.json();

    // 3. Extraer el objeto con los filtros
    const filtros = data[0]?.filtrosDisponibles;

    if (!filtros) {
      throw new Error("Formato de JSON inválido o datos faltantes");
    }

    // 4. Función para agregar opciones a un select
    const llenarSelect = (select, opciones) => {
      opciones.forEach((opcion) => {
        const option = document.createElement("option");
        option.value = opcion;
        option.textContent = opcion;
        select.appendChild(option);
      });
    };

    // 5. Llenar los selects
    llenarSelect(selectTipo, filtros.tipoInstitucion);
    llenarSelect(selectInstitucion, filtros.instituciones);
    llenarSelect(selectArchivo, filtros.archivos);
  } catch (error) {
    console.error("Error al cargar filtros:", error);
  }
}

// Ejecutar cuando cargue el DOM
cargarFiltros();
