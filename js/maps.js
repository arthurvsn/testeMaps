var flightPath;
var map;

/*
	{ lat: -19.963879499999997, lng: -43.939273299999996},
	{ lat: -18.963879499999997, lng: -42.939273299999996},
	center: { lat: -19.963879499999997, lng: -43.939273299999996 },
*/

/* function initMap2() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: { lat: -19.963879499999997, lng: -43.939273299999996 },
		mapTypeId: 'terrain'
	});

	var flightPathCoordinates = [
		{ lat: -19.963879499999997, lng: -43.939273299999996 },
		{ lat: -19.863809499999997, lng: -43.839270299999996 },
	];

	flightPath = new google.maps.Polyline({
		path: flightPathCoordinates,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2,
		draggable: true,
		geodesic: true
	});

	addLine();
} */

/* function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: -19.963879499999997, lng: -43.939273299999996 },
		zoom: 9
	});

	var bounds = {
		north: -19.96,
		south: -19.96,
		east: -43.93,
		west: -43.93
	};

	// Define a rectangle and set its editable property to true.
	var rectangle = new google.maps.Rectangle({
		bounds: bounds,
		editable: true
	});
	rectangle.setMap(map);
} */

function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: -19.963879499999997, lng: -43.939273299999996 },
		zoom: 15
	});

	var redCoords = [
		{ lat: -19.963879499999997, lng: -43.939273299998787 },
		{ lat: -18.963879499990549, lng: -42.939273299789790 },
		{ lat: -18.963879499993418, lng: -42.939273299879797 },
		{ lat: -18.963879499998797, lng: -42.939273299054879 },
	];

	// Construct a draggable red triangle with geodesic set to true.
	var flightPath = new google.maps.Polygon({
		map: map,
		paths: redCoords,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
		draggable: true,
		geodesic: true,
		editable: true
	});

	flightPath.setMap(map);

	/* google.maps.event.addListener(circle, 'radius_changed', function () {
		console.log(circle.getRadius() + " " + circle);
	});

	google.maps.event.addListener(outerPath, 'set_at', function () {
		console.log('Vertex moved on outer path.' + outerPath);
	});

	google.maps.event.addListener(innerPath, 'insert_at', function () {
		console.log('Vertex removed from inner path.' + innerPath);
	});

	google.maps.event.addListener(flightPath, 'bounds_changed', function () {
		console.log('Bounds changed.' + flightPath);
	});*/
}

function addLine() {
	flightPath.setMap(map);
}

function removeLine() {
	flightPath.setMap(null);
}