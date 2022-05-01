import { Fragment, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import '../styles/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const hiddenMenu = useRef(null)
  const hiddenItem = useRef(null)

  const [activeTab, setActiveTab] = useState(router.pathname)

  function showHiddenMenu() {
    const classList =
      'fixed md:relative w-full md:w-auto'.split(' ')

    classList.map((className) => {
      hiddenMenu.current.classList.toggle(className)
    })
    hiddenItem.current.classList.toggle('hidden')
  }

  function redirect(url) {
    router.push(url)
  }

  useEffect(() => {
    setActiveTab(router.pathname)
  }, [router.pathname])

  return (
    <main className='h-fullscreen grid grid-cols-1 md:grid-cols-5 text-black'>
      <header className='md:col-span-2 border-r border-[#d6d6d6] z-[99999] md:z-0'>
        <div className='md:h-fullscreen sticky md:top-12'>
          <div
            className='h-full flex flex-col bg-white md:bg-inherit flex flex-col justify-between border-t border-[#d6d6d6] md:mt-12 border-b'
            ref={hiddenMenu}
          >
            <div className='flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start md:space-y-4 my-3 mx-5 md:m-8'>
              <Link href='/'>
                <a className='font-semibold text-5xl md:text-7xl text-[#00a770] hover:underline'>
                  <span className='hidden md:block'>NOT-GOJEK</span>
                  <span className='block md:hidden'>NG</span>
                </a>
              </Link>
              <button
                className='inline-block md:hidden hover:bg-[#00a770] hover:bg-opacity-40 runded-md transition ease-in-out duration-200'
                onClick={showHiddenMenu}
              >
                <img
                  src='/icons/menu.svg'
                  className='border transform scale-[.85] p-2'
                />
              </button>
              <div className='flex flex-col text-lg text-justify space-y-4 hidden md:block'>
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
            </div>
            <div className='border-t divide-y divide-[#d6d6d6] z-[9999] hidden md:block' ref={hiddenItem}>
              <div className='flex justify-between items-center text-3xl md:text-5xl p-4'>
                <div
                  className={`${
                    activeTab.includes('go-ride') ? 'text-[#00a770]' : ''
                  } font-semibold`}
                >
                  GO-RIDE
                </div>
                <div
                  className='flex hover-menu cursor-pointer space-x-4 p-4'
                  onClick={() => redirect('/go-ride')}
                >
                  <img
                    src='/icons/arrow-up-right.svg'
                    className='transform scale-[1.25] md:scale-[2]'
                  />
                </div>
              </div>
              <div className='flex justify-between items-center text-3xl md:text-5xl p-4'>
                <div
                  className={`${
                    activeTab.includes('go-food') ? 'text-[#00a770]' : ''
                  } font-semibold`}
                >
                  GO-FOOD
                </div>
                <div
                  className='flex hover-menu cursor-pointer space-x-4 p-4'
                  onClick={() => redirect('/go-food')}
                >
                  <img
                    src='/icons/arrow-up-right.svg'
                    className='transform scale-[1.25] md:scale-[2]'
                  />
                </div>
              </div>

              <div className='flex justify-end items-center space-x-8 p-4'>
                <a
                  href='https://github.com/davaed/project-uts'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center cursor-pointer uppercase font-semibold hover:underline space-x-1'
                >
                  <img
                    src='/icons/github.svg'
                    className='transform scale-[.65]'
                  />
                  <span>see in github</span>
                </a>
                <Link href='/about'>
                  <a className='flex items-center cursor-pointer uppercase font-semibold hover:underline space-x-1'>
                    <img
                      src='/icons/eye.svg'
                      className='transform scale-[.65]'
                    />
                    <span>about this website</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className='md:col-span-3 mx-5 md:mx-10'>
        <Component {...pageProps} />
      </section>
    </main>
  )
}

export default MyApp
