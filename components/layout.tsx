import { memo } from 'react'
import isEqual from 'react-fast-compare'
import Head from 'next/head'
import { Box, useGoods } from 'goods-core'
import { ResponsiveValue } from '@styled-system/core'

interface SEOProps {
  title?: string
  description?: string
}

interface LayoutProps extends SEOProps {
  isPokemonList?: boolean
  children?: React.ReactNode
}

const defaultTitle = 'Catch Pokemons by Rofi'
const defaultDescription = 'Catch and collect pokemons from various places'
const url = 'https://catch-pokemons.rofisyahrul.com'
const image = `${url}/pokeball.png`
const creator = '@RofiSyahrul'

const SEO = memo<SEOProps>(
  ({ title = defaultTitle, description = defaultDescription }) => {
    const pageTitle =
      title === defaultTitle ? title : `${title} | ${defaultTitle}`
    return (
      <Head>
        <title key='title'>{pageTitle}</title>
        <link key='canonical' rel='canonical' href={url} />
        <meta name='description' content={description} />
        <meta name='image' content={image} />

        <meta name='og:title' property='og:title' content={pageTitle} />
        <meta name='og:type' property='og:type' content='website' />
        <meta name='og:url' property='og:url' content={url} />
        <meta
          name='og:description'
          property='og:description'
          content={description}
        />
        <meta name='og:image' property='og:image' content={image} />

        <meta name='twitter:dnt' content='on' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content={creator} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
      </Head>
    )
  },
  isEqual
)

const PWA: React.FC = () => {
  const {
    colors: { green50 },
  } = useGoods()

  return (
    <Head>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/icons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/icons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/icons/android-chrome-192x192.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/icons/favicon-16x16.png'
      />
      <link rel='manifest' href='/manifest.json' />
      <link
        rel='mask-icon'
        href='/icons/safari-pinned-tab.svg'
        color={green50}
      />
      <link rel='icon' href='/icons/favicon.ico' />
      <link rel='shortcut icon' href='/icons/favicon.ico' />
      <meta name='apple-mobile-web-app-title' content={defaultTitle} />
      <meta name='application-name' content={defaultTitle} />
      <meta name='msapplication-TileColor' content={green50} />
      <meta
        name='msapplication-TileImage'
        content='/icons/mstile-144x144.png'
      />
      <meta name='msapplication-config' content='/browserconfig.xml' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  )
}

const gTempCol: ResponsiveValue<string> = {
  xs: '1fr',
  sm: '1fr 1fr',
  xl: 'repeat(4, 1fr)',
}

const Layout = memo<LayoutProps>(
  ({ children, isPokemonList, title, description }) => {
    return (
      <>
        <SEO title={title} description={description} />
        <PWA />
        {isPokemonList ? (
          <Box
            as='main'
            id='pokemon-list-container'
            w
            p={{ xs: 's', lg: 'l' }}
            d='grid'
            gTempCol={gTempCol}
            gap='20px'
            gAutoFlow='row'
          >
            {children}
          </Box>
        ) : (
          <main>{children}</main>
        )}
      </>
    )
  },
  isEqual
)

export default Layout
