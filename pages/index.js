import Head from 'next/head'

import Layout from '../components/common/Layout.component'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>NOT GOJEK</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='h-full sm:h-0 xl:h-full grid sm:hidden xl:grid place-items-center sm:place-items-start xl:place-items-center mx-0'>
        {/* src='/images/head-empty.jpg' */}
        <img
          src='/images/welcome-to.svg'
          className='cursor-pointer w-full sm:w-0 xl:w-1/2 h-auto transform sm:scale-0 xl:scale-150'
          onClick={(e) => e.target.classList.toggle('invert')}
        ></img>
      </div>
    </Fragment>
  )
}
