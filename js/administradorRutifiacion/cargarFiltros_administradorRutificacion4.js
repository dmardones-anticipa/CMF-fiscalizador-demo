async function cargarTablaDesdeJSON() {
  try {
    const response = await fetch("./data/administradorRutificacion/rutificacion.json");

    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo JSON (${response.status})`);
    }

    const data = await response.json();
    const resumen = data[0]?.resumen;
    const instituciones = data[0]?.instituciones;

    if (!resumen || !instituciones) {
      throw new Error("Formato JSON inválido o datos faltantes");
    }

    // Mostrar total
    const totalArchivosElem = document.getElementById('totalArchivos');
    totalArchivosElem.textContent = resumen.totalArchivos;

    // Insertar filas en la tabla
    const tbody = document.querySelector('#tablaInstituciones tbody');
    tbody.innerHTML = ''; // Limpiar

    instituciones.forEach(inst => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${inst.nombre}</td>
        <td style="text-align: center;">
          <a href="/institucion/${inst.id}" style="text-decoration: none; color: inherit;">
            ${inst.cantidadArchivos}
          </a>
        </td>
      `;
      tbody.appendChild(fila);
    });

  } catch (error) {
    console.error("Error cargando tabla desde JSON:", error);
  }
}

document.addEventListener('DOMContentLoaded', cargarTablaDesdeJSON);
