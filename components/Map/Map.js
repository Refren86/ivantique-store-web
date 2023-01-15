import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Map = () => {
  const icon = L.icon({ iconUrl: '/icons/common/marker.svg', className: 'w-8 h-8' });
  return (
    <MapContainer
      className="w-full h-full"
      center={[49.652296, 23.494377]}
      zoom={16}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[49.65203, 23.494874]} icon={icon} />
    </MapContainer>
  );
}

export default Map;
