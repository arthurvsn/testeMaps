var token = make_base_auth("SIGO", "94a4964c959e7fafd868b85a301e8d47");
$(document).ready(function () {
    //testeWsSigo();
    tryGeolocation();
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

function testeWsSigo() {
    $.ajax({
        type:"GET",
        //url: "http://MTZD37083/SIGO_INTEGRADO_3/wsTelemont/rm/buscarFuncoes",
        url: "http://192.168.5.51:8007/SIGO_INTEGRADO_3/wsTelemont/rm/buscarFuncoes",
        dataType: "json",
        crossDomain: true,
        async: false,
        headers: {
            //'Authorization': 'basic '+ token,
        },
        beforeSend: function(xhr) {
            //xhr.setRequestHeader('Authorization', "Basic " + make_base_auth("SIGO", "94a4964c959e7fafd868b85a301e8d47"));
            xhr.setRequestHeader("Authorization", "Basic" + make_base_auth("SIGO", "94a4964c959e7fafd868b85a301e8d47"));
            xhr.setRequestHeader('Content-Type', 'application/json');
        },
        data: { },
        success: function (res) {
            console.log(res);
        },
        error: function (response) {
            console.log("Error "+ response);
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