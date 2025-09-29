
import { cargarSistemas } from './sistemas/cargarSistemas.js';

(() => {
    console.log("INICIANDO NOTIFICACIONES")

    const resultado = document.getElementsByClassName("resultados");
    const botonBuscar = document.getElementsByClassName("buttonPrimary")
    

    console.log(resultado)
    console.log(botonBuscar)
   

    resultado[0].style.display = "none"

    botonBuscar[0].addEventListener("click", () => {
        resultado[0].style.display = "grid"

        const cardResultados = document.querySelectorAll(".frecuencia")

         console.log(cardResultados)

         cardResultados.forEach((item) => {
            console.log(item)
            item.addEventListener("click", () => {
                console.log("click", item.dataset.frecuencia)
                cargarSistemas(item.dataset.frecuencia)
            })
         })
    })

})()