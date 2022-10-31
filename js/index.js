const banderas = document.querySelector('#banderas');

/* llamda de la toda la api*/
document.addEventListener("DOMContentLoaded", function(event) {
    /* DOMContentLoaded -> cargara el API cuando se levante la pagina */
    fetchData();
});

/* consumo de la API*/
const fetchData = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        console.log(data);
        banderillas(data);

        formularioReal(data); // activa formulario search
        filtrarRegion(data) // activa filtros region

    }catch (error) {
        console.log(error)
    }
}

/* dibuja los cards */
const banderillas = (data) => {

    let elementos = '';

   /* recorrer el consumo de la API y dibujar las cards*/

    data.forEach(elem => {
        elementos += `
            <div class="card">
            <img src="${elem.flags.png}" alt="Bandera ${elem.name.common}" class="img-fluid">
                <div class="card-content">
                    <h3>${elem.name.common}</h3>
                    <p>
                        <b>Population: </b>
                        ${elem.population}
                    </p>
                    <p>
                        <b>Capital: </b>
                        ${elem.capital}
                    </p>
                    <p>
                        <b>Region: </b>
                        ${elem.region}
                    </p>                    
                    <p>
                        <a href="pais-consultado.html?name=${elem.name.common}">
                            Más información...
                        </a>
                    </p>
                    
                </div>
            </div>
            `
    });

    banderas.innerHTML = elementos;

}

/* busqueda por formulario */

const formulario = document.getElementById("formulario");
const formularioConsulta = document.getElementById("inputFormulario");

const formularioReal = data =>{
    /* escuchando el evento del input */

    document.addEventListener('keyup', e =>{
        e.preventDefault();

        const paisConsultado = formularioConsulta.value.toLowerCase();
        //console.log(paisConsultado);

        /* filtrar por país */
        const paisFiltrado = data.filter(item =>{
            const pais = item.name.common.toLowerCase();
            if(pais.indexOf(paisConsultado)!==-1){
                return item;
            }
        })
        banderillas(paisFiltrado);
    })
}

/* filtrar por region */