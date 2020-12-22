import { ErrorProps } from 'next/error'
import Layout from 'components/layout'
import Head from 'next/head'
import { NextPage } from 'next'

const title = 'Page not found'

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  const status = `${statusCode}`.replace(/0/g, '<span>0</span>')
  return (
    <Layout title={title} id='error-page-container' header>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <h1 dangerouslySetInnerHTML={{ __html: status }} />
      <h2>{title}</h2>
    </Layout>
  )
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const { statusCode: currentStatusCode = 500 } = res || {}
  const { statusCode: thrownStatusCode } = err || {}
  const statusCode = thrownStatusCode || currentStatusCode

  if (res) {
    res.statusCode = statusCode
  }

  return { statusCode }
}

export default ErrorPage
