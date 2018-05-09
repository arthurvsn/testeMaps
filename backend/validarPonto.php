<?php
    /**
     * Adapte para o WS, o que penso é que o fluig vai mandar os dados do trabalhador, então
     * devemos fazer as buscas da cerca, seja ela circulo ou poligono, para ai sim, 
     * fazer a validação. 
     * Eu deixei mais ou menos como ficou fácil par fazer os cálculos então podemos seguir o modelo
     */
    $tipo = $_POST['tipo'];

    if ($tipo == "circle") {
        
        validaCirculo();

    }
    
    /**
     * teste que valida se um marcador está na aréa de um circulo  
     * Valdia também se o valor obtido é maior ou menor fazendo assim a marcação do ponto do funcionario.
     */
    function validaCirculo() {

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
    }

    /**
     * teste que valida se um marcador está na aréa de um retangulo  
     * Valdia se o valor obtido do colaborador esta dentro das extremidades do retangulo
     */
    function validaPoligono() {
        
        //$coordenadasColaborador = $_POST['coordenadasColaborador'];        
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
    }
    
?>