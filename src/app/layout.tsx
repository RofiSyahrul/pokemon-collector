import '@/styles/tailwind.css'
import '@/styles/app.css'

import AppInit from './app.init'

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
