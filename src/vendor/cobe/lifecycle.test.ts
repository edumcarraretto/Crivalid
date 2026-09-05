import { describe, expect, it, vi } from 'vitest'
import createGlobe from '@/vendor/cobe'

describe('vendored globe resource lifecycle', () => {
  it('releases textures and restores the canvas parent across repeated mounts', () => {
    const functions = new Map<string, ReturnType<typeof vi.fn>>()
    const gl = new Proxy({}, { get: (_target, property: string) => {
      if (property === property.toUpperCase()) return 0
      if (!functions.has(property)) functions.set(property, vi.fn(() => property === 'getShaderParameter' || property === 'getProgramParameter' ? true : {}))
      return functions.get(property)
    } })
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(gl as WebGLRenderingContext)
    const parent = document.createElement('div')
    const canvas = document.createElement('canvas')
    parent.append(canvas)
    document.body.append(parent)
    const stylesBefore = document.head.querySelectorAll('style').length
    try {
      for (let cycle = 0; cycle < 3; cycle++) {
        const globe = createGlobe(canvas, { width: 100, height: 100, devicePixelRatio: 2, phi: 0, theta: 0, mapSamples: 100, mapBrightness: 1, baseColor: [1, 1, 1], markerColor: [1, 0, 0], glowColor: [1, 1, 1], diffuse: 1, dark: 0 })
        expect(canvas.width).toBe(200)
        globe.destroy()
        expect(canvas.parentElement).toBe(parent)
        expect(parent.children).toHaveLength(1)
        expect(document.head.querySelectorAll('style')).toHaveLength(stylesBefore)
      }
      expect(functions.get('deleteTexture')).toHaveBeenCalledTimes(3)
    } finally { parent.remove() }
  })
})
