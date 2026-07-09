import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Popup,
} from "react-leaflet";

import L, { type LatLngTuple } from "leaflet";

const start: LatLngTuple = [34.0522, -118.2437];
const end: LatLngTuple = [34.0528, -118.2851];

const route: LatLngTuple[] = [
  [34.0522, -118.2437],
  [34.0489, -118.2568],
  [34.0407, -118.2468],
  [34.0347, -118.269],
  [34.0528, -118.2851],
];

const startIcon = L.divIcon({
  html: `
    <div style="
      width:42px;
      height:42px;
      border-radius:999px;
      background:#3F73D8;
      display:flex;
      align-items:center;
      justify-content:center;
      box-shadow:0 10px 30px rgba(0,0,0,.15);
    ">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M5 3L19 12L12 14L10 21L5 3Z"
        stroke="black"
        stroke-width="2"/>
      </svg>
    </div>
  `,
  className: "",
  iconSize: [80, 80],
});

const endIcon = new L.DivIcon({
  html: `
    <div style="
      background:#A5BDEBAB;
      padding:18px;
      border-radius:8px;
      text-align:center;
      min-width:120px;
    ">
      <div style="font-size:20px">🏭</div>
      <div>Job #13</div>
    </div>
  `,
  className: "",
});

const ShipmentMap = () => {
  return (
    <div className="relative z-0 overflow-hidden rounded-xl border border-border-gray h-full">
      <MapContainer center={start} zoom={15} className="h-full w-full">
        <TileLayer
          // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; OpenStreetMap"
        />

        <Marker position={start as any} icon={startIcon}>
          <Popup>Current Location</Popup>
        </Marker>

        <Marker position={end as any} icon={endIcon}>
          <Popup>Job #13</Popup>
        </Marker>

        <Polyline positions={route as any} color="#007AFF" weight={3} />
      </MapContainer>
    </div>
  );
};

export default ShipmentMap;
