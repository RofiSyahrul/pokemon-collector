import 'nprogress/nprogress.css'
import '@/styles/tailwind.css'
import '@/styles/app.css'

import { useEffect } from 'react'
import type { FC } from 'react'

import { useRouter } from 'next/router'
import { ApolloProvider } from '@apollo/client'
import NProgress from 'nprogress'

import { useApollo } from '@/lib/apollo-client'
import { AppProvider } from '@/context/app.context'

interface AppProps {
  Component: FC<PageProps>
  pageProps: PageProps
}

NProgress.configure({
  template: '<div class="bar" role="bar"><div class="peg"></div></div>',
})

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const client = useApollo(pageProps.initialApolloState)
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
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ApolloProvider>
  )
}

export default App
