<?php
	
	//$servicoUrl = 'http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/helloSigo';
	//$servicoUrl = 'http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/sigo/adm/ponto/buscarColaboradoresUf/MG';
	/* $servicoUrl = 'http://localhost/SIGO_INTEGRADO_3/wsTelemont/sigo/adm/ponto/buscarColaboradoresUf/MS';
	
	$curl = curl_init($servicoUrl);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array('user:sigo', 'pass:94a4964c959e7fafd868b85a301e8d47'));
	$curlResponse = curl_exec($curl);
	curl_close($curl);
	
	var_dump($curlResponse); die(); */
    
?>

<html>

	<title>Testes</title>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="js/index.js" type="text/javascript"></script>
	<link  href="css/index.css" rel="stylesheet" type="text/css" />
	<body>

		<input type="text" id="uf" name="uf" />
		<input type="button" id="teste" name="teste" value="Testar" onclick="testeWsSigo()" />

	</body>
	
</html>