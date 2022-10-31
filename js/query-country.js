
const bandera = document.getElementById("banderas");

/* obteniendo el nombre del pais pasado por parametro */
const queryCountry = new URLSearchParams(window.location.search);
const params = queryCountry.get('name').toLocaleLowerCase();

/* realizando la consulta a la API */

document.addEventListener("DOMContentLoaded", function(event) {
    /* DOMContentLoaded -> cargara el API cuando se levante la pagina */
    fetchData();
});

/* consumo de la API*/
const fetchData = async () => {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${params}`);
        const data = await res.json();
        banderillas(data);

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
                        <a href="pais-consultado.html?${elem.name.common}">
                            Más información...
                        </a>
                    </p>
                    
                </div>
            </div>
            `
    });

    banderas.innerHTML = elementos;

}