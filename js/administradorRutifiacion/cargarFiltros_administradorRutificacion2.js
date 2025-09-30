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
        <span 
            class="linkArchivo" 
            data-id="${inst.id}" 
            data-nombre="${inst.nombre}" 
            style="cursor: pointer; text-decoration: underline; color: blue;">
            ${inst.cantidadArchivos}
        </span>
        </td>
      `;
      tbody.appendChild(fila);
    });

    // Asignar eventos a cada span con clase 'linkArchivo'
    document.querySelectorAll('.linkArchivo').forEach(span => {
    span.addEventListener('click', function () {
        const id = this.dataset.id;
        const nombre = this.dataset.nombre;
        mostrarDetalleInstitucion(id, nombre); // Esta función la debes definir abajo
    });
    });


  } catch (error) {
    console.error("Error cargando tabla desde JSON:", error);
  }
}

async function mostrarDetalleInstitucion(id, nombre) {
  const contenedor = document.getElementById('detalleContenido');

  try {
    //const response = await fetch(`./data/detalles/institucion-${id}.json`);
    const response = await fetch(`./data/administradorRutificacion/rutificacion22.json`);
    if (!response.ok) throw new Error(`No se pudo cargar detalles para institución ${id}`);

    const data = await response.json();
    const rutificaciones = data[0]?.rutificaciones || [];

    let html = `
      <h4>Detalle de: ${nombre}</h4>
      <div class="vector-container" style="display: flex; font-weight: bold; gap: 20px; margin-bottom: 10px;">
        <div style="width: 100px;">Archivo</div>
        <div style="width: 150px;">Fecha referencia</div>
        <div style="width: 150px;">Inconsistencias</div>
        <div style="width: 100px;">Acción</div>
      </div>
    `;

    rutificaciones.forEach((rut, index) => {
      html += `
        <div class="rutificaciones-tabla" style="display: flex; gap: 20px; margin-bottom: 5px;">
          <div style="width: 100px;">${rut.tipoArchivo}</div>
          <div style="width: 150px;">${rut.fechaReferencia}</div>
          <div style="width: 150px;">${rut.inconsistencias}</div>
          <div style="width: 100px;">
            <span class="ver-link" data-id="${id}" data-index="${index}" style="color: blue; cursor: pointer; text-decoration: underline;">
              VER
            </span>
          </div>
        </div>
      `;
    });

    contenedor.innerHTML = html;

    // Evento para los botones VER
    document.querySelectorAll('.ver-link').forEach(el => {
      el.addEventListener('click', function () {
        const institucionId = this.dataset.id;
        const archivoIndex = this.dataset.index;
        mostrarDetalleArchivo(institucionId, archivoIndex);
      });
    });

  } catch (error) {
    contenedor.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}


function mostrarDetalleArchivo(institucionId, archivoIndex) {

    cargarDetalleArchivo(archivoIndex);
//  const contenedor = document.getElementById('detalleContenido');

//  contenedor.innerHTML = `
//    <h4>Detalle del Archivo #${parseInt(archivoIndex) + 1} - Institución ${institucionId}</h4>
//    <p>Aquí puedes mostrar más información específica de este archivo.</p>
//    <button onclick="mostrarDetalleInstitucion(${institucionId}, 'Institución ${institucionId}')">⬅ Volver</button>
//  `;
}


document.addEventListener('DOMContentLoaded', cargarTablaDesdeJSON);
