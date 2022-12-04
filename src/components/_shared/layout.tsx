import type { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'

import clsx from 'clsx'
import Head from 'next/head'

import pokemonColors from '@/constants/pokemon-colors'

interface SEOProps {
  title?: string
  description?: string
  image?: string
}

interface PWAProps {
  colorName?: keyof typeof pokemonColors
}

interface LayoutProps
  extends SEOProps,
    PWAProps,
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
  children?: ReactNode
  header?: ReactNode
  isPokemonList?: boolean
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

const SEO: FC<SEOProps> = ({
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
}

const PWA: React.FC<PWAProps> = ({ colorName }) => {
  const themeColor = colorName ? pokemonColors[colorName] : '#075985'

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

const Layout: FC<LayoutProps> = ({
  children,
  className,
  colorName,
  description,
  header,
  isPokemonList,
  image,
  title,
  ...props
}) => {
  return (
    <>
      <SEO title={title} description={description} image={image} />
      <PWA colorName={colorName} />
      {header}
      <main
        className={clsx(
          isPokemonList
            ? 'w-full p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 grid-flow-row'
            : '',
          className
        )}
        {...props}
      >
        {children}
      </main>
    </>
  )
}

export default Layout
