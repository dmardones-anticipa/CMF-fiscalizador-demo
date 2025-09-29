async function loadArchivos(){
    try{
        const res=await fetch("./data/archivoEnCurso/archivosEnCurso.json");
        const data=await res.json();

        renderSelects(data[0], data); // Pasamos también todo el data
        // Puedes activar las demás funciones según sea necesario
        // renderCards(data[1]);
        // renderFrecuencia(data[2]);
        // renderSistema(data[3]);
        // renderTabla(data[4]);
    }catch(error){
        console.error("Error cargando archivos:", error);
    }
}

function renderSelects(block, data){
    const cont=document.getElementById("filtros");
    cont.innerHTML="";
    const selects=document.createElement("div");
    selects.classList.add("tres");
    block.select.forEach(s=>{
        const select=document.createElement("select");
        s.options.forEach(opt=>{
            const option=document.createElement("option");
            option.textContent=opt;
            select.appendChild(option);
        });
        selects.appendChild(select);
    });
    cont.appendChild(selects);
    const boton=document.createElement("button");
    boton.classList.add("buttonPrimary");
    boton.innerHTML="<p>Buscar</p>";
    boton.addEventListener('click', ()=>{
        renderCards(data[1], data);
    });
    cont.appendChild(boton);
}
function renderCards(block, data){
    const cont=document.querySelector('.content');
    if(!cont) return;

    const prevSection=document.getElementById('cards-section');
    if(prevSection) prevSection.remove();

    const section=document.createElement('section');
    section.id='cards-section';

    const titulo=document.createElement('div');
    titulo.classList.add('title');
    const h2=document.createElement('h2');
    h2.innerText=block.name;
    titulo.appendChild(h2);
    section.appendChild(titulo);
    
    cont.appendChild(section);

};
loadArchivos();