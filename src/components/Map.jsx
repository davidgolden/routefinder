import React from 'react';
import L from 'leaflet'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import './styles/Map.scss';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import TrailCard from "./TrailCard";
// require('react-leaflet-markercluster/dist/styles.min.css'); // inside .js file


const pointerIcon = new L.Icon({
    iconUrl: require('../map-icon.png'),
    iconRetinaUrl: require('../map-icon.png'),
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
    iconSize: [15, 15],
    shadowSize: [0, 0],
    shadowAnchor: [0, 0],
});

const TrailsMap = props => {
    return <Map
        center={props.position}
        zoom={13}
        maxZoom={18}
        className={'mapContainer'}
        onClick={props.handleClick}
    >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker icon={pointerIcon} position={props.position} />
        <MarkerClusterGroup>
            {props.trails.map(item => {
                return <Marker icon={pointerIcon} position={[item.latitude, item.longitude]}>
                    <Popup>
                        <TrailCard trail={item}/>
                    </Popup>
                </Marker>
            })}
        </MarkerClusterGroup>
    </Map>
};

export default TrailsMap;
