import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function MapComponent(props) {
    const position = props.position.split(',');
    const lat = parseFloat(position[0]);
    const long = parseFloat(position[1]);

    useEffect(() => {
        const map = L.map('map').setView([lat, long], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        // const marker = L.marker([lat, long]).addTo(map);
        // const customIcon = L.icon({
        //     //iconUrl: 'https://media.tenor.com/WpdEISWvPDwAAAAi/shigure-ui-ui-shigure.gif', // Replace with the path to your custom marker image
        //     // iconSize: [280, 200], // Set the size of the icon
        //     iconSize: [280, 200], // Set the size of the icon
        //     iconAnchor: [125, 200], // Set the anchor point for the icon

        //   });


        const customIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/535/535239.png',
            iconSize: [30, 30], // Set the size of the icon
            iconAnchor: [16, 38], // Set the anchor point for the icon

        });
        const marker = L.marker([lat, long], { icon: customIcon }).addTo(map);

        map.on('click', (e) => {
            const { latlng } = e;
            marker.setLatLng(latlng);
            props.func(latlng.lat + "," + latlng.lng);
        });

        return () => {
            map.remove();
        };
    }, [lat, long]);

    const styleMap = {
        height: '35rem',
        width: '40rem',
    };

    return <div id="map" style={styleMap}></div>;
}

export default MapComponent;
