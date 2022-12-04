import 'nprogress/nprogress.css'
import '@/styles/tailwind.css'
import '@/styles/app.css'

import AppInit from '@/store/app.init'

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body>
        <AppInit />
        {children}
      </body>
    </html>
  )
}
