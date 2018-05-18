<!DOCTYPE HTML>
<head>
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.3/jquery.mobile-1.4.3.min.css" />
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.4.3/jquery.mobile-1.4.3.min.js"></script>
<script>

var server = 'sigo.telemont.com.br:8007';
// var server = 'localhost';
// var server = 'mtzdl012437';
$.ajax({
  // type: "POST",
  type: "GET",
  //url: "http://localhost/SIGO_INTEGRADO_3/wsTelemont/sigo/adm/ponto/salvarRegistroPontoCerca",
  url: "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/sigo/thinc/buscarTarefasFechadasClick/MG/2018-05-14",
  // url: "http://" + server + "/SIGO_INTEGRADO_3/wsTelemont/sigo/adm/ponto/buscarFuncionarioCerca/123188",
  // url: "http://" + server + "/SIGO_INTEGRADO_3/wsTelemont/sigo/adm/ponto/buscarRegiaoCerca/sigo_ponto/3",
  // url: "http://" + server + "/SIGO_INTEGRADO_3/wsTelemont/sigo/adm/ponto/buscarTodasRegioes/sigo_ponto",
  // url: "http://" + server + "/SIGO_INTEGRADO_3/wsTelemont/sigo/adm/ponto/buscarTipoProximoPonto/123188",
  cache: true,
  dataType: "json",
  data : {
    'chapa': '123188',
    'geolocalizacao': '-19.856473605491274,-43.956051117278776'
  },
  headers : {
    'user' : 'sigo',
    'pass' : '94a4964c959e7fafd868b85a301e8d47'
  },
  success: function(res) {
    console.log(res);
  },
  error: function(a){
    console.log(a);
  }
});
</script>
</head>
<html>
</html>
