import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { GoodsProvider } from 'goods-core'
import { useApollo } from 'lib/apollo-client'
import appTheme from 'styles/theme'
import AppStyle from 'styles/global'
import { AppProvider } from 'context/app.context'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = useApollo((pageProps as PageProps).initialApolloState)
  return (
    <ApolloProvider client={client}>
      <GoodsProvider noGlobalStyle theme={appTheme}>
        <AppProvider>
          <AppStyle />
          <Component {...pageProps} />
        </AppProvider>
      </GoodsProvider>
    </ApolloProvider>
  )
}

export default App
