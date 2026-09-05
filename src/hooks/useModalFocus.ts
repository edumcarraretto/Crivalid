import { useEffect, type RefObject } from 'react'

/** Keep focus and the accessibility tree inside the open modal. */
export function useModalFocus(isOpen: boolean, modalRef: RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    const modal = modalRef.current
    if (!isOpen || !modal) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const siblings: Array<{ element: HTMLElement; inert: boolean }> = []
    let branch: HTMLElement = modal
    while (branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch && sibling instanceof HTMLElement) {
          siblings.push({ element: sibling, inert: sibling.inert })
          sibling.inert = true
        }
      }
      if (branch.parentElement === document.body) break
      branch = branch.parentElement
    }
    document.body.style.overflow = 'hidden'
    const focusable = () => Array.from(modal.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]',
    )).filter((element) => !element.closest('[inert], [hidden]') && element.tabIndex >= 0)
    const focusFirst = () => (focusable()[0] ?? modal).focus({ preventScroll: true })
    focusFirst()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'Tab') {
        const elements = focusable()
        const first = elements[0]
        const last = elements.at(-1)
        if (!first || !last) { event.preventDefault(); modal.focus(); return }
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !modal.contains(event.target)) focusFirst()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocus)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocus)
      for (const sibling of siblings) sibling.element.inert = sibling.inert
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [isOpen, modalRef, onClose])
}
