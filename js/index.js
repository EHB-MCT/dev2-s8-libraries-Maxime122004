"use strict";

const app = {
    map: L.map('map').setView([50.842439, 4.322449], 13), // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
    init() {
        // initialise de kaart
        // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
        // vergeet openstreetmap attributie niet
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
        
        // gebruik de functie "loadMarkers" om de markers toe te voegen
        var marker = L.marker([50.842439, 4.322449]).addTo(this.map);
        
        this.loadMarkers();
    },
    loadMarkers() {

        // fetch de data van opendata.brussels.be
        let coordinaten = fetch('https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000')
        .then(response => response.json())
        .then(function(data){
            console.log(data);
            let i = 0;
                data.records.forEach((element) => {
                let lat = data.records[i].fields.wgs84_lat;
                let lon = data.records[i].fields.wgs84_long;
                console.log(lat, lon);
                app.addMarker(lat, lon);
                i++;
            });
        });
        
        
    },
    addMarker(lat, lon) {
        // voeg een marker toe op lat, lon
        var marker = L.marker([lat, lon]).addTo(this.map);
    }
};

app.init();
