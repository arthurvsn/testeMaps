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
var flightPath;

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
    ];

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'polygon'],
        },
        markerOptions: {
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        },
        polygonOptions: {
            editable: true,
            draggable: true,
            clickable: true,
        },
    });

    flightPath = new google.maps.Polygon({
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

    addLine();

    map.addListener('rightclick', function (e) {
        setMapOnAll();
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {

        var element = e.overlay;
        
        console.log(element);
        google.maps.event.addListener(element, 'rightclick', function (event) {
            element.setMap(null);
        });
    });

    //Pega as cordenadas após o desenho ser completo
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (e) {
        
        console.log(e);
        console.log();
        console.log(drawingManager);

        var vert = e.getPath(); //In the method we could get the vertices of the polygon which we have drawn.
        var clat = 0; // To display the infowindow.
        var clng = 0; // To display the infowindow.

        vert.forEach(function (xy, i) {
            clat = xy.lat();
            clng = xy.lng();
            console.log(clat + ", " + clng);
        });

    });

}

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    
    map.panTo(latLng);
}


function setMapOnAll() {

    /* for (var i = 0; i < draws.length; i++) {
        draws[i].setMap(null);
    } */
}

function addLine() {
    flightPath.setMap(map);
}

function removeLine() {
    flightPath.setMap(null);
}