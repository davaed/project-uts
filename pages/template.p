import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import ContextProvider from '../state/contextProvider'

import '../styles/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const leftWrapper = useRef(null)
  const contWrapper = useRef(null)
  const secondItems = useRef(null)

  const [activeTab, setActiveTab] = useState(router.pathname)
  const [isWindows, setIsWindows] = useState(false)

  function redirect(url) {
    showMenus()
    router.push(url)
  }

  function showMenus() {
    if (!isWindows && window.innerWidth < 768) {
      secondItems.current.classList.toggle('hidden')

      contWrapper.current.classList.toggle('bg-white')
      contWrapper.current.classList.toggle('h-screen')
      leftWrapper.current.classList.toggle('h-0')
    }
  }

  useEffect(() => {
    setActiveTab(router.pathname)
  }, [router.pathname])

  useEffect(() => {
    if (window !== undefined) setIsWindows(true)
  }, [])

  return (
    <main className='h-fullscreen grid grid-cols-1 md:grid-cols-5'>
      <header className='md:col-span-2 w-full md:w-auto fixed md:relative border-r border-[#d6d6d6] z-[9999] md:z-0'>
        {/* left-page wrapper */}
        <div
          className='h-20 md:h-fullscreen sticky top-12 bg-white md:bg-inherit'
          ref={leftWrapper}
        >
          {/* left-page content wrapper */}
          <div
            className='md:h-fullscreen flex flex-col justify-between md:border-t border-[#d6d6d6] md:mt-12'
            ref={contWrapper}
          >
            {/* first content */}
            <div className='flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start border-b border-[#d6d6d6] md:border-0 md:space-y-8 py-4 px-8 md:py-0 md:px-0 md:m-8'>
              {/* items logo */}
              <Link href='/'>
                <a className='font-semibold uppercase text-5xl md:text-7xl xl:text-8xl text-[#00a770] hover:underline'>
                  <span className='hidden md:block'>not-gojek</span>
                  <span className='block md:hidden'>ng</span>
                </a>
              </Link>
              {/* endof items logo */}

              {/* items description */}
              <div className='flex flex-col text-justify space-y-4 hidden md:block'>
                <p>
                  Welcome to{' '}
                  <span className='font-semibold text-[#00a770]'>
                    NOT-GOJEK
                  </span>
                  , a site that allows you to schedule rides and solely order
                  food anywhere and whenever you want, without leaving your
                  house!
                </p>
                <p>
                  We are a group of enthusiastic developers dedicated to
                  creating a better future for humans. As a result, people do
                  not have to leave their houses to travel to restaurants or the
                  airport.
                </p>
              </div>
              {/* endof items description */}

              {/* items button menu */}
              <div className='inline-flex'>
                <button className='block md:hidden' onClick={showMenus}>
                  <img
                    src='/icons/menu.svg'
                    className='border transform scale-[.85] p-2'
                  />
                </button>
              </div>
              {/* endof items button menu */}
            </div>
            {/* endof first content */}

            {/* second content */}
            <div
              className='flex flex-col border-t border-[#d6d6d6] divide-y divide-[#d6d6d6] hidden md:block'
              ref={secondItems}
            >
              {/* items go-foods link */}
              <div
                className='flex justify-between items-center cursor-pointer link p-4'
                onClick={() => redirect('/go-food')}
              >
                <div
                  className={`${
                    activeTab.includes('go-food') ? 'link-active' : ''
                  } uppercase font-semibold text-4xl lg:text-5xl`}
                >
                  go-food
                </div>
                <div>
                  <img
                    src='/icons/arrow-up-right.svg'
                    className='transform scale-[1.25] lg:scale-[2]'
                  />
                </div>
              </div>
              {/* endof items go-foods link */}

              {/* items go-ride link */}
              <div
                className='flex justify-between items-center cursor-pointer link p-4'
                onClick={() => redirect('/go-ride')}
              >
                <div
                  className={`${
                    activeTab.includes('go-ride') ? 'link-active' : ''
                  } uppercase font-semibold text-4xl lg:text-5xl`}
                >
                  go-ride
                </div>
                <div>
                  <img
                    src='/icons/arrow-up-right.svg'
                    className='transform scale-[1.25] lg:scale-[2]'
                  />
                </div>
              </div>
              {/* endof items go-ride link */}

              {/* items order-history link */}
              <div
                className='flex justify-between items-center cursor-pointer link-history p-4'
                onClick={() => redirect('/order-history')}
              >
                <div
                  className={`${
                    activeTab.includes('order-history')
                      ? 'link-history-active'
                      : ''
                  } uppercase font-semibold text-4xl lg:text-5xl`}
                >
                  order history
                </div>
                <div>
                  <img
                    src='/icons/arrow-up-right.svg'
                    className='transform scale-[1.25] lg:scale-[2]'
                  />
                </div>
              </div>
              {/* endof items order-history link */}

              <footer className='flex flex-col lg:flex-row justify-end items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-8 p-4'>
                <a
                  href='https://github.com/davaed/project-uts'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center cursor-pointer uppercase font-semibold space-x-1 hover:underline'
                >
                  <img
                    src='/icons/github.svg'
                    className='transform scale-[.65]'
                  />
                  <span>see in github</span>
                </a>
                <Link href='/about'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center cursor-pointer uppercase font-semibold space-x-1 hover:underline'
                  >
                    <img
                      src='/icons/eye.svg'
                      className='transform scale-[.65]'
                    />
                    <span>about this website</span>
                  </a>
                </Link>
              </footer>
            </div>
            {/* endof second content */}
          </div>
          {/* endof left-page content wrapper */}
        </div>
        {/* endof left-page wrapper */}
      </header>
      <section className='md:col-span-3 mt-20 md:mt-0'>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </section>
    </main>
  )
}

export default MyApp
