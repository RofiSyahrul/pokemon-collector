import type { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'

import Head from 'next/head'

import type { MetaHeadProps } from './meta-head'
import renderMetaHead from './meta-head'

interface LayoutProps
  extends MetaHeadProps,
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
  children?: ReactNode
  header?: ReactNode
}

const Layout: FC<LayoutProps> = ({
  children,
  colorName,
  description,
  header,
  image,
  title,
  ...props
}) => {
  return (
    <>
      <Head>{renderMetaHead({ colorName, description, image, title })}</Head>
      {header}
      <main {...props}>{children}</main>
    </>
  )
}

export default Layout
