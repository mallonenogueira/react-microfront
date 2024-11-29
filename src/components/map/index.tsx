/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "./map.scss";

export function Map({ pos }: { pos: [number, number] }) {
  const position = [51.505, -0.09];

  return (
    // @ts-expect-error
    <MapContainer center={pos || position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        // @ts-expect-error
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
