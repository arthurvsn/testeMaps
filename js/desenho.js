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

    initMap(center);
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
    
    /**
     * funcao pra buscar os desenhos ja existentes 
     * se existir, tratar e salvar no array de objetos
     * se não existir nada, seguir o fluxo normal
     */    

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

    /* google.maps.event.addListener(drawsDefault, 'load', function (e) {
        console.log("teste");
        google.maps.event.addListener(drawsDefault, 'rightclick', function (e) {
        });
    });

    
    map.addListener(drawsDefault, 'rightclick', function (e) {
        removeLine();
    }); */

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {

        var obj = [];
        var element = e.overlay;

        //Valida qual tipo de desenho e pega as cordenadas após o desenho ser completo
        if (e.type == 'polygon') {

            
            var verticles = e.overlay.getPath();
            var polygon = [];
            
            google.maps.event.addListener(verticles, 'set_at', function (event) {
                alterarCoordenadasDesenho(element);
            });

            google.maps.event.addListener(verticles, 'insert_at', function (event) {
                alterarCoordenadasDesenho(element);
            });
            
            verticles.forEach(function (verticle, ind) {
                polygon[ind] = {
                    "id": element.zIndex,
                    "lat": verticle.lat(),
                    "lng": verticle.lng(),
                }
            });

            obj = {
                "id": element.zIndex,
                "type": e.type,
                "coordinates": polygon
            }
        } else if (e.type == 'circle') {

            google.maps.event.addListener(element, 'radius_changed', function (event) {
                alterarCoordenadasDesenho(element);
            });
            
            var circles = {};
            circles = {
                "lat": e.overlay.center.lat(),
                "lng": e.overlay.center.lng(),
                "radius" : e.overlay.getRadius(),
            };
            obj = {
                "id": element.zIndex,
                "type": e.type,
                "coordinates": [
                    circles
                ]
            }
        }

        testeObj.push(obj);

        google.maps.event.addListener(element, 'rightclick', function (event) {
            deletElement(element);
        });

        google.maps.event.addListener(element, 'dragend', function (event) {
            alterarCoordenadasDesenho(element);
        });
    });
}

function criaDesenhosPadrao(objeto) {
    if(objeto.tipo == "polygon") {

        var redCoords = [
            { lat: -19.856473605491274, lng: -43.956051117278776 },
            { lat: -19.855131501003562, lng: -43.958336359359464 },
            { lat: -19.856796516154840, lng: -43.959419971801480 },
            { lat: -19.857734971540168, lng: -43.957327848769864 },
        ];

        drawsDefault = new google.maps.Polygon({
            map: map,
            paths: objeto.coordenadas,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            draggable: true,
            geodesic: true,
            editable: true
        });

    } else if (objeto.tipo == "circle") {

        circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(-19.85709735225589, -43.96660829196139),
            radius: objeto.raio,
            strokeColor: '#FFFFFF',
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: '#009ee0',
            fillOpacity: 0.2
        });
    }
    drawsDefault.setMap(map);
}

function alterarCoordenadasDesenho(desenho) {
    testeObj.forEach(function (objeto, indice) {

        if (desenho.zIndex == testeObj[indice].id) {

            if (testeObj[indice].type == "polygon") {

                var verticles = desenho.getPath();
                var newPolygon = [];

                verticles.forEach(function (verticle, ind) {
                    newPolygon[ind] = {
                        "lat": verticle.lat(),
                        "lng": verticle.lng(),
                    }
                });

                testeObj[indice].coordinates = newPolygon;

            } else if (testeObj[indice].type == "circle") {

                var newCircles = {};
                newCircles = {
                    "lat": desenho.center.lat(),
                    "lng": desenho.center.lng(),
                    "radius": desenho.getRadius(),
                };
                testeObj[indice].coordinates = newCircles;
            } 

        }
    });
}

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    
    map.panTo(latLng);
}

function addLine() {
    drawsDefault.setMap(map);
}

function removeLine() {
    drawsDefault.setMap(null);
}


//Deletar um desenho de cerca do array principal
function deletElement(desenho) {

    testeObj.forEach(function(i, element){
        if(desenho.zIndex == testeObj[element].id) {            
            testeObj.splice(element, 1);
            desenho.setMap(null);
        }
    });
}