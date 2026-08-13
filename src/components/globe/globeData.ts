import type { Arc, Marker } from './InteractiveGlobe'

export const globeMarkers: Marker[] = []

export const globeArcs: Arc[] = [
  // Conexões originais
  { id: 'sao-paulo-nova-york', from: [-23.5505, -46.6333], to: [40.7128, -74.006], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'nova-york-londres', from: [40.7128, -74.006], to: [51.5074, -0.1278], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'londres-paris', from: [51.5074, -0.1278], to: [48.8566, 2.3522], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'paris-dubai', from: [48.8566, 2.3522], to: [25.2048, 55.2708], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'dubai-toquio', from: [25.2048, 55.2708], to: [35.6762, 139.6503], color: [0.55, 0.20, 0.95] }, // Purple
  { id: 'cidade-do-cabo-doha', from: [-33.9249, 18.4241], to: [25.2854, 51.531], color: [0.06, 0.72, 0.50] }, // Emerald
  
  // Novas conexões Américas
  { id: 'sao-paulo-buenos-aires', from: [-23.5505, -46.6333], to: [-34.6037, -58.3816], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'nova-york-san-francisco', from: [40.7128, -74.006], to: [37.7749, -122.4194], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'san-francisco-osaka', from: [37.7749, -122.4194], to: [34.6937, 135.5023], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'paris-sao-paulo', from: [48.8566, 2.3522], to: [-23.5505, -46.6333], color: [0.55, 0.20, 0.95] }, // Purple
  
  // Novas conexões Ásia e Oceania
  { id: 'toquio-sydney', from: [35.6762, 139.6503], to: [-33.8688, 151.2093], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'sydney-singapore', from: [-33.8688, 151.2093], to: [1.3521, 103.8198], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'singapore-abu-dhabi', from: [1.3521, 103.8198], to: [24.4539, 54.3773], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'dubai-mumbai', from: [25.2048, 55.2708], to: [19.0760, 72.8777], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'mumbai-kuala-lumpur', from: [19.0760, 72.8777], to: [3.139, 101.6869], color: [0.55, 0.20, 0.95] }, // Purple
  { id: 'toquio-beijing', from: [35.6762, 139.6503], to: [39.9042, 116.4074], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'beijing-bangkok', from: [39.9042, 116.4074], to: [13.7563, 100.5018], color: [0.02, 0.71, 0.83] }, // Cyan
  
  // Novas conexões Europa e África
  { id: 'londres-berlin', from: [51.5074, -0.1278], to: [52.5200, 13.4050], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'buenos-aires-cidade-do-cabo', from: [-34.6037, -58.3816], to: [-33.9249, 18.4241], color: [0.23, 0.51, 0.96] }, // Blue

  // Expansão Américas
  { id: 'cidade-do-mexico-boston', from: [19.4326, -99.1332], to: [42.3601, -71.0589], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'toronto-dublin', from: [43.6532, -79.3832], to: [53.3498, -6.2603], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'lima-rio-de-janeiro', from: [-12.0464, -77.0428], to: [-22.9068, -43.1729], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'santiago-montevideo', from: [-33.4489, -70.6693], to: [-34.9011, -56.1645], color: [0.23, 0.51, 0.96] }, // Blue

  // Expansão Europa e África
  { id: 'lisboa-recife', from: [38.7223, -9.1393], to: [-8.0476, -34.877], color: [0.55, 0.20, 0.95] }, // Purple
  { id: 'madri-cidade-do-mexico', from: [40.4168, -3.7038], to: [19.4326, -99.1332], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'berlin-nairobi', from: [52.52, 13.405], to: [-1.2921, 36.8219], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'nairobi-maputo', from: [-1.2921, 36.8219], to: [-25.9692, 32.5732], color: [0.39, 0.40, 0.94] }, // Indigo

  // Expansão Ásia e Oceania
  { id: 'seul-sapporo', from: [37.5665, 126.978], to: [43.0618, 141.3545], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'singapore-jacarta', from: [1.3521, 103.8198], to: [-6.2088, 106.8456], color: [0.55, 0.20, 0.95] }, // Purple
  { id: 'mumbai-adis-abeba', from: [19.076, 72.8777], to: [9.03, 38.74], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'sydney-auckland', from: [-33.8688, 151.2093], to: [-36.8509, 174.7645], color: [0.02, 0.71, 0.83] }, // Cyan

  // Equilíbrio Pacífico e costa oeste
  { id: 'vancouver-honolulu', from: [49.2827, -123.1207], to: [21.3099, -157.8581], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'honolulu-wellington', from: [21.3099, -157.8581], to: [-41.2866, 174.7756], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'sao-francisco-papeete', from: [37.7749, -122.4194], to: [-17.5516, -149.5585], color: [0.55, 0.20, 0.95] }, // Purple
  { id: 'toquio-guam', from: [35.6762, 139.6503], to: [13.4443, 144.7937], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'vancouver-taipei', from: [49.2827, -123.1207], to: [25.033, 121.5654], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'los-angeles-melbourne', from: [34.0522, -118.2437], to: [-37.8136, 144.9631], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'santiago-christchurch', from: [-33.4489, -70.6693], to: [-43.5321, 172.6362], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'lima-ilha-de-pascoa', from: [-12.0464, -77.0428], to: [-27.1127, -109.3497], color: [0.55, 0.20, 0.95] }, // Purple
  { id: 'manila-suva', from: [14.5995, 120.9842], to: [-18.1248, 178.4501], color: [0.06, 0.72, 0.50] }, // Emerald

  // Equilíbrio Caribe e América Central
  { id: 'bogota-miami', from: [4.711, -74.0721], to: [25.7617, -80.1918], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'bogota-lima', from: [4.711, -74.0721], to: [-12.0464, -77.0428], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'panama-cidade-da-guatemala', from: [8.9824, -79.5199], to: [14.6349, -90.5069], color: [0.39, 0.40, 0.94] }, // Indigo

  // Equilíbrio norte e oeste da África
  { id: 'lagos-lisboa', from: [6.5244, 3.3792], to: [38.7223, -9.1393], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'casablanca-cairo', from: [33.5731, -7.5898], to: [30.0444, 31.2357], color: [0.55, 0.20, 0.95] }, // Purple
  { id: 'lagos-dar-es-salaam', from: [6.5244, 3.3792], to: [-6.7924, 39.2083], color: [0.06, 0.72, 0.50] }, // Emerald

  // Equilíbrio norte da Europa e Ásia Central
  { id: 'estocolmo-copenhague', from: [59.3293, 18.0686], to: [55.6761, 12.5683], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'cairo-istambul', from: [30.0444, 31.2357], to: [41.0082, 28.9784], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'istambul-almaty', from: [41.0082, 28.9784], to: [43.222, 76.8512], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'almaty-ulaanbaatar', from: [43.222, 76.8512], to: [47.8864, 106.9057], color: [0.55, 0.20, 0.95] }, // Purple
]
