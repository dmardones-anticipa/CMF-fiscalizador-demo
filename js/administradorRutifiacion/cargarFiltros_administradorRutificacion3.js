async function cargarDetalleArchivo(id) {
  try {
    //const response = await fetch(`./data/rutificacion/detalle-archivo-${id}.json`);
    const response = await fetch(`./data/administradorRutificacion/rutificacion5.json`);
    if (!response.ok) throw new Error("Archivo no encontrado");

    const data = await response.json();
    const detalle = data[0];

    const contenedor = document.getElementById("panelDetalle");

    let html = `
      <h3>Archivo: ${detalle.archivo.tipoArchivo}</h3>
      <p><strong>N° Secuencia:</strong> ${detalle.archivo.numeroSecuencia}</p>

      <p><strong>Nombre IFI:</strong> ${detalle.datosInformados.nombreIFI}</p>
      <p><strong>Nombre CMF:</strong> ${detalle.datosInformados.nombreCMF}</p>
      <p><strong>RUT:</strong> ${detalle.datosInformados.rut}</p>

      <p><strong>Pregunta:</strong> ${detalle.preguntaCMF}</p>

      <h4>Historial</h4>
      <ul>
        ${detalle.historial.map(h => `
          <li>
            <strong>Fecha:</strong> ${h.fecha}<br>
            <strong>Nombre Informado:</strong> ${h.nombreInformado}<br>
            <strong>Nombre CMF:</strong> ${h.nombreCMF}<br>
            <strong>Coincidencias:</strong> ${h.coincidencias}
          </li>
        `).join('')}
      </ul>

      <h4>Observaciones</h4>
      <ul>
        <li><strong>${detalle.fechaObservacion1}:</strong> ${detalle.observacion1}</li>
        <li><strong>${detalle.fechaObservacion2}:</strong> ${detalle.observacion2}</li>
      </ul>

      <h4>Archivos Adjuntos</h4>
      <ul>
        ${detalle.archivosAdjuntos.map(a => `
          <li><a href="${a.url}" target="_blank">${a.nombre}</a></li>
        `).join('')}
      </ul>

      <p><strong>Origen Respuesta:</strong> ${detalle.origenRespuesta}</p>
      <p><strong>Usuario:</strong> ${detalle.usuario}</p>

      <button onclick="alert('Aceptado')" ${!detalle.acciones.aceptar ? 'disabled' : ''}>Aceptar</button>
      <button onclick="alert('Rechazado')" ${!detalle.acciones.rechazar ? 'disabled' : ''}>Rechazar</button>
    `;

    contenedor.innerHTML = html;
  } catch (error) {
    document.getElementById("panelDetalle").innerHTML = `<p>Error al cargar detalles: ${error.message}</p>`;
  }
}
