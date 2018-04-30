<?php

    /**
     * teste que valida se um marcador está na aréa de um circulo  
     * Valdia também se o valor obtido é maior ou menor fazendo assim a marcação do ponto do funcionario.
     */
    $objetoRetorno              = new stdClass();
    $objetoRetorno->msg         = "Error";
    $objetoRetorno->response    = false;

    $raioTerra          = (float) 6371;
    $markerTrabalhador  = $_POST['marker'];
    $cercaCirculo       = $_POST['circle'];

    $latTrabalhador = (float) $markerTrabalhador['lat'];
    $lngTrabalhador = (float) $markerTrabalhador['lng'];

    $latCerca   = (float) $cercaCirculo[0]['coordenadas']['lat'];
    $lngCerca   = (float) $cercaCirculo[0]['coordenadas']['lng'];
    $raio       = (float) $cercaCirculo[0]['raio'];
    
    $teste = $raioTerra * 
                acos(
                    cos(deg2rad($latTrabalhador)) *
                    cos(deg2rad($latCerca)) *
                    cos(deg2rad($lngTrabalhador) - deg2rad($lngCerca)) +
                    sin(deg2rad($latTrabalhador)) * 
                    sin(deg2rad($latCerca))
                );

    // Convertion
    $teste = $teste * 1000;

    if($teste <= $raio) {

        $objetoRetorno->msg         = "Realizar marcação de ponto";
        $objetoRetorno->response    = true;

    } else {

        $objetoRetorno->msg         = "Não realizar marcação de ponto";
        $objetoRetorno->response    = false;

    }
    
    $objetoRetorno->coordenada = $teste;
    echo json_encode($objetoRetorno);
?>