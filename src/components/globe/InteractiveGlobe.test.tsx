import { act, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { InteractiveGlobe } from '@/components/globe/InteractiveGlobe'
import createGlobe from '@/vendor/cobe'

vi.mock('@/vendor/cobe', () => ({ default: vi.fn(() => ({ update: vi.fn(), destroy: vi.fn() })) }))

afterEach(() => vi.unstubAllGlobals())

describe('InteractiveGlobe rendering budget', () => {
  it('passes CSS dimensions so the vendor applies DPR exactly once', () => {
    let intersect: IntersectionObserverCallback | undefined
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) { intersect = callback }
      observe() {}
      disconnect() {}
    })
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 640, height: 640 } as DOMRect)
    vi.stubGlobal('devicePixelRatio', 2)
    const { unmount } = render(<InteractiveGlobe markers={[]} arcs={[]} />)
    act(() => intersect?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver))
    expect(createGlobe).toHaveBeenLastCalledWith(expect.any(HTMLCanvasElement), expect.objectContaining({ width: 640, height: 640, devicePixelRatio: 2 }))
    const instance = vi.mocked(createGlobe).mock.results.at(-1)!.value
    unmount()
    expect(instance.destroy).toHaveBeenCalledTimes(1)
  })
})
