$('form').on('submit', (event) =>{
    event.preventDefault();
    $('#resultado').html(" ");
    $("#chartContainer").html(" "),
    superhero = parseInt($('#superhero').val());
    consulta(superhero)
});

let consulta = (superhero) => {
    $.ajax({
        dataType: "json",
        type: "GET",
        url: `http://www.superheroapi.com/api.php/10159754413268624/${superhero}`,
        success: (result) => {
            if (result.response === 'success') {

                let primer_resultado = `
                <h3 class="text-center">Tu Superheore es</h3>
                <div class="card">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${result.image.url}" class="card-img" alt="${result.name}">
                        </div>
                    <div class="col-md-6">
                        <div="card-body">
                            <h4 class="card-title"> Su nombre: ${result.name}</h4>
                            <p class="card-text">Conexiones: ${result.connections['group-affiliation']}</p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><em>Publicado por: </em> ${result.biography.publisher}</li>
                                <li class="list-group-item"><em>Ocupación: </em> ${result.work.occupation}</li>
                                <li class="list-group-item"><em>Primera aparición: </em> ${result.biography['first-appearance']}</li>
                                <li class="list-group-item"><em>Altura: </em>${result.appearance.height.join(" o ")}.</li>
                                <li class="list-group-item"><em>Peso: </em> ${result.appearance.height.join(" o ")}.</li>
                                <li class="list-group-item"><em>Alianzas:</em>
                            `;
                            let segundo_resultado ="";
                            segundo_resultado = result.biography.aliases.join(" - ");
                            let tercer_resultado =` 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                    `;
            
                $('#resultados').append(primer_resultado + segundo_resultado + tercer_resultado);
                let datos_superheroes = [];
                for (const key in result.powerstats) {
                    datos_superheroes.push({
                        label: key,
                        y: parseInt(result.powerstats[key])
                    });
                };
                var options = {
                    title: {
                        text: `Las estadísticas de Poder para ${result.name} son:`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 45,
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabel: "{label} ({y})",
                        yValueFormatString: "#,##0.#" % "",
                        dataPoints: datos_superheroes,
                    }]
                };
                $("#chartContainer").CanvasJSChart(options);
            } else {
                alert("El superheore no se encuentra");
            };
        },
        error: () => {
            alert("Erro al consultar los datos del superheroe");
        }
    })
};