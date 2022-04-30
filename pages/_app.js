import { Fragment, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import '../styles/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const hiddenMenu = useRef(null)

  const [activeTab, setActiveTab] = useState(router.pathname)

  function showHiddenMenu() {
    hiddenMenu.current.classList.toggle('menu-active')
  }

  useEffect(() => {
    setActiveTab(router.pathname)
  }, [router.pathname])

  return (
    <Fragment>
      <header className='grid grid-cols-2 md:grid-cols-3 border border-[#cfcfcf] rounded-sm mx-5 sm:mx-10 lg:mx-20 xl:mx-40 p-4 my-4'>
        <div className='flex flex-start'>
          <Link href='/'>
            <a className='font-semibold text-2xl sm:text-3xl text-[#00a770]'>
              <span className='hidden sm:block'>GoWhatever</span>
              <span className='block sm:hidden'>GOW</span>
            </a>
          </Link>
        </div>
        <div className='md:flex justify-center items-center hidden space-x-12'>
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
          <button>
            <span className='text-2xl md:text-3xl hidden md:block'>#</span>
            <span
              className='block md:hidden hover:bg-[#00a770] hover:bg-opacity-40 runded-md transition ease-in-out duration-200 p-1.5'
              onClick={showHiddenMenu}
            >
              <img src='/menu.svg' className='transform scale-[.85]' />
            </span>
          </button>
        </div>
        <div
          className='col-span-2 flex text-xl border-t border-[#eaeaea] space-x-6 mt-4 pt-4 hidden'
          ref={hiddenMenu}
        >
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
      </header>

      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
