import type { Arc, Marker } from './InteractiveGlobe'

export const globeMarkers: Marker[] = []

export const globeArcs: Arc[] = [
  // Conexões originais
  { id: 'sao-paulo-nova-york', from: [-23.5505, -46.6333], to: [40.7128, -74.006], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'nova-york-londres', from: [40.7128, -74.006], to: [51.5074, -0.1278], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'londres-paris', from: [51.5074, -0.1278], to: [48.8566, 2.3522], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'paris-dubai', from: [48.8566, 2.3522], to: [25.2048, 55.2708], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'dubai-toquio', from: [25.2048, 55.2708], to: [35.6762, 139.6503], color: [0.55, 0.20, 0.95] }, // Purple
  { id: 'cidade-do-cabo-dubai', from: [-33.9249, 18.4241], to: [25.2048, 55.2708], color: [0.06, 0.72, 0.50] }, // Emerald
  
  // Novas conexões Américas
  { id: 'sao-paulo-buenos-aires', from: [-23.5505, -46.6333], to: [-34.6037, -58.3816], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'nova-york-san-francisco', from: [40.7128, -74.006], to: [37.7749, -122.4194], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'san-francisco-toquio', from: [37.7749, -122.4194], to: [35.6762, 139.6503], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'paris-sao-paulo', from: [48.8566, 2.3522], to: [-23.5505, -46.6333], color: [0.55, 0.20, 0.95] }, // Purple
  
  // Novas conexões Ásia e Oceania
  { id: 'toquio-sydney', from: [35.6762, 139.6503], to: [-33.8688, 151.2093], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'sydney-singapore', from: [-33.8688, 151.2093], to: [1.3521, 103.8198], color: [0.02, 0.71, 0.83] }, // Cyan
  { id: 'singapore-dubai', from: [1.3521, 103.8198], to: [25.2048, 55.2708], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'dubai-mumbai', from: [25.2048, 55.2708], to: [19.0760, 72.8777], color: [0.23, 0.51, 0.96] }, // Blue
  { id: 'mumbai-singapore', from: [19.0760, 72.8777], to: [1.3521, 103.8198], color: [0.55, 0.20, 0.95] }, // Purple
  { id: 'toquio-beijing', from: [35.6762, 139.6503], to: [39.9042, 116.4074], color: [0.06, 0.72, 0.50] }, // Emerald
  { id: 'beijing-singapore', from: [39.9042, 116.4074], to: [1.3521, 103.8198], color: [0.02, 0.71, 0.83] }, // Cyan
  
  // Novas conexões Europa e África
  { id: 'londres-berlin', from: [51.5074, -0.1278], to: [52.5200, 13.4050], color: [0.39, 0.40, 0.94] }, // Indigo
  { id: 'buenos-aires-cidade-do-cabo', from: [-34.6037, -58.3816], to: [-33.9249, 18.4241], color: [0.23, 0.51, 0.96] }, // Blue
]

// ── Activity Messages ─────────────────────────────────────────────────────────
// Simulated platform activity data shown on globe routes when arcs arrive

export interface ActivityMessage {
  icon: string
  label: string
  value: string
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatNum(n: number): string {
  return n.toLocaleString('pt-BR')
}

const activityGenerators: (() => ActivityMessage)[] = [
  () => ({ icon: '🚀', label: 'Projetos criados', value: formatNum(randomInt(120, 890)) }),
  () => ({ icon: '💰', label: 'Receita gerada', value: `R$ ${formatNum(randomInt(500, 5000))}` }),
  () => ({ icon: '👥', label: 'Novos usuários', value: `+${randomInt(2, 15)}` }),
  () => ({ icon: '📦', label: 'Deploys hoje', value: formatNum(randomInt(80, 500)) }),
  () => ({ icon: '🤖', label: 'Prompts de IA', value: formatNum(randomInt(1200, 15000)) }),
  () => ({ icon: '⚡', label: 'Automações', value: formatNum(randomInt(200, 900)) }),
  () => ({ icon: '🎯', label: 'Fluxos criados', value: `+${randomInt(10, 80)}` }),
  () => ({ icon: '🌐', label: 'Páginas publicadas', value: formatNum(randomInt(50, 350)) }),
  () => ({ icon: '📊', label: 'Uptime atual', value: `${(99 + Math.random() * 0.9).toFixed(1)}%` }),
  () => ({ icon: '🔄', label: 'Integrações ativas', value: formatNum(randomInt(40, 280)) }),
]

let lastActivityIndex = -1

export function getRandomActivity(): ActivityMessage {
  let index: number
  do {
    index = Math.floor(Math.random() * activityGenerators.length)
  } while (index === lastActivityIndex && activityGenerators.length > 1)
  lastActivityIndex = index
  return activityGenerators[index]()
}
