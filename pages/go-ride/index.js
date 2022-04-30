import Head from 'next/head'
import dynamic from 'next/dynamic'

import { Fragment, useState } from 'react'

import Layout from '../../components/common/Layout'
import ModalOrder from '../../components/ModalOrder'

const DynamicMapComponent = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

export default function GoRide(props) {
  const [confirmed, setConfirmed] = useState(false)
  const [listCoordinates, setListCoordinates] = useState([])
  const [coordinates, setCoordinates] = useState({
    pickUpPoint: { lat: 0, lng: 0, updated: false, address: '' },
    destination: { lat: 0, lng: 0, updated: false, address: '' },
    price: 0,
  })

  return (
    <Fragment>
      <Head>
        <title>GoRide - GoWhatever</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout
        skips={false}
        page={'go ride'}
        description={
          "Without a driver's license, you can drive wherever you want and travel wherever you want."
        }
      >
        {confirmed && (
          <ModalOrder
            selectedCoordinates={listCoordinates}
            setConfirmed={setConfirmed}
          />
        )}

        {listCoordinates.length >= 1 && (
          <div className='flex justify-end'>
            <button
              className='cursor-pointer rounded-md border border-[#eaeaea] hover:border-[#00a770] hover:text-[#ffffff] hover:bg-[#00a770] transition ease-in-out duration-200 px-5 py-2 sm:px-6 sm:py-2.5'
              onClick={() => setConfirmed(true)}
            >
              Order Go-Ride
            </button>
          </div>
        )}
        <DynamicMapComponent
          APIKEY={props.APIKEY}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          listCoordinates={listCoordinates}
          setListCoordinates={setListCoordinates}
        />
      </Layout>
    </Fragment>
  )
}

export function getStaticProps() {
  return {
    props: {
      APIKEY: process.env.MAPQUESTAPI,
    },
  }
}
