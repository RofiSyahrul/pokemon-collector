import pokemonColors from '@/constants/pokemon-colors'

interface MetaHeadProps {
  colorName?: keyof typeof pokemonColors
  description?: string
  image?: string
  pathname?: string
  title?: string
}

const defaultDescription = 'Catch and collect pokemons from various places'
const url = 'https://catch-pokemons.rofisyahrul.com'
const defaultImage = `${url}/pokeball.png`
const defaultTitle = 'Catch Pokemons'
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

export default function MetaHead({
  colorName,
  description = defaultDescription,
  image = defaultImage,
  pathname = '',
  title = defaultTitle,
}: MetaHeadProps) {
  const themeColor = colorName ? pokemonColors[colorName] : '#075985'
  const pageTitle =
    title === defaultTitle ? title : `${title} | ${defaultTitle}`

  return (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

      <title key='title'>{pageTitle}</title>
      <meta name='author' content='Rofi' />
      <meta name='keywords' content={`${keywords}, ${title}`} />
      <link key='canonical' rel='canonical' href={`${url}${pathname}`} />
      <meta name='description' content={description} />
      <meta name='image' content={image} />

      <meta name='og:title' property='og:title' content={pageTitle} />
      <meta name='og:type' property='og:type' content='website' />
      <meta name='og:url' property='og:url' content={`${url}${pathname}`} />
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
    </>
  )
}
