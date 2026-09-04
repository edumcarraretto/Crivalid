export const SITE = {
  name: 'MAKEPLOY',
  legalName: 'MAKEPLOY',
  url: 'https://www.makeploy.com',
  email: 'contato@makeploy.com',
  country: 'Brasil',
  lastLegalUpdate: '3 de setembro de 2026',
} as const

export function createMailto(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
