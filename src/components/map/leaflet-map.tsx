import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';
import type { LatLngTuple } from 'leaflet';
import { cn } from '@/lib/utils';

L.Icon.Default.mergeOptions({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
});

interface Restaurant {
  id: number;
  name: string;
  coords: LatLngTuple;
  rating: number;
}

interface Props {
  className?: string;
  restaurants?: Restaurant[] | [];
}

const calculateCenter = (restaurants: Restaurant[]): LatLngTuple => {
  if (restaurants.length === 0) return [0, 0];

  const totalLat = restaurants.reduce((sum, restaurant) => sum + restaurant.coords[0], 0);
  const totalLng = restaurants.reduce((sum, restaurant) => sum + restaurant.coords[1], 0);

  return [totalLat / restaurants.length, totalLng / restaurants.length];
};

const UpdateMarkers = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const map = useMap();

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    restaurants.forEach((restaurant) => {
      const marker = L.marker(restaurant.coords).addTo(map);
      marker.bindPopup(
        `<div class="text-sm font-medium">${restaurant.name} - Rating: ${restaurant.rating}</div>`
      );
    });

    if (restaurants.length > 0) {
      const center = calculateCenter(restaurants);
      map.setView(center, map.getZoom());
    }
  }, [restaurants, map]);

  return null;
};

const LeafletMap = ({ className, restaurants = [] }: Props) => {
  const defaultCenter: LatLngTuple = [0, 0];

  return typeof window !== 'undefined' ? (
    <div className={cn('relative h-[320px] w-full rounded-lg shadow-lg overflow-hidden', className)}>
      {/* Wrapper div for proper z-index handling */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <MapContainer 
          center={defaultCenter} 
          zoom={14} 
          className="h-full w-full"
          style={{ zIndex: 0 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <UpdateMarkers restaurants={restaurants} />
        </MapContainer>
      </div>
    </div>
  ) : null;
};

export default LeafletMap;