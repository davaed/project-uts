import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import '../styles/tailwind.css'
import '../styles/globals.css'

// state management
import GoFoodProvider from '../context/goFoodProvider'
import GoRideProvider from '../context/goRideProvider'

// components
import SectionLeftComponent from '../components/default/SectionLeft.component'
import SectionRightComponent from '../components/default/SectionRight.component'

export default function NotGojekApp({ Component, pageProps }) {
  const router = useRouter()

  const [activeSession, setActiveSession] = useState(router.pathname)

  const routerList = [
    { path: 'go-ride', icon: 'maps', background: 'bg-box-lime' },
    { path: 'go-food', icon: 'food', background: 'bg-box-jasmine' },
    { path: 'history', icon: 'pays', background: 'bg-box-rose' },
    { path: 'easteregg', icon: 'qmark', background: 'bg-box-silver' },
  ]

  useEffect(() => {
    // check if the current pathname is in the routerList.path
    // to update the className of the active tab
    const path = router.pathname.split('/')[1]
    setActiveSession(routerList.find((tab) => tab.path === path) ? true : false)
  }, [router])

  return (
    <main
      className={`h-screen divide-x grid ${
        activeSession ? 'grid-cols-5' : 'grid-cols-2'
      }`}
    >
      <SectionLeftComponent
        activeSession={activeSession}
        router={router}
        routerList={routerList}
      />
      <GoFoodProvider>
        <GoRideProvider>
          <SectionRightComponent
            Component={Component}
            pageProps={pageProps}
            activeSession={activeSession}
          />
        </GoRideProvider>
      </GoFoodProvider>
    </main>
  )
}
