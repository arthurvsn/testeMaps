<?php

    $arrayObjetosCoordenadas->msg = "Sucess!";
    $arrayObjetosCoordenadas->tipoResposta = true;

    $objetoCoordenadasPolygon = new stdClass();
    $objetoCoordenadasPolygon->tipo = "";
    $objetoCoordenadasPolygon->raio = "";
    $objetoCoordenadasPolygon->coordenadas = [];

    /* $objetoCoordenadasPolygon->tipo = "polygon";
    $objetoCoordenadasPolygon->coordenadas[] = ["lat" => -19.856473605491274, "lng" => -43.956051117278776];
    $objetoCoordenadasPolygon->coordenadas[] = ["lat" => -19.855131501003562, "lng" => -43.958336359359464];
    $objetoCoordenadasPolygon->coordenadas[] = ["lat" => -19.856796516154840, "lng" => -43.959419971801480];
    //$objetoCoordenadas->coordenadas[] = ["lat" => -19.857734971540168, "lng" => -43.957327848769864];
    $arrayObjetosCoordenadas->objetoCoordenadas[] = $objetoCoordenadasPolygon; */

    $objetoCoordenadasCircle = new stdClass();
    $objetoCoordenadasCircle->tipo = "circle";
    $objetoCoordenadasCircle->coordenadas[] = ["lat" => -19.85413389348419, "lng" => -43.95562788891601];
    //$objetoCoordenadasCircle->raio =  ;
    $objetoCoordenadasCircle->raio = 1000;
    $arrayObjetosCoordenadas->objetoCoordenadas[] = $objetoCoordenadasCircle;

    /* $objetoCoordenadasCircle = new stdClass();
    $objetoCoordenadasCircle->tipo = "circle";
    $objetoCoordenadasCircle->coordenadas[] = ["lat" => -19.85413389348419, "lng" => -43.95562788891601];
    //$objetoCoordenadasCircle->raio =  ;
    $objetoCoordenadasCircle->raio = 11;
    $arrayObjetosCoordenadas->objetoCoordenadas[] = $objetoCoordenadasCircle; */

    $retorno = json_encode($arrayObjetosCoordenadas);

    echo $retorno;

?>