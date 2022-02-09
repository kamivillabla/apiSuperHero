// Cons Globales
const form = document.getElementById('form');
const formText = document.getElementById('form_text');

// Consumiendo Api.
form.addEventListener('submit', e => {
    e.preventDefault();
    const numForm = formText.value;

    const url = `https://superheroapi.com/api.php/10226070021914379/${numForm}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            card(data);
        })
        .catch(error => console.log(error));

})

// Card con los datos y estadisticas
const card = (data) => {
    const card = document.getElementById('card');
    card.innerHTML = `
        <h2 id="tituloHeroe" class="text-center font-weight-bold"> SuperHero encontrado</h2>
        <div class="card mt-5" style="max-width: 540px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${data.image.url}" alt="imagen heroe" class='img-fluid'>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Nombre:</span> ${data.name}</h5>
                        <p><span class="font-weight-bold card-text">Conexiones:</span> ${data.connections["group-affiliation"]} ~ ${data.connections.relatives}</p>
                        <p><span class="font-weight-bold card-text">Publicado:</span> ${data.biography.publisher}</p>
                        <p><span class="font-weight-bold card-text">Ocupación:</span> ${data.work.occupation}</p>
                        <p><span class="font-weight-bold card-text">Primera aparición:</span> ${data.biography["first-appearance"]}</p>
                        <p><span class="font-weight-bold card-text">Altura:</span> ${data.appearance.height[0]} ~ ${data.appearance.height[1]} </p>
                        <p><span class="font-weight-bold card-text">Peso:</span> ${data.appearance.weight[0]} ~ ${data.appearance.weight[1]}</p>
                        <p>Alianza: ${data.biography.aliases} </p>
                     </div>
                </div>
            </div>
        </div>`;

    // Recorriendo estadisticas
    const PowerStats = data.powerstats;
    const datePoints = [];
    for (keys in PowerStats) {
        datePoints.push({ y: parseInt(PowerStats[keys]) || 0, label: keys })
    }
    // canvas
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `Estadisticas de poder de ${data.name}`,
            fontColor: "whitesmoke",

        },
        backgroundColor: 'transparent',
        legend: {
            fontColor: "whitesmoke"
        },
        data: [{
            type: "pie",
            startAngle: 45,
            toolTipContent: "<b>{label}</b>: {y}%",
            indexLabelFontColor: "whitesmoke",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: datePoints
        }]
    });
    chart.render();
}
