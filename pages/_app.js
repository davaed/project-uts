import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import ContextProvider from '../state/contextProvider'

import '../styles/tailwind.css'
import '../styles/globals.css'

// bg-[#d3f26a], bg-[#25282b]
// bg-[#FEE7DC], bg-[#EEF7FA], bg-[#222222]

function SectionNavigation({ router }) {
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState(router.pathname)
  const tabList = [
    {
      path: 'go-ride',
      icon: 'maps',
      background: 'lime',
    },
    {
      path: 'go-food',
      icon: 'food',
      background: 'jasmine',
    },
    {
      path: 'history',
      icon: 'pays',
      background: 'rose',
    },
    {
      path: 'cat',
      icon: 'qmark',
      background: 'silver',
    },
  ]

  function redirect(url) {
    setActiveTab(url)
    router.push(url)
  }

  return (
    <div className='h-full grid grid-cols-2 gap-8 text-[#333333]'>
      {tabList.map((tab, index) => (
        <div
          className={`grid place-items-center cursor-pointer bg-${tab.background} bg-opacity-80 hover:bg-opacity-100 transition ease-in-out duration-200 p-8`}
          key={index}
          onClick={() => redirect(`/${tab.path}`)}
        >
          <img src={`/icons/icon-${tab.icon}.svg`} className='w-24 h-24' />
        </div>
      ))}
    </div>
  )
}

export default function NotGojekApp({ Component, pageProps }) {
  const router = useRouter()

  const tabList = ['go-ride', 'go-food', 'history', 'cat']
  const [onChildComponent, setOnChildComponent] = useState(false)

  function redirect(url) {
    router.push(url)
  }

  useEffect(() => {
    const path = router.pathname.split('/')[1]
    setOnChildComponent(tabList.includes(path) ? true : false)
  }, [router.pathname])

  return (
    <main
      className={`h-screen grid ${
        onChildComponent ? 'grid-cols-5' : 'grid-cols-2'
      }`}
    >
      <div
        className={`h-full ${
          onChildComponent ? 'col-span-2' : 'col-span-1'
        } border-r p-8`}
      >
        <div className='h-full flex flex-col justify-between'>
          <div className='flex justify-between items-center'>
            <div
              className='cursor-pointer text-2xl hover:underline'
              onClick={() => redirect('/')}
            >
              食べたい
            </div>
          </div>
          <div className='grid place-items-center font-medium text-9xl'>
            <h1>食べたい</h1>
            {onChildComponent && (
              <div className={`h-full pt-12`}>
                <SectionNavigation router={router} />
              </div>
            )}
          </div>
          <div className='flex justify-end space-x-8'>
            <div>github</div>
            <div>about</div>
          </div>
        </div>
      </div>
      {!onChildComponent ? (
        <div className={`h-full col-span-1 p-8`}>
          <SectionNavigation router={router} />
        </div>
      ) : (
        <section className='col-span-3'>
          <ContextProvider>
            <Component {...pageProps} />
          </ContextProvider>
        </section>
      )}
    </main>
  )
}
