import MetaHead from '@/components/_shared/meta-head'

import type { PageParams } from './types'

export default function Head({ params }: AppPageProps<PageParams>) {
  const page = params?.page?.toString()

  let pathname = ''
  let title: string | undefined
  if (page) {
    pathname = `/page/${page}`
    title = `Page ${page}`
  }

  return <MetaHead pathname={pathname} title={title} />
}
