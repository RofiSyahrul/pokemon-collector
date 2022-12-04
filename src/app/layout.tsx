import 'nprogress/nprogress.css'
import '@/styles/tailwind.css'
import '@/styles/app.css'

import { AppProvider } from '@/context/app.context'

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
