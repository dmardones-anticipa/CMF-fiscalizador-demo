var titulotablaPartes = ["", "", ""];
var titulotabla='';
async function loadArchivos(){
    try{
        const res=await fetch("./data/archivoEnCurso/archivosEnCurso.json");
        const data=await res.json();
        renderSelects(data[0], data);
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

            const allCardsFrec=document.querySelectorAll('.frecuencia');
            allCardsFrec.forEach(c=>c.classList.remove('activ'));

            const prevSection=document.getElementById('Sistemas-section');
            if(prevSection) prevSection.remove();

            titulotablaPartes[0]=card.name;
            titulotablaPartes[1]=""; // limpiar frecuencia
            titulotablaPartes[2]=""; // limpiar tipoSistema
            titulotabla=titulotablaPartes.filter(Boolean).join(" | ");
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
            const prevSection=document.getElementById('tabla-section');
            if(prevSection) prevSection.remove();   

            const frase=card.name.trim().split(/\s+/);
            titulotablaPartes[1]=frase[frase.length - 1]; // solo última palabra
            titulotablaPartes[2]=""; // limpiar tipoSistema
            titulotabla=titulotablaPartes.filter(Boolean).join(" | ");
            renderSistema(data[3], data, card.name);
        });
        cardsContainer.appendChild(cardDiv);
    });
    section.appendChild(cardsContainer);

    cont.appendChild(section);
}

function renderSistema(block, data, frecuencia){
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

    const cardsContainer=document.createElement('div');
    cardsContainer.classList.add('resultados');
    const frase=frecuencia.trim().split(/\s+/);
    const tipofrecuencia=frase[frase.length-1];
    block.items.forEach(card=>{
        const cardDiv=document.createElement('div');
        cardDiv.classList.add('card_sistema');
        cardDiv.innerHTML=`
                <div class="card__title">
                    <p>${card.name}</p>
                    <b>${tipofrecuencia}</b>
                </div>
                <div class="card__value">
                    <h3>${card.value}</h3>
                    <p>${card.sistem}</p>
                    <b>${card.typesistem}</b>
                </div>
        `;
        cardDiv.addEventListener('click', ()=>{
            const allCards=document.querySelectorAll('.card_sistema');
            allCards.forEach(c=>c.classList.remove('activ'));
            cardDiv.classList.add('activ');
            titulotablaPartes[2]=card.typesistem;
            titulotabla=titulotablaPartes.filter(Boolean).join(" | ");
            renderTabla(data[4], data);
        });
        cardsContainer.appendChild(cardDiv);
    });
    section.appendChild(cardsContainer);

    cont.appendChild(section);
}

function renderTabla(block, data){
    const cont=document.querySelector('.content');
    if(!cont) return;
    const prevSection=document.getElementById('tabla-section');
    if(prevSection) prevSection.remove();

    const section=document.createElement('section');
    section.id='tabla-section';
    const titulo=document.createElement('div');
    titulo.classList.add('title');
    const h2=document.createElement('h3');
    h2.innerText=`${titulotabla}`;
    titulo.appendChild(h2);
    section.appendChild(titulo);

   /*  const cardTable=document.createElement('div');
    cardTable.classList.add('tabla1');
    cardTable.innerHTML=`
        <table>
            <thead>
                <tr>
                    ${block.headers.map(header=>`<th>${header}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
            ${block.items.map(item=>`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.value}</td>
                    <td>${item.sistem}</td>
                    <td>${item.typesistem}</td>
                </tr>
            `).join('')}
            </tbody>
        </table>
        `; */

    cont.appendChild(section);
}

loadArchivos();