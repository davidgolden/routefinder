import React from 'react';
import L from 'leaflet'
import {Map, TileLayer, Marker} from 'react-leaflet';
import './styles/Map.scss';
import MarkerClusterGroup from 'react-leaflet-markercluster';
// require('react-leaflet-markercluster/dist/styles.min.css'); // inside .js file


const pointerIcon = new L.Icon({
    iconUrl: require('../assets/map-icon.png'),
    iconRetinaUrl: require('../assets/map-icon.png'),
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
    iconSize: [15, 15],
    shadowSize: [0, 0],
    shadowAnchor: [0, 0],
});

const getIcon = {
    "trailrun": new L.Icon({
        iconUrl: require('../assets/trailrunicon.svg'),
        iconRetinaUrl: require('../assets/trailrunicon.svg'),
        iconAnchor: [0, 0],
        popupAnchor: [0, 0],
        iconSize: [30, 30],
        shadowSize: [0, 0],
        shadowAnchor: [0, 0],
    }),
    "mtb": new L.Icon({
        iconUrl: require('../assets/mtbicon.svg'),
        iconRetinaUrl: require('../assets/mtbicon.svg'),
        iconAnchor: [0, 0],
        popupAnchor: [0, 0],
        iconSize: [30, 30],
        shadowSize: [0, 0],
        shadowAnchor: [0, 0],
    }),
    "hiking": new L.Icon({
        iconUrl: require('../assets/hikingicon.svg'),
        iconRetinaUrl: require('../assets/hikingicon.svg'),
        iconAnchor: [0, 0],
        popupAnchor: [0, 0],
        iconSize: [30, 30],
        shadowSize: [0, 0],
        shadowAnchor: [0, 0],
    }),
};

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
                return <Marker icon={getIcon[item.source]} position={[item.latitude, item.longitude]} onClick={() => props.setTrailView(item)} />
            })}
        </MarkerClusterGroup>
    </Map>
};

export default TrailsMap;
