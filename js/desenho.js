// This example requires the Drawing library. Include the libraries=drawing
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">
/* center: { lat: -19.963879499999997, lng: -43.939273299999996 }, */
/*
{ lat: -19.963879499999997, lng: -43.939273299998787 },
{ lat: -18.963879499990549, lng: -42.939273299789790 },
{ lat: -18.963879499993418, lng: -42.939273299879797 },
{ lat: -18.963879499998797, lng: -42.939273299054879 }, 
*/
var drawingManager;
var map;
var drawsDefault;
var testeObj = [];
var circle;
var latPosicaoAtual;
var lngPosicaoAtual;
var geocoder;
var center;
var marker;

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
            editable: true,
            clickable: true,
            draggable: true,
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

    var redCoords = [
        { "lat": -19.854299135444126, "lng": -43.95846030163574 },
        { "lat": -19.858335526821130, "lng": -43.95871779370117 },
        { "lat": -19.858496980340174, "lng": -43.95296713757324 },
        { "lat": -19.854339499866196, "lng": -43.95313879895019 },
    ];

    /* drawsDefault = new google.maps.Polygon({
        map: map,
        paths: redCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        draggable: true,
        geodesic: true,
        editable: true
    });
    drawsDefault.setMap(map); */

    /**
     * funcao pra buscar os desenhos ja existentes 
     * se existir, tratar e salvar no array de objetos
     * se não existir nada, seguir o fluxo normal
     */
    //buscaCercasCadastradas();

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {

        var obj = [];
        var element = e.overlay;
        
        if (e.type == "marker") {
            
            marker = {
                "lat": element.getPosition().lat(),
                "lng": element.getPosition().lng(),
            }

            google.maps.event.addListener(element, 'dragend', function (event) {
                marker = {
                    "lat": element.getPosition().lat(),
                    "lng": element.getPosition().lng(),
                }
            });
        }
        else {

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

            google.maps.event.addListener(element, 'dblclick', function (event) {
                validaCoordenada(obj, element);
            });

            /* google.maps.event.addListener(element, 'dragend', function (event) {
                alterarCoordenadasDesenho(obj, element);
            }); */
        }
        
    });
}

function testeValidaPonto() {
    $.ajax({
        url: "../backend/validarPonto.php",
        type: 'POST',
        dataType: "JSON",
        async: true,
        data: {
            "marker": marker,
            "circle": testeObj
        }
    }).done(function (response) {

        console.log(response);
        if (response.response) {
            alert("pode bater o ponto");
        } else {
            alert(response.msg);
        }
    }).fail(function (erro) {
        console.log(erro);
    });   
}
/* GMaps.prototype.checkGeofence = function (lat, lng, fence) {
    return fence.containsLatLng(new google.maps.LatLng(lat, lng));
};

function teste(usuario) {

}

GMaps.prototype.checkMarkerGeofence = function (marker, outside_callback) {
    if (marker.fences) {
        for (var i = 0, fence; fence = marker.fences[i]; i++) {
            var pos = marker.getPosition();
            if (!this.checkGeofence(pos.lat(), pos.lng(), fence)) {
                outside_callback(marker, fence);
            }
        }
    }
}; */

function validaCoordenada(element, marker) {

    var obj = {
        "coordenadas": [
            { "lat": -19.854299135444126, "lng": -43.95846030163574 },
            { "lat": -19.858335526821130, "lng": -43.95871779370117 },
            { "lat": -19.858496980340174, "lng": -43.95296713757324 },
            { "lat": -19.854339499866196, "lng": -43.95313879895019 },
        ]   
    };

    var x1 = 999999999;
    var x2 = -99999999;
    var y1 = 999999999;
    var y2 = -99999999;

    obj.coordenadas.forEach(function (objeto, index){

        if(x1 > objeto.lat) {
            x1 = objeto.lat;
        } 

        if(x2 < objeto.lat && objeto.lat != x1) {
            x2 = objeto.lat;
        }

        if(y1 > objeto.lng) {
            y1 = objeto.lng;
        }

        if(y2 < objeto.lat && objeto.lat != y1) {
            y2 = objeto.lng;
        }
    });

    //var tentativa = {"lat": -19.86233145312041, "lng": -43.95219466137695};
    var tentativa = {
        "lat": marker.latLng.lat(),
        "lng": marker.latLng.lng(),
    };

    console.log("X1: " + x1);
    console.log("X2: " + x2);
    console.log("Y1: " + y1);
    console.log("Y2: " + y2);
    console.log("Marker => lat:" + tentativa.lat + " lng: " + tentativa.lng);


    console.log("\nDebug de IF's");

    if (tentativa.lat >= x1) {
        console.log("Lat >= x1");
    }
    if (tentativa.lat <= x2) {
        console.log("Lat <= x2");
    }
    if (tentativa.lng >= y1) {
        console.log("Lng >= y1");
    }
    if (tentativa.lng <= y2) {
        console.log("Lng <= y2");

    }

    //voce pode fazer assim
    if ((tentativa.lat >= x1 && tentativa.lat <= x2) && (tentativa.lng >= y1 && tentativa.lng <= y2)) {
        console.log(true);
    }
    else {
        console.log(false);
    }
}

function buscaCercasCadastradas() {
    $.ajax({
        url: "../backend/teste.php",
        type: 'POST',
        dataType: "JSON",
        async: true,
        data: {}
    }).done(function (response) {

        /* if (response.tipoResposta) {
            criaDesenhosPadrao(response.objetoCoordenadas);
        } else {
            alert(response.msg);
        } */
    }).fail(function (erro) {
        //console.log(erro);
    });
}

function criaDesenhosPadrao(objetos) {
    console.log(objetos); return false;
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

function alteraCoordenadaMarkder(marker, elemento) {

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