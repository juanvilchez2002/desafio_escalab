
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
        <section class="content_card">
            <div class="card1">
                <h1 class="card1_text">
                    ${elem.name.common}
                </h1>
                <div class="card1_info">
                    <img src="${elem.flags.png}" alt="Bandera ${elem.name.common}" class="card1_img">
                    <h3 class="card1_title">
                        Capital: ${elem.capital}
                    </h3>
                    <p class="card1_subtitle">
                        Población: ${elem.population}
                    </p>
                    <p class="card1_subtitle">
                        Region: ${elem.region}
                    </p>
                    <p class="card1_subtitle">
                        SubRegion: ${elem.subregion}
                    </p>
                    </p>
                </div>
            </div>
        </section>
            `
    });

    banderas.innerHTML = elementos;

}