url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

function getColor(d) {
    return d > 5  ? '#DE2613' :
           d > 4  ? '#F89106' :
           d > 3  ? '#DCA400' :
           d > 2   ? '#ECC962' :
           d > 1   ? '#F4F637' :
                      '#87FB81';
}

d3.json(url, function(data) {
	console.log(url);
    //console.log(data);
	
	var token = "pk.eyJ1IjoiaGNsYXJrMTk5MCIsImEiOiJja2F4MnpmYnUwMnFuMzFvYWdtdHlsOG0zIn0.qGyBKvd-xUJA1ToFbiYuKA";
	var mapboxUrl = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=" + token;
	
	var multiplier = 25000;
	
	var first = [];
	var first_mag = [];
	var second = [];
	var second_mag = [];
	var third = [];
	var third_mag = [];
	var fourth = [];
	var fourth_mag = [];
	var fifth = [];
	var fifth_mag = [];
	var sixth = [];
	var sixth_mag = [];
	
	for(var i = 0; i < data["features"].length; i++) {
		
		if(data["features"][i]["properties"]["mag"] < 1) {
			first.push([
				data["features"][i]["geometry"]["coordinates"][0],
				data["features"][i]["geometry"]["coordinates"][1]
			]);
			first_mag.push(data["features"][i]["properties"]["mag"]);
		} else if(data["features"][i]["properties"]["mag"] < 2) {
			second.push([
				data["features"][i]["geometry"]["coordinates"][0],
				data["features"][i]["geometry"]["coordinates"][1]
			]);
			second_mag.push(data["features"][i]["properties"]["mag"]);
		} else if(data["features"][i]["properties"]["mag"] < 3) {
			third.push([
				data["features"][i]["geometry"]["coordinates"][0],
				data["features"][i]["geometry"]["coordinates"][1]
			]);
			third_mag.push(data["features"][i]["properties"]["mag"]);
		} else if(data["features"][i]["properties"]["mag"] < 4) {
			fourth.push([
				data["features"][i]["geometry"]["coordinates"][0],
				data["features"][i]["geometry"]["coordinates"][1]
			]);
			fourth_mag.push(data["features"][i]["properties"]["mag"]);
		} else if(data["features"][i]["properties"]["mag"] < 5) {
			fifth.push([
				data["features"][i]["geometry"]["coordinates"][0],
				data["features"][i]["geometry"]["coordinates"][1]
			]);
			fifth_mag.push(data["features"][i]["properties"]["mag"]);
		} else {
			sixth.push([
				data["features"][i]["geometry"]["coordinates"][0],
				data["features"][i]["geometry"]["coordinates"][1]
			]);
			sixth_mag.push(data["features"][i]["properties"]["mag"]);
		}
		
		// console.log(data["features"][i]["properties"]["mag"], 
					// data["features"][i]["properties"]["magType"], 
					// data["features"][i]["geometry"]["coordinates"]);
		
	}
	
	var first_markers = [];
	var second_markers = [];
	var third_markers = [];
	var fourth_markers = [];
	var fifth_markers = [];
	var sixth_markers = [];
	
	for(var i = 0; i < first.length; i++) {
		first_markers.push(
			L.circle(first[i], {
				fillOpacity: 1,
				color: "#87FB81",
				fillcolor: "87FB81",
				radius: first_mag[i] * multiplier
			}).bindPopup("<h1>Magnitue = " + first_mag[i] + "</h1>")
		);
	}
	
	for(var i = 0; i < second.length; i++) {
		second_markers.push(
			L.circle(second[i], {
				fillOpacity: 1,
				color: "#F4F637",
				fillcolor: "F4F637",
				radius: second_mag[i] * multiplier
			}).bindPopup("<h1>Magnitue = " + second_mag[i] + "</h1>")
		);
	}
	
	for(var i = 0; i < third.length; i++) {
		third_markers.push(
			L.circle(third[i], {
				fillOpacity: 1,
				color: "#ECC962",
				fillcolor: "ECC962",
				radius: third_mag[i] * multiplier
			}).bindPopup("<h1>Magnitue = " + third_mag[i] + "</h1>")
		);
	}
	
	for(var i = 0; i < fourth.length; i++) {
		fourth_markers.push(
			L.circle(fourth[i], {
				fillOpacity: 1,
				color: "#DCA400",
				fillcolor: "DCA400",
				radius: fourth_mag[i] * multiplier
			}).bindPopup("<h1>Magnitue = " + fourth_mag[i] + "</h1>")
		);
	}
	
	for(var i = 0; i < fifth.length; i++) {
		fifth_markers.push(
			L.circle(fifth[i], {
				fillOpacity: 1,
				color: "#F89106",
				fillcolor: "F89106",
				radius: fifth_mag[i] * multiplier
			}).bindPopup("<h1>Magnitue = " + fifth_mag[i] + "</h1>")
		);
	}
	
	for(var i = 0; i < sixth.length; i++) {
		sixth_markers.push(
			L.circle(sixth[i], {
				fillOpacity: 1,
				color: "#DE2613",
				fillcolor: "DE2613",
				radius: sixth_mag[i] * multiplier
			}).bindPopup("<h1>Magnitue = " + sixth_mag[i] + "</h1>")
		);
	}
	
	var lg_first = L.layerGroup(first_markers);
	var lg_second = L.layerGroup(second_markers);
	var lg_third = L.layerGroup(third_markers);
	var lg_fourth = L.layerGroup(fourth_markers);
	var lg_fifth = L.layerGroup(fifth_markers);
	var lg_sixth = L.layerGroup(sixth_markers);
	
	// Create an overlay object
	var overlayMaps = {
	  "0-1": lg_first,
	  "1-2": lg_second,
	  "2-3": lg_third,
	  "3-4": lg_fourth,
	  "4-5": lg_fifth,
	  "5++": lg_sixth
	};
	
	// var first_layer = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
	
	var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmoxOTkwIiwiYSI6ImNqbjJvcnpndTAzcGszd21odHl1azlnZjQifQ.CEDQLx-TiEnk-9I0iHnySQ", {
	  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
	  tileSize: 512,
	  maxZoom: 18,
	  zoomOffset: -1,
	  id: "mapbox/streets-v11",
	  accessToken: "pk.eyJ1IjoidmoxOTkwIiwiYSI6ImNqbjJvcnpndTAzcGszd21odHl1azlnZjQifQ.CEDQLx-TiEnk-9I0iHnySQ"
	});
	
	var baseMaps = {
	  "Street Map": streetmap
	};
	
	var myMap = L.map("map", {
	  // center: [37.09, -95.71],
	  center: [39.461677, 12.343835],
	  zoom: 2,
	  layers: [streetmap, lg_first, lg_second, lg_third, lg_fourth, lg_fifth, lg_sixth]
	});
	
	L.control.layers(baseMaps, overlayMaps, {
	  collapsed: false
	}).addTo(myMap);
	
	
	var legend = L.control({position: 'bottomright'});
	
	legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 1, 2, 3, 4, 5],
			labels = [];

		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < grades.length; i++) {
			div.innerHTML +=
				'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
				grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
			
			console.log(getColor(grades[i] + 1));
		}
		
		return div;
	};
	
	legend.addTo(myMap);

	//console.log(coords);
	console.log(first);
	
});