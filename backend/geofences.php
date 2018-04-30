<!DOCTYPE html>
<html lang="pt-br">
   <head>
    <meta charset="utf-8"/>
	  <title>Cerca Eltronica - Ponto</title>
	  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCR03RvG16Q9Wd-sZQLUOu-8gNepvQXtj0"></script>
	  <script type="text/javascript" src="js/gmaps.js"></script>
		<style>
			#map,#panorama {
			height:500px;
			background:#6699cc;
		}
		</style>
	  <script type="text/javascript">
        var map;
        
	    $(document).ready(function(){	  
				//trata qual tipo de cerca chamar 
				cerca_circulo();	      
			});	  
        


			function cerca_poligono(){
				//posição colaborador 
	      var lat_pos_colaborador = -19.957212; //-19.958112; //  //fora da cerca
	      var lng_pos_colaborador = -43.937999; //-43.937499;
      
	      //cerca	      
	      var p = [
	    	  		[-19.957212656836609,-43.93799915592252],
	    	  		[-19.967212585302038,-43.93799927003302],
	    	  		[-19.967112116528843,-43.93599969303511],
	    	  		[-19.957128665770010,-43.93599922636042]
	    	  	];
	      
	      var path=[];
	      for(var i in p){
	        latlng = new google.maps.LatLng(p[i][0], p[i][1]);
	        path.push(latlng);
	      }
	     
	      //mapa de apresentação na tela
	      var lat_map = -19.957212;
	      var lng_map = -43.937999; 
	      
	      //mostra o mapa
	      map = new GMaps({
	          div: '#map',
	          lat: lat_map,
	          lng: lng_map
				});
	      
	      //desenha a cerca
	      polygon = map.drawPolygon({
	        paths: path,
	        strokeColor: '#BBD8E9',
	        strokeOpacity: 1,
	        strokeWeight: 3,
	        fillColor: '#BBD8E9',
	        fillOpacity: 0.6
	      });
	      
	      
	      //marcar posição do colaborador
	      //- alterada gmaps.js linhas 851 a 863 para exibir ao carregar e não ao draggahle
	      map.addMarker({
	        lat: lat_pos_colaborador,
	        lng: lng_pos_colaborador,
	        draggable: true,
	        fences: [polygon],
	        outside: function(m, f){
	          alert('fora da CERCA DO PONTO!!');
	        }
	      });
			}//fim  cerca_poligono()

        

        function cerca_circulo(){
					//posição colaborador 
					var lat_pos_colaborador = -19.957352; //-19.956612; //  //fora da cerca
	        var lng_pos_colaborador = -43.937999; //-43.937499;
				
					//posição do circulo
	        var center_circle = new google.maps.LatLng(-19.957212,-43.937999);
					var radius_circle = 10;
                                    
                    
					//mapa de apresentação na tela
					var lat_map = -19.957212;
					var lng_map = -43.937999; 				
					var zoom_map = 18;	
	      
	        //mostra o mapa
	        map = new GMaps({
	            div: '#map',
						zoom:zoom_map,
	            lat: lat_map,
	            lng: lng_map
	        });

					var circulo = map.drawCircle({						
									center: center_circle,
									radius: radius_circle,
									strokeColor: "#0000FF",
									strokeOpacity: 0.8,
									strokeWeight: 2,
									fillColor: "#0000FF",
									fillOpacity: 0.4
					});
				
					//cerca: bordas do circulo
					bounds = circulo.getBounds();
			
					//verifica se está na cerca				
					if( !bounds.contains(new google.maps.LatLng(lat_pos_colaborador,lng_pos_colaborador))){
							alert('fora da CERCA DO PONTO!!');
					}


					//https://github.com/hpneo/gmaps/issues/357	      
					map.addMarker({					
						lat: lat_pos_colaborador,
						lng: lng_pos_colaborador,
						draggable: true        
					});
        }//fim cerca_circulo()
	  </script>
	</head>
	<body>
		<div id="map"></div>       
	</body>
</html>