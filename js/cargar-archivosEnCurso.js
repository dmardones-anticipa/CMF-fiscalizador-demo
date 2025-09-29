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

    const cardsContainer=document.createElement('div');
    cardsContainer.classList.add('resultados');
    block.items.forEach(card=>{
        const cardDiv=document.createElement('div');
        cardDiv.classList.add('card_resultados');
        cardDiv.innerHTML=`
            <div class="card_resultados__res">
                <div class="card_resultados__number ${card.color}">
                    <p>${card.value}</p>
                </div>
            </div>
            <div class="card_resultados__title">
                <p>${card.name}</p>
            </div>
        `;
        cardDiv.addEventListener('click', ()=>{
            const allCards=document.querySelectorAll('.card_resultados');
            allCards.forEach(c=>c.classList.remove('activ'));
            cardDiv.classList.add('activ');
            renderFrecuencia(data[2], data);
        });
        cardsContainer.appendChild(cardDiv);
    });
    section.appendChild(cardsContainer);
    cont.appendChild(section);
};
function renderFrecuencia(block, data){
    const cont=document.querySelector('.content');
    if(!cont) return;

    const prevSection=document.getElementById('frecuencias-section');
    if(prevSection) prevSection.remove();

    const section=document.createElement('section');
    section.id='frecuencias-section';

    const titulo=document.createElement('div');
    titulo.classList.add('title');
    const h2=document.createElement('h2');
    h2.innerText=block.name;
    titulo.appendChild(h2);
    section.appendChild(titulo);

    const cardsContainer=document.createElement('div');
    cardsContainer.classList.add('resultados');
    block.items.forEach(card=>{
        const cardDiv=document.createElement('div');
        cardDiv.classList.add('card_resultados', 'frecuencia');
        cardDiv.innerHTML=`
            <div class="card_resultados__res">
                <div class="card_resultados__number">
                    <p>${card.value}</p>
                </div>
            </div>
            <div class="card_resultados__title">
                <p>${card.name}</p>
            </div>
        `;
        cardDiv.addEventListener('click', ()=>{
            const allCards=document.querySelectorAll('.frecuencia');
            allCards.forEach(c=>c.classList.remove('activ'));
            cardDiv.classList.add('activ');
            renderSistema(data[3]);
        });
        cardsContainer.appendChild(cardDiv);
    });
    section.appendChild(cardsContainer);

    cont.appendChild(section);
}

function renderSistema(block, data){
    const cont=document.querySelector('.content');
    if(!cont) return;

    const prevSection=document.getElementById('Sistemas-section');
    if(prevSection) prevSection.remove();

    const section=document.createElement('section');
    section.id='Sistemas-section';

    const titulo=document.createElement('div');
    titulo.classList.add('title');
    const h2=document.createElement('h2');
    h2.innerText=block.name;
    titulo.appendChild(h2);
    section.appendChild(titulo);

    //section.appendChild(cardsContainer);

    cont.appendChild(section);
}

loadArchivos();