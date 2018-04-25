/**
 * Variaveis globais para os desenhos
 */
var mapa;
var controleDesenho;
var drawsDefault;
var objetoDesenhos = [];
var circle;
var latPosicaoAtual;
var lngPosicaoAtual;

$(document).ready(function () {
    
});

function codigoEndereco() {

    geocoder = new google.maps.Geocoder();
    var endereco = document.getElementById('address').value;

    geocoder.geocode({
        'address': endereco
    }, function (results, status) {
        if (status == 'OK') {

            var center = {
                "lat": results[0].geometry.location.lat(),
                "lng": results[0].geometry.location.lng()
            };

            iniciaMapa(center);
        } else {
            alert('Não foi possível buscar as coordenadas pois o google retorno o status ' + status + '.\nContate o setor de desenvolvimento');
        }
    });
}

function iniciaMapa(center) {
    var zoom = 15;

    if (center == "") {
        center = { 'lat': -14.235004, 'lng': -51.92527999999999 };
        zoom = 3;
    }

    mapa = new google.maps.Map(document.getElementById('map'), {
        center: center,
        //center: { lat: latPosicaoAtual, lng: lngPosicaoAtual },
        zoom: zoom,
        mapTypeId: 'roadmap',
    });

    controleDesenho = new google.maps.drawing.DrawingManager({
        //drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon', 'circle'],
        },
        markerOptions: {
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        },
        circleOptions: {
            editable: true,
            draggable: true,
            clickable: true,
        },
        polygonOptions: {
            editable: true,
            draggable: true,
            clickable: true,
        },
    });

    //Coloca o desenho no mapa
    controleDesenho.setMap(mapa);

    //Criação de evento. Evento para quando o desenho é completado, ele fazer algumas validações e montar os objetos
    google.maps.event.addListener(controleDesenho, 'overlaycomplete', function (e) {

        /**
         * variaveis auxiliares para tratar os eventos
         */
        var obj = [];
        var elemento = e.overlay;

        //Evento de excluir elemento, é ativado com o click do botão direito.
        google.maps.event.addListener(elemento, 'rightclick', function (event) {
            deleteElemento(elemento);
        });

        //Evento de editar a posição do elemento, é ativado com o movimento do desenho.
        google.maps.event.addListener(elemento, 'dragend', function (event) {
            alterarCoordenadasDesenho(elemento);
        });

        //Valida qual tipo de desenho e pega as cordenadas após o desenho ser completo
        if (e.type == 'polygon') {


            var verticles = e.overlay.getPath();
            var poligono = [];

            //Evento exclusivo para poligonos, quando uma posição é alterada ele precisa alterar todo o objeto
            google.maps.event.addListener(verticles, 'set_at', function (event) {
                alterarCoordenadasDesenho(elemento);
            });

            //Evento exclusivo para poligonos, quando é inserido um novo ponto no desenho esse mesmo é salvo
            google.maps.event.addListener(verticles, 'insert_at', function (event) {
                alterarCoordenadasDesenho(elemento);
            });

            verticles.forEach(function (verticle, ind) {
                poligono[ind] = {
                    "id": elemento.zIndex,
                    "lat": verticle.lat(),
                    "lng": verticle.lng(),
                }
            });

            obj = {
                "id": elemento.zIndex,
                "tipo": e.type,
                "coordenadas": poligono
            }
        } else if (e.type == 'circle') {

            google.maps.event.addListener(elemento, 'radius_changed', function (event) {
                alterarCoordenadasDesenho(elemento);
            });

            var circles = {};
            circles = {
                "lat": e.overlay.center.lat(),
                "lng": e.overlay.center.lng(),
                "radius": e.overlay.getRadius(),
            };
            obj = {
                "id": elemento.zIndex,
                "tipo": e.type,
                "coordenadas": circles
            }
        }
        
        objetoDesenhos.push(obj);

    });
}


/**
 * Todas as alterações são feitas nesse metodo, ele valida o tipo de desenho e altera as coordenadas de acordo com o id do objeto
 */
function alterarCoordenadasDesenho(desenho) {
    objetoDesenhos.forEach(function (objeto, indice) {

        if (desenho.zIndex == objetoDesenhos[indice].id) {

            if (objetoDesenhos[indice].tipo == "polygon") {

                var verticles = desenho.getPath();
                var novoPoligono = [];

                verticles.forEach(function (verticle, ind) {
                    novoPoligono[ind] = {
                        "lat": verticle.lat(),
                        "lng": verticle.lng(),
                    }
                });

                objetoDesenhos[indice].coordenadas = novoPoligono;

            } else if (objetoDesenhos[indice].tipo == "circle") {

                var novoCirculo = {};
                novoCirculo = {
                    "lat": desenho.center.lat(),
                    "lng": desenho.center.lng(),
                    "radius": desenho.getRadius(),
                };
                objetoDesenhos[indice].coordenadas = novoCirculo;
            }

        }
    });
}

//Deleta um desenho de cerca do array de desenhos principal
function deleteElemento(desenho) {

    objetoDesenhos.forEach(function (i, element) {
        if (desenho.zIndex == objetoDesenhos[element].id) {
            objetoDesenhos.splice(element, 1);
            desenho.setMap(null);
        }
    });
}