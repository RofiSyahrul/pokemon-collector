import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import {
  css,
  DefaultTheme,
  FlattenSimpleInterpolation,
} from 'styled-components'
import GlobalStyle from 'goods-core/cjs/global-style'
import { GoodsProvider } from 'goods-core/cjs/goods-context'
import { overrideGoodsTheme } from 'goods-core/cjs/theme'
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
