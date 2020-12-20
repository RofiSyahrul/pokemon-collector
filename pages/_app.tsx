import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import {
  css,
  DefaultTheme,
  FlattenSimpleInterpolation,
} from 'styled-components'
import GlobalStyle from 'goods-core/lib/global-style'
import { GoodsProvider, overrideGoodsTheme } from 'goods-core'
import { useApollo } from 'lib/apollo-client'

const fontBase = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  'sans-serif',
].join(', ')

const appTheme: DefaultTheme = {
  ...(overrideGoodsTheme({
    breakpoints: { sm: '481px', md: '561px', xl: '1081px' },
    colors: {
      green20: '#d6ffde',
      green50: '#03ac0e',
      green80: '#12883d',
      black30: '#31353b',
      black40: '#000000',
      red10: '#ffeaef',
      red60: '#ff5c85',
      red80: '#ef144b',
      orange70: '#ff8c00',
      orange90: '#fa581d',
      white30: '#f3f4f5',
      white40: '#e5e7e9',
    },
  }) as DefaultTheme),
  fontBase,
}

const fontFace = css``

const appStyle = css`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  body,
  * {
    font-family: ${({ theme }) => theme.fontBase};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  #__next {
    width: 100%;
  }

  .pokemon-img-box img {
    border-radius: 50%;
  }

  .pokemon-name {
    border-radius: 0px 8px 8px 0px;
  }

  ${({ theme }) => {
    const { radius, colors } = theme
    return css`
      @media (hover: hover) {
        .pokemon-card img {
          filter: grayscale(100%);
        }
        .pokemon-card:hover {
          img {
            filter: none;
            transform: scale(1.1);
          }
        }
        a.pokemon-card {
          .pokemon-img-box {
            border: 1px solid rgba(0, 0, 0, 0.96);
          }
          .total-my-pokemons {
            background-color: ${colors.black40};
          }
        }
        a.pokemon-card:hover {
          .pokemon-name {
            color: ${colors.green50};
          }
          .pokemon-img-box {
            border-color: ${colors.green50};
          }
          .total-my-pokemons {
            background-color: ${colors.green50};
          }
        }
      }

      @media (max-width: 1080.95px) {
        .pokemon-card:nth-child(even) {
          flex-direction: row-reverse;
          border-radius: ${radius('l', 'full', 'full', 'l')};
          .pokemon-text-box,
          .pokemon-name {
            border-radius: ${radius('l', '0', '0', 'l')};
          }
          .pokemon-name {
            text-align: right;
          }
          .total-my-pokemons {
            right: unset;
            left: 0px;
            border-radius: ${radius('0', 'l')};
          }
        }
      }
    `
  }}
` as FlattenSimpleInterpolation

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = useApollo((pageProps as PageProps).initialApolloState)
  return (
    <ApolloProvider client={client}>
      <GoodsProvider noGlobalStyle theme={appTheme}>
        <GlobalStyle fontFace={fontFace} extra={appStyle} />
        <Component {...pageProps} />
      </GoodsProvider>
    </ApolloProvider>
  )
}

export default App
