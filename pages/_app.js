import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import '../styles/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(router.pathname)

  useEffect(() => {
    setActiveTab(router.pathname)
  }, [router.pathname])

  return (
    <Fragment>
      <header className='grid grid-cols-3 border border-[#cfcfcf] rounded-sm mx-40 p-4 my-4'>
        <div className='flex flex-start'>
          <Link href='/'>
            <a className='font-semibold text-3xl text-[#00a770]'>GoWhatever</a>
          </Link>
        </div>
        <div className='flex items-center justify-center space-x-24'>
          <Link href='/go-ride'>
            <a
              className={`${
                activeTab.includes('go-ride') ? 'text-[#00a770]' : ''
              } font-medium hover:text-[#00a770]`}
            >
              Go Ride
            </a>
          </Link>
          <Link href='/go-food'>
            <a
              className={`${
                activeTab.includes('go-food') ? 'text-[#00a770]' : ''
              } font-medium hover:text-[#00a770]`}
            >
              Go Food
            </a>
          </Link>
        </div>
        <div className='flex justify-end'>
          <Link href='/'>
            <a className='text-3xl'>#</a>
          </Link>
        </div>
      </header>

      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
