<?php

$coordenadasColaborador = [
    ["lat" => -19.858472068577417, "lng" => -43.95302413451475],
];

$coordenadas = [
    [ "lat" => -19.854299135444126, "lng" => -43.95846030163574 ],
    [ "lat" => -19.858335526821130, "lng" => -43.95871779370117 ],
    [ "lat" => -19.858496980340174, "lng" => -43.95296713757324 ],
    [ "lat" => -19.854339499866196, "lng" => -43.95313879895019 ],
];

$x1 = 9999999999; //menor
$x2 = -999999999; //maior
$y1 = 9999999999; //menor
$y2 = -999999999; //maior

foreach ($coordenadas as $posicao => $coordenada) {
    
    if ($x1 >= $coordenada['lat']) {
        $x1 = $coordenada['lat'];
    }

    if ($x2 <= $coordenada['lat']) {
        $x2 = $coordenada['lat'];
    }
    
    if ($y1 >= $coordenada['lng']) {
        $y1 = $coordenada['lng'];
    }

    if ($y2 <= $coordenada['lng']) {
        $y2 = $coordenada['lng'];
    }

}

print_r("X1: " + $x1);
print_r("X2: " + $x2);
print_r("Y1: " + $y1);
print_r("Y2: " + $y2);
print_r("Marker => lat: ".$coordenadasColaborador[0]['lat']." lng: ".$coordenadasColaborador[0]['lng']);

if (($coordenadasColaborador[0]['lat'] >= $x1 && $coordenadasColaborador[0]['lat'] <= $x2) && ($coordenadasColaborador[0]['lng'] >= $y1 && $coordenadasColaborador[0]['lng'] <= $y2)) {
    print_r(true);
}
else {
    print_r(false);
}