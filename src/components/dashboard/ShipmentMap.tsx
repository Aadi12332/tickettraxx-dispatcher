import { useEffect, useId } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import L, { type LatLngTuple } from "leaflet";

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
interface ShipmentMapProps {
  data?: {
    start: LatLngTuple;
    end: LatLngTuple;
    route?: LatLngTuple[];
  };
}

const defaultData = {
  start: [34.0522, -118.2437] as LatLngTuple,
  end: [34.0528, -118.2851] as LatLngTuple,
};

const ShipmentMap = ({ data = defaultData }: ShipmentMapProps) => {
  const { start, end, route } = data;

  // stable, unique id per component instance
  const mapId = useId().replace(/:/g, "");

  useEffect(() => {
    return () => {
      const el = document.getElementById(mapId);
      if (el && (el as any)._leaflet_id) {
        (el as any)._leaflet_id = null;
      }
    };
  }, [mapId]);

  return (
    <MapContainer
      id={mapId}
      center={start}
      zoom={15}
      className="h-full w-full z-[1]"
    >
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />

      {route && route.length > 1 && (
        <>
          <Marker position={start} icon={startIcon} />
          <Marker position={end} icon={endIcon} />
          <Polyline positions={route} color="#007AFF" weight={3} />
        </>
      )}
    </MapContainer>
  );
};

export default ShipmentMap;
