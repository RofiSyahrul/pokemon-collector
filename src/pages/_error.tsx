import { ErrorProps } from 'next/error'
import { NextPage } from 'next'

import ErrorPage from '@/components/pages/error'

const Page: NextPage<ErrorProps> = props => {
  return <ErrorPage {...props} />
}

Page.getInitialProps = ({ res, err }) => {
  const { statusCode: currentStatusCode = 500 } = res || {}
  const { statusCode: thrownStatusCode } = err || {}
  const statusCode = thrownStatusCode || currentStatusCode

  if (res) {
    res.statusCode = statusCode
  }

  return { statusCode }
}

export default Page
