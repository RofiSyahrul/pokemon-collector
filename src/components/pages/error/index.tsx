import type { FC } from 'react'

import clsx from 'clsx'
import type { ErrorProps } from 'next/error'
import Head from 'next/head'

import Header from '@/components/_shared/header'
import Layout from '@/components/_shared/layout'

const ErrorPage: FC<ErrorProps> = ({ statusCode, title = 'ERROR' }) => {
  const status = `${statusCode}`.replace(
    /0/g,
    '<span class="fancy-text">0</span>'
  )

  return (
    <Layout
      className={clsx(
        '[height:calc(100vh-64px)] lg:[height:calc(100vh-80px)]',
        'w-full grid grid-rows-[repeat(2,max-content)] gap-3',
        'justify-center justify-items-center content-center items-center',
        'relative px-4'
      )}
      header={<Header />}
      title={title}
    >
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <h1
        className='text-9xl sm:text-[10rem] text-center font-bold'
        dangerouslySetInnerHTML={{ __html: status }}
      />
      <h2 className='text-4xl text-center font-bold'>{title}</h2>
    </Layout>
  )
}

export default ErrorPage
