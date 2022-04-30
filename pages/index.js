import Head from 'next/head'

import Layout from '../components/common/Layout'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Go Whatever</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout
        skips={true}
        page={'go-whatever'}
        description={
          'You can drive and travel wherever and whenever you desire, and eat anything you want without leaving your house!'
        }
      ></Layout>
    </Fragment>
  )
}
