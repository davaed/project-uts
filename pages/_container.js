import { Fragment, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

// state management
import { GlobalContext } from '../context/globalProvider'
import GoFoodProvider from '../context/goFoodProvider'
import GoRideProvider from '../context/goRideProvider'

// components
import ModalAllowAccessLocation from '../components/common/ModalNotifAllow.component'
import SectionLeftComponent from '../components/default/SectionLeft.component'
import SectionRightComponent from '../components/default/SectionRight.component'

import decrypter from '../utils/decrypter'
import {
  fetchNearestLocation,
  getAddressFromLocation,
} from '../utils/getLocation'

export default function Container({ Component, pageProps }) {
  const router = useRouter()

  const [globalLocation, setGlobalLocation] = useContext(GlobalContext)
  const [activeSession, setActiveSession] = useState(router.pathname)
  const [allowAccess, setAllowAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  const apikey =
    'U2FsdGVkX1+jkLvStswJLI4uF7JP7fEXoTTXKX8r5ODhm2IYt0/hposxKZcdqCSA9C0IF4IMDZBZS+Mi48RAtA=='
  const routerList = [
    { path: 'go-ride', icon: 'maps', background: 'bg-box-lime' },
    { path: 'go-food', icon: 'food', background: 'bg-box-jasmine' },
    { path: 'history', icon: 'pays', background: 'bg-box-rose' },
    { path: 'easteregg', icon: 'qmark', background: 'bg-box-silver' },
  ]
  async function updateStateLocation(lat, lng) {
    const _apikey = decrypter(apikey)
    await fetchNearestLocation(_apikey, lat, lng).then((res) => {
      const adddress = getAddressFromLocation(res)
      setGlobalLocation(adddress)
    })
    return
  }

  useEffect(() => {
    // check if the current pathname is in the routerList.path
    // to update the className of the active tab
    const path = router.pathname.split('/')[1]
    setActiveSession(routerList.find((tab) => tab.path === path) ? true : false)
  }, [router])

  useEffect(() => {
    if (!allowAccess) return

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      updateStateLocation(position.coords.latitude, position.coords.longitude)

      setAllowAccess(true)
      localStorage.setItem('allowAccess', true)
    }
    )
  }, [allowAccess])

  useEffect(() => {
    setAllowAccess(localStorage.getItem('allowAccess'))
    setLoading(false)
  }, [])

  return (
    <main
      className={`h-screen divide-x grid grid-cols-1 ${
        activeSession ? 'xl:grid-cols-5' : 'xl:grid-cols-2'
      }`}
    >
      <Fragment>
        <SectionLeftComponent
          activeSession={activeSession}
          router={router}
          routerList={routerList}
        />
        {!loading && (
          <Fragment>
            {!allowAccess ? (
              <ModalAllowAccessLocation allowAccessLocation={setAllowAccess} />
            ) : (
              <GoFoodProvider>
                <GoRideProvider>
                  <SectionRightComponent
                    Component={Component}
                    pageProps={pageProps}
                    activeSession={activeSession}
                  />
                </GoRideProvider>
              </GoFoodProvider>
            )}
          </Fragment>
        )}
      </Fragment>
    </main>
  )
}
