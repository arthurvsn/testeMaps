var obj = {
    "coordenadas": [
        /*{ "lat": -19.855066057707660, "lng": -43.958589047668454 },
        { "lat": -19.862331453120410, "lng": -43.958288640258786 },
        { "lat": -19.854904600697065, "lng": -43.952194661376950 },
        { "lat": -19.862129641074556, "lng": -43.951679677246090 },*/
        { "lat": -19.854299135444126, "lng": -43.95846030163574 },
        { "lat": -19.85833552682113, "lng": -43.95871779370117 },
        { "lat": -19.858496980340174, "lng": -43.95296713757324 },
        { "lat": -19.854339499866196, "lng": -43.95313879895019 },
    ]
};
var x1 = 9999999999; //menor
var x2 = -999999999; //maior
var y1 = 9999999999; //menor
var y2 = -999999999; //maior

obj.coordenadas.forEach(function (objeto, index) {

    if (x1 >= objeto.lat) {
        x1 = objeto.lat;
    }

    if (x2 <= objeto.lat) {
        x2 = objeto.lat;
    }
    
    if (y1 >= objeto.lng) {
        y1 = objeto.lng;
    }

    if (y2 <= objeto.lat) {
        y2 = objeto.lng;
    }
});

//var tentativa = {"lat": -19.86233145312041, "lng": -43.95219466137695};
var tentativa = {
    "lat": -19.858472068577417,
    "lng": -43.95302413451475
};

console.log("X1: " + x1);
console.log("X2: " + x2);
console.log("Y1: " + y1);
console.log("Y2: " + y2);
console.log("Marker => lat:"+tentativa.lat + " lng: "+ tentativa.lng);


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