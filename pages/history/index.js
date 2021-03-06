import { Fragment, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

// import ContextProvider, { GlobalContext } from '../../state/goFoodProvider'
import { GlobalContext as GoFoodContext } from '../../context/goFoodProvider'
import { GlobalContext as GoRideContext } from '../../context/goRideProvider'

import ContextLayout from '../../components/common/Layout.component'
import GoFoodTable from '../../components/go-food/TableGoFood.component'
import GoRideTable from '../../components/go-ride/TableGoRide.component'
import Loading from '../../components/common/Loading.component'

function SectionButton({ openedTab, setOpenedTab }) {
  const router = useRouter()

  const styles = {
    active: 'border-[#00a770] text-[#ffffff] bg-[#00a770]',
    button:
      'cursor-pointer capitalize border border-[#d6d6d6] transition ease-in-out duration-200 hover:border-[#00a770] hover:text-[#ffffff] hover:bg-[#00a770] p-2 px-4',
    disabled: 'cursor-not-allowed capitalize border border-[#d6d6d6] p-2 px-4',
  }

  useEffect(() => {
    if (router.query.tab && openedTab) setOpenedTab(router.query.tab)
  }, [router])

  return (
    <div className='sticky top-0 z-50 flex justify-end border-b border-[#eaeaea] bg-white space-x-8 my-4 py-4 px-5 lg:px-10'>
      <div
        className={`${openedTab ? styles.button : styles.disabled} ${
          openedTab === 'go-food' && styles.active
        }`}
        onClick={() => router.push('/history?tab=go-food')}
      >
        go food
      </div>
      <div
        className={`${openedTab ? styles.button : styles.disabled} ${
          openedTab === 'go-ride' && styles.active
        }`}
        onClick={() => router.push('/history?tab=go-ride')}
      >
        go ride
      </div>
    </div>
  )
}

function OpenedComponentTable({ openedTab, goFoodData, goRideData }) {
  return (
    <div className='mx-5 lg:mx-10'>
      {openedTab === 'go-food' ? (
        <GoFoodTable restaurants={goFoodData} />
      ) : openedTab === 'go-ride' ? (
        <GoRideTable orders={goRideData} />
      ) : (
        <div className='flex justify-center'>
          <img
            src='/images/nothing-to-see-here.svg'
            className='w-full sm:w-1/2 h-auto'
          />
        </div>
      )}
    </div>
  )
}

export default function OrderHistory() {
  const [goFood, setGoFood] = useContext(GoFoodContext)
  const [goRide, setGoRide] = useContext(GoRideContext)
  const [openedTab, setOpenedTab] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;-setOpenedTab(
      goFood.length > 0 ? 'go-food' : goRide.length > 0 ? 'go-ride' : null
    )
    setLoading(false)
  }, [])

  return (
    <Fragment>
      <Head>
        <title>YOUR HISTORY - NOT GOJEK</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ContextLayout page={'order history'}>
        <div className='my-8'>
          {openedTab && (
            <SectionButton openedTab={openedTab} setOpenedTab={setOpenedTab} />
          )}
          {!loading ? (
            <OpenedComponentTable
              openedTab={openedTab}
              goFoodData={goFood}
              goRideData={goRide}
            />
          ) : (
            <div className='my-8'>
              <Loading />
            </div>
          )}
        </div>
      </ContextLayout>
    </Fragment>
  )
}
