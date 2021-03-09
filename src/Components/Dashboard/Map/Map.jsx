import React, { useEffect, useState } from 'react'
import classes from './Map.css'
import mapboxgl from "mapbox-gl";

const Mapp = (props) => {
    console.log()
    const[latLang, setLatLang] = useState({
        lat: props.latlng[0],
        lang: props.latlng[1]
    })
    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWlkb3VoayIsImEiOiJja20waXczMmsxYzJ0MnBseWFmMzVrdDFoIn0.TdxEUhofdF6vDHkecx5S5w';

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

 

    useEffect(() => {
        const map = 
        new mapboxgl.Map({
          container: "mapContainer",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [latLang.lat, latLang.lang],
          zoom: 9,
        });
             //add controls to the map
           const nav = new mapboxgl.NavigationControl();
            map.addControl(nav, "top-right");
            const marker = new mapboxgl.Marker()
              .setLngLat([103.811279, 1.345399])
              .addTo(map);

            //get user geolocation
            const geolocate = new mapboxgl.GeolocateControl({
                  positionOptions: {
                    enableHighAccuracy: true
                  },
                  trackUserLocation: true
                });

                map.addControl(geolocate, "top-right")
    }, []);

    
    return (
        <div id="mapContainer" className={classes.map}></div>

    )
}

export default Mapp
