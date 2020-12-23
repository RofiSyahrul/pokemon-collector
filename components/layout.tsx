import { memo } from 'react'
import isEqual from 'react-fast-compare'
import Head from 'next/head'
import { DefaultTheme } from 'styled-components'
import { Box, BoxProps, useGoods } from 'goods-core'
import { ResponsiveValue } from '@styled-system/core'
import Header from 'components/header'
import Loading from 'components/loading'
import { useAppState } from 'context/app.context'

interface SEOProps {
  title?: string
  description?: string
  image?: string
}

interface PWAProps {
  colorName?: keyof DefaultTheme['colors']
}

interface LayoutProps extends SEOProps, BoxProps, PWAProps {
  isPokemonList?: boolean
  children?: React.ReactNode
  header?: boolean
}

const defaultTitle = 'Catch Pokemons'
const defaultDescription = 'Catch and collect pokemons from various places'
const url = 'https://catch-pokemons.rofisyahrul.com'
const defaultImage = `${url}/pokeball.png`
const creator = '@RofiSyahrul'

const keywords = [
  'pokemon',
  'pokedex',
  'catch pokemon',
  'collect pokemon',
  'next.js',
  'react',
  'typescript',
].join(', ')

const SEO = memo<SEOProps>(
  ({
    title = defaultTitle,
    description = defaultDescription,
    image = defaultImage,
  }) => {
    const pageTitle =
      title === defaultTitle ? title : `${title} | ${defaultTitle}`

    return (
      <Head>
        <title key='title'>{pageTitle}</title>
        <meta name='author' content='Rofi' />
        <meta name='keywords' content={`${keywords}, ${title}`} />
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

const PWA: React.FC<PWAProps> = ({ colorName = 'green50' }) => {
  const { colors } = useGoods()
  const themeColor = colors[colorName]

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
        color={themeColor}
      />
      <link rel='icon' href='/icons/favicon.ico' />
      <link rel='shortcut icon' href='/icons/favicon.ico' />
      <meta name='apple-mobile-web-app-title' content={defaultTitle} />
      <meta name='application-name' content={defaultTitle} />
      <meta name='msapplication-TileColor' content={themeColor} />
      <meta
        name='msapplication-TileImage'
        content='/icons/mstile-144x144.png'
      />
      <meta name='msapplication-config' content='/browserconfig.xml' />
      <meta name='theme-color' content={themeColor} />
    </Head>
  )
}

const gTempCol: ResponsiveValue<string> = {
  xs: '1fr',
  sm: '1fr 1fr',
  xl: 'repeat(4, 1fr)',
}

const Layout = memo<LayoutProps>(
  ({
    children,
    isPokemonList,
    title,
    description,
    image,
    colorName,
    header,
    ...props
  }) => {
    const { isReady } = useAppState()
    return (
      <>
        <SEO title={title} description={description} image={image} />
        <PWA colorName={colorName} />
        {(isPokemonList || header) && <Header />}
        {!isReady ? (
          <Loading />
        ) : isPokemonList ? (
          <Box
            as='main'
            id='pokemon-list-container'
            w
            p={{ xs: 's', lg: 'l' }}
            d='grid'
            gTempCol={gTempCol}
            gap='20px'
            gAutoFlow='row'
            {...props}
          >
            {children}
          </Box>
        ) : (
          <Box as='main' {...props}>
            {children}
          </Box>
        )}
      </>
    )
  },
  isEqual
)

Layout.displayName = 'Layout'

export default Layout
