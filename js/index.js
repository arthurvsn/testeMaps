var token = make_base_auth("SIGO", "94a4964c959e7fafd868b85a301e8d47");
$(document).ready(function () {
    //testeWsSigo();
    /* tryGeolocation(); */

    /* rvinicial();
    rvHistorico();
    rvGatilhos();
    rvDetalhamentoBonus(); */
    rvDetalhamentoPontos();
});

var apiGeolocationSuccess = function (position) {
    alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
};

var tryAPIGeolocation = function () {
    jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function (success) {
        apiGeolocationSuccess({ coords: { latitude: success.location.lat, longitude: success.location.lng } });
    })
        .fail(function (err) {
            alert("API Geolocation error! \n\n" + err);
        });
};

var browserGeolocationSuccess = function (position) {
    alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
};

var browserGeolocationFail = function (error) {
    switch (error.code) {
        case error.TIMEOUT:
            alert("Browser geolocation error !\n\nTimeout.");
            break;
        case error.PERMISSION_DENIED:
            if (error.message.indexOf("Only secure origins are allowed") == 0) {
                tryAPIGeolocation();
            }
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Browser geolocation error !\n\nPosition unavailable.");
            break;
    }
};

var tryGeolocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            browserGeolocationSuccess,
            browserGeolocationFail,
            { 
                maximumAge: 50000, 
                timeout: 2000, 
                enableHighAccuracy: true 
            });
    }
}

function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return hash;
}

function testeWsSigoColaborador() {
    
    var uf = $("#uf").val();

    if(uf == "")
    {
        alert("Sem valor");
        return false;
    }
    //var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarColaboradoresUf/"+uf;
    var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarColaboradoresUf/"+uf;

    $.ajax({
        type:"GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo', 
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function(xhr) { },
        data: { },
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error "+ response);
        }
    });
}

function testeWsSigoFolhaPonto() {

    var uf = $("#uf").val();

    if (uf == "") {
        alert("Sem valor");
        return false;
    }
    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarFolhaPonto/"+uf+"/2018-05-15/2018-05-15";
    //var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarFolhaPonto/MG/2018-05-09/2018-05-10";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo',
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}

function testeWsSigoFrota() {

    var uf = $("#uf").val();

    if (uf == "") {
        alert("Sem valor");
        return false;
    }
    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarFrota/"+uf;
    //var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarFrota/"+uf;

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo',
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}

function testeWsSigoTecClick() {

    var uf = $("#uf").val();

    if (uf == "") {
        alert("Sem valor");
        return false;
    }

    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarTecnicosClick/"+uf+"/2018-05-16";
    //var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarTecnicosClick/"+uf+"/2018-05-15";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'thinc',
            pass: '7f3628fec855b8e1b6b0c508685fa34c',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}

function testeWsSigoTarFechadasClick() {

    var uf = $("#uf").val();

    if (uf == "") {
        alert("Sem valor");
        return false;
    }

    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarTarefasFechadasClick/"+uf+"/2018-05-15";
    ///var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarTarefasFechadasClick/"+uf+"/2018-05-14";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo',
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}

function testeWsSigoFerias() {

    var uf = $("#uf").val();

    if (uf == "") {
        alert("Sem valor");
        return false;
    }

    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarFeriasColabores/"+uf;
    //var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/thinc/buscarFeriasColabores/"+uf;

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo',
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}

function rvinicial() {
    
    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvinicial/133649";
    //var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvinicial/133649";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo',
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}

function rvHistorico() {

    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvHistorico/1";
    //var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvHistorico/1";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo',
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}

function rvGatilhos() {

    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvGatilhos/1";
    //var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvGatilhos/1";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo',
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}

function rvDetalhamentoPontos() {

    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvDetalhamentoPontos/1";
    //var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvDetalhamentoPontos/1";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo',
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}

function rvDetalhamentoBonus() {

    var url = "http://sigo.telemont.com.br:8007/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvDetalhamentoBonus/1";
    //var url = "http://localhost/SIGO_INTEGRADO_3/wsTelemont/sigo_seguro/rv/indicadores/rvDetalhamentoBonus/1";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            user: 'sigo',
            pass: '94a4964c959e7fafd868b85a301e8d47',
        },
        beforeSend: function (xhr) { },
        data: {},
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error " + response);
        }
    });
}
/*
$.ajax({
    type: "GET",
    url: ",
    data: {},
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', make_base_auth("SIGO", "94a4964c959e7fafd868b85a301e8d47"));
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (res) {
        console.log(res);
    },
    error: function () { }
}); */