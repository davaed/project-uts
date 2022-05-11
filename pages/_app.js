import { Fragment } from 'react'
import NextNProgress from 'nextjs-progressbar'

import '../styles/tailwind.css'
import '../styles/globals.css'

// state management
import GlobalProvider from '../context/globalProvider'

// containers
import Container from './_container'

export default function NotGojekApp({ Component, pageProps }) {
  return (
    <Fragment>
      <NextNProgress color={'#d4e157'} height={4} />
      <GlobalProvider>
        <Container Component={Component} pageProps={pageProps} />
      </GlobalProvider>
    </Fragment>
  )
}
