
import { cargarSistemas } from './sistemas/cargarSistemas.js';

(() => {
    console.log("INICIANDO NOTIFICACIONES")

    const tituloResultado = document.getElementsByClassName("title");
    const resultado = document.getElementsByClassName("resultados");
    const botonBuscar = document.getElementsByClassName("buttonPrimary")
    const sistemasContainer = document.getElementById("Sistemas-section")
    

    console.log(resultado)
    console.log(botonBuscar)
   

    resultado[0].style.display = "none"
    sistemasContainer.style.display = "none"
    tituloResultado[1].style.display = "none"

    botonBuscar[0].addEventListener("click", () => {
        resultado[0].style.display = "grid"
        tituloResultado[1].style.display = "block"

        const cardResultados = document.querySelectorAll(".frecuencia")

        console.log(cardResultados)

        cardResultados.forEach((item) => {
        console.log(item)
        item.addEventListener("click", () => {

            // Quitar la clase 'activ' de todos los elementos
            cardResultados.forEach(el => el.classList.remove("activ"));
            // Agregar la clase 'activ' solo al elemento clickeado
            item.classList.add("activ");

            console.log("click", item.dataset.frecuencia)
            sistemasContainer.style.display = "block"
            cargarSistemas(item.dataset.frecuencia)
        })
        })
    })

})()