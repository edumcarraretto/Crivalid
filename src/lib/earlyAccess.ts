export type EarlyAccessSource = 'navbar' | 'navbar_mobile' | 'hero' | 'workflow' | 'metrics' | 'footer' | 'idea' | 'tools' | 'faq'

export function openEarlyAccess(source: EarlyAccessSource) {
  window.dispatchEvent(new CustomEvent('makeploy:early-access', { detail: { source } }))
}
