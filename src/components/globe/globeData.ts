import type { Arc, Marker } from './InteractiveGlobe'

export const globeMarkers: Marker[] = [
  { id: 'sao-paulo', location: [-23.5505, -46.6333], label: 'São Paulo' },
  { id: 'nova-york', location: [40.7128, -74.006], label: 'Nova York' },
  { id: 'londres', location: [51.5074, -0.1278], label: 'Londres' },
  { id: 'paris', location: [48.8566, 2.3522], label: 'Paris' },
  { id: 'dubai', location: [25.2048, 55.2708], label: 'Dubai' },
  { id: 'toquio', location: [35.6762, 139.6503], label: 'Tóquio' },
  { id: 'cidade-do-cabo', location: [-33.9249, 18.4241], label: 'Cidade do Cabo' },
]

export const globeArcs: Arc[] = [
  { id: 'sao-paulo-nova-york', from: [-23.5505, -46.6333], to: [40.7128, -74.006], label: 'São Paulo · Nova York' },
  { id: 'nova-york-londres', from: [40.7128, -74.006], to: [51.5074, -0.1278], label: 'Nova York · Londres' },
  { id: 'londres-paris', from: [51.5074, -0.1278], to: [48.8566, 2.3522], label: 'Londres · Paris' },
  { id: 'paris-dubai', from: [48.8566, 2.3522], to: [25.2048, 55.2708], label: 'Paris · Dubai' },
  { id: 'dubai-toquio', from: [25.2048, 55.2708], to: [35.6762, 139.6503], label: 'Dubai · Tóquio' },
  { id: 'cidade-do-cabo-dubai', from: [-33.9249, 18.4241], to: [25.2048, 55.2708], label: 'Cidade do Cabo · Dubai' },
]
