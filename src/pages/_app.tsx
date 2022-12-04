import 'nprogress/nprogress.css'
import '@/styles/tailwind.css'
import '@/styles/app.css'

import type { FC } from 'react'

interface AppProps {
  Component: FC<PageProps>
  pageProps: PageProps
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
