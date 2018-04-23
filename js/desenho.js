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

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -19.856473605491274, lng: -43.956051117278776 },
        zoom: 15
    });

    var redCoords = [
        { lat: -19.856473605491274, lng: -43.956051117278776 },
        { lat: -19.855131501003562, lng: -43.958336359359464 },
        { lat: -19.856796516154840, lng: -43.959419971801480 },
        { lat: -19.857734971540168, lng: -43.957327848769864 },
        /* { lat: -19.855846072146300, lng: -43.946910148956020 },
        { lat: -19.853504940921580, lng: -43.950472122527800 },
        { lat: -19.859115525185288, lng: -43.951931244231900 }, */
    ];

    drawingManager = new google.maps.drawing.DrawingManager({
        //drawingMode: google.maps.drawing.OverlayType.POLYGON,
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

    drawsDefault = new google.maps.Polygon({
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

    circle = new google.maps.Circle({
        map: map,
        center: new google.maps.LatLng(-19.856473605491274, -43.956051117278776),
        radius: 298.7345976445909,
        strokeColor: '#FFFFFF',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#009ee0',
        fillOpacity: 0.2
    });

    circle.setMap(map);

    //addLine();

    map.addListener(drawsDefault, 'rightclick', function (e) {
        removeLine();
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {

        //Valida qual tipo de desenho e pega as cordenadas após o desenho ser completo
        if (e.type == 'polygon') {
            var verticles = e.overlay.getPath();
            var obj = {};   
            verticles.forEach(function (verticle, ind) {
                obj = {
                    "lat": verticle.lat(),
                    "lng": verticle.lng(),
                };
            });
            salvaObjetoDesenho(obj);
        }

        if (e.type == 'circle') {
            console.log({
                "lat": e.overlay.center.lat(),
                "lng": e.overlay.center.lng(),
                "radius" : e.overlay.getRadius(),
            });
        }

        var element = e.overlay;        
        google.maps.event.addListener(element, 'rightclick', function (event) {
            element.setMap(null);
            console.clear();
        });

    });
}

function salvaObjetoDesenho(objDesenho) {
    posicao = objDesenho.length;

    testeObj.push(objDesenho);
    console.log(testeObj);
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