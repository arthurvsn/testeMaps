// This example requires the Drawing library. Include the libraries=drawing
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">
/* center: { lat: -19.963879499999997, lng: -43.939273299999996 }, */
/* { lat: -19.963879499999997, lng: -43.939273299998787 },
{ lat: -18.963879499990549, lng: -42.939273299789790 },
{ lat: -18.963879499993418, lng: -42.939273299879797 },
{ lat: -18.963879499998797, lng: -42.939273299054879 }, */
var drawingManager;
var map;
var drawsDefault;
var testeObj = [];
var circle;
var latPosicaoAtual;
var lngPosicaoAtual;
var geocoder;
var center;

$(document).ready(function(){
});

function codigoEndereco() {

    geocoder = new google.maps.Geocoder();
    var endereco = document.getElementById('address').value;
    var center = "";

    geocoder.geocode({ 
        'address': endereco 
    }, function (results, status) {
        if (status == 'OK') {
            
            center = { 
                "lat": results[0].geometry.location.lat(), 
                "lng": results[0].geometry.location.lng()
            };
            
            initMap(center);

        } else {
            alert('Não foi possível buscar as coordenadas pois o google retorno o status ' + status + '.\nContate o setor de desenvolvimento');
        }
    });
    
}

function initMap(center) {
    var zoom = 15;

    if(center == "")
    {
        center = { 'lat': -14.235004, 'lng': -51.92527999999999 };
        zoom = 3;
    }
    map = new google.maps.Map(document.getElementById('map'), {
        //center: { lat: -19.856473605491274, lng: -43.956051117278776 },
        center: center,
        zoom: zoom
    });
    
    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.DEFAULT,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'polygon', 'circle'],
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

    /**
     * funcao pra buscar os desenhos ja existentes 
     * se existir, tratar e salvar no array de objetos
     * se não existir nada, seguir o fluxo normal
     */
    buscaCercasCadastradas();

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {

        var obj = [];
        var element = e.overlay;

        //Valida qual tipo de desenho e pega as cordenadas após o desenho ser completo
        if (e.type == 'polygon') {

            
            var verticles = e.overlay.getPath();
            var polygon = [];
            
            
            verticles.forEach(function (verticle, ind) {
                polygon[ind] = {
                    "lat": verticle.lat(),
                    "lng": verticle.lng(),                    
                }
            });
            
            obj = {
                "tipo": e.type,
                "coordenadas": polygon,
                "id": "",
            }
            google.maps.event.addListener(verticles, 'set_at', function (event) {
                alterarCoordenadasDesenho(obj, element);
            });

            google.maps.event.addListener(verticles, 'insert_at', function (event) {
                alterarCoordenadasDesenho(obj, element);
            });

        } else if (e.type == 'circle') {

            var circles = {};
            circles = {
                "lat": e.overlay.center.lat(),
                "lng": e.overlay.center.lng(),
            };
            obj = {
                "tipo": e.type,
                "coordenadas": circles,
                "raio": e.overlay.getRadius(),
                "id": "",
            }

            google.maps.event.addListener(element, 'radius_changed', function (event) {
                alterarCoordenadasDesenho(obj, element);
            });
        }

        //testeObj.push(obj);
        pushDesenho(obj);

        google.maps.event.addListener(element, 'rightclick', function (event) {
            deletElement(obj, element);
        });

        google.maps.event.addListener(element, 'dragend', function (event) {
            alterarCoordenadasDesenho(obj, element);
        });
    });
}

function buscaCercasCadastradas() {
    $.ajax({
        url: "../backend/teste.php",
        type: 'POST',
        dataType: "JSON",
        async: true,
        data: {}
    }).done(function (response) {

        if (response.tipoResposta) {
            criaDesenhosPadrao(response.objetoCoordenadas);
        } else {
            alert(response.msg);
        }
    }).fail(function (erro) {
        console.log(erro);
    });
}

function criaDesenhosPadrao(objetos) {

    objetos.forEach(function (objeto, indice) {
        var desenho;

        if (objeto.tipo == "polygon") {
            
            var redCoords = [];
            objeto.coordenadas.forEach(function (elementoCoordenada, indiceCoordenada) {
                redCoords.push(elementoCoordenada);
            });

            desenho = new google.maps.Polygon({
                map: map,
                paths: redCoords,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                draggable: true,
                geodesic: true,
                editable: true,
                
            });
            
            //desenho.setMap(map);
    
        } else if (objeto.tipo == "circle") {
            
            desenho = new google.maps.Circle({
                map: map,
                center: new google.maps.LatLng(objeto.coordenadas[0]),
                radius: objeto.raio, 
                strokeColor: '#FFF000',
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: '#009ee0',
                fillOpacity: 0.2,
                draggable: true,
                geodesic: true,
                editable: true,
                zIndex: '1.0f',
            });            
        }
        
        desenho.setMap(map);

        google.maps.event.addListener(desenho, 'rightclick', function (event) {
            deletElement(objeto, desenho);
        });

        google.maps.event.addListener(desenho, 'dragend', function (event) {
            alterarCoordenadasDesenho(objeto, desenho);
        });

        pushDesenho(objeto);
    });    
}


function pushDesenho(desenho) {

    var ultimo = testeObj.length;

    if (ultimo > 0) {
        var ultimoIdDesenho = testeObj[ultimo - 1].id;

        var idDesenho = ultimoIdDesenho + 1;
        desenho.id = idDesenho;
    } else {
        desenho.id = 0;
    }
    testeObj.push(desenho);
}


function alterarCoordenadasDesenho(desenho, elemento) {
    
    testeObj.forEach(function (element, index) {

        if (desenho.id == testeObj[index].id) {

            if (testeObj[index].tipo == "polygon") {

                var verticles = elemento.getPath();
                var newPolygon = [];

                verticles.forEach(function (verticle, ind) {
                    newPolygon[ind] = {
                        "lat": verticle.lat(),
                        "lng": verticle.lng(),
                    }
                });

                testeObj[index].coordenadas = newPolygon;

            } else if (testeObj[index].tipo == "circle") {
                var newCircles = {};
                newCircles = {
                    "lat": elemento.center.lat(),
                    "lng": elemento.center.lng(),
                    
                };
                testeObj[index].coordenadas = newCircles;
                testeObj[index].raio = elemento.getRadius();
            }
        }
    });
}

//Deletar um desenho de cerca do array principal
function deletElement(desenho, elemento) {

    testeObj.forEach(function(element, index){

        if(desenho.id == testeObj[index].id) {

            testeObj.splice(index, 1);
            elemento.setMap(null);
    
        }
    });
}