import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ApolloProvider } from '@apollo/client'
import { GoodsProvider } from 'goods-core'
import NProgress from 'nprogress'
import { useApollo } from 'lib/apollo-client'
import appTheme from 'styles/theme'
import AppStyle from 'styles/global'
import { AppProvider } from 'context/app.context'
import 'nprogress/nprogress.css'

NProgress.configure({
  template: '<div class="bar" role="bar"><div class="peg"></div></div>',
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = useApollo((pageProps as PageProps).initialApolloState)
  const router = useRouter()

  useEffect(() => {
    function startProgressBar() {
      NProgress.start()
    }

    function stopProgressBar() {
      NProgress.done()
    }
    router.events.on('routeChangeStart', startProgressBar)
    router.events.on('routeChangeComplete', stopProgressBar)
    router.events.on('routeChangeError', stopProgressBar)

    return () => {
      router.events.off('routeChangeStart', startProgressBar)
      router.events.off('routeChangeComplete', stopProgressBar)
      router.events.off('routeChangeError', stopProgressBar)
    }
  }, [])

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
