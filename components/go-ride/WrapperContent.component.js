import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import ContextLayout from '../common/Layout.component'
import ConfirmBoxWrapper from '../common/ConfirmBox.component'
import ModalBox from '../common/ModalBox.component'
import OrderModalItems from './OrderModalItems.component'

const DynamicGeoMapper = dynamic(() => import('./Map.component'), {
  ssr: false,
})

function MapWrapperContent({
  geoMapApiKey: secretKey,
  temporary,
  goRideData,
  updateGoRideData,
}) {
  const [confirmChoice, setConfirmChoice] = useState(false)

  function pay() {
    goRideData.map((item) => {
      if (item.status === 'pending')
        item.status = ['paid', 'failed'][Math.floor(Math.random() * 2)]
    })
  }

  function calculateTotalPrice() {
    // calculate the total price of the selected restaurant, only if the menu status is pending
    let totalPrice = goRideData.reduce((acc, curr) => {
      if (curr.status === 'pending') acc += curr.price
      return acc
    }, 0)

    return totalPrice > 0 ? totalPrice : '-'
  }

  return (
    <ContextLayout
      page={'go food application'}
      description={`Without a driver's license, you can drive wherever you want and travel wherever you want.`}
    >
      {confirmChoice && (
        <ModalBox
          setConfirmChoice={setConfirmChoice}
          onClickPay={pay}
          totalPrice={calculateTotalPrice()}
        >
          <OrderModalItems goRideData={goRideData} updateGoRideData={updateGoRideData} />
        </ModalBox>
      )}

      <ConfirmBoxWrapper
        isDataEmpty={goRideData.length > 0 ? true : false}
        setConfirmChoice={setConfirmChoice}
        helperText={'Please begin by selecting your destination.'}
      />
      <DynamicGeoMapper
        secretKey={secretKey}
        temporary={temporary}
        goRideData={goRideData}
        updateGoRideData={updateGoRideData}
      />
    </ContextLayout>
  )
}

export default MapWrapperContent
