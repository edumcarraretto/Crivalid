import { useEffect } from 'react'

export function usePageMetadata(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content

    document.title = `${title} | MAKEPLOY`
    if (meta) meta.content = description

    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [description, title])
}
