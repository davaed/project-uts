import { useState, useContext } from 'react'

import { GlobalContext as GoFoodContext } from '../../context/goFoodProvider'

import ContextLayout from '../common/Layout.component'
import MenuList from './MenuList.component'
import ConfirmBoxWrapper from '../common/ConfirmBox.component'
import ModalBox from '../common/ModalBox.component'
import MenuModalItems from './MenuModalItems.component'

function MenuContent({ restaurant }) {
  const [goFood, setGoFood] = useContext(GoFoodContext)
  const [confirmChoice, setConfirmChoice] = useState(false)

  function pay() {
    goFood.map((item) => {
      if (item.restaurant === restaurant.name) {
        // filter the menu that the status is still pending and update the status to paid or failed
        item.menus
          .filter((menu) => menu.status === 'pending')
          .forEach((menu) => {
            menu.status = ['paid', 'failed'][Math.floor(Math.random() * 2)]
          })
      }
    })
  }

  function calculateTotalPrice() {
    // calculate the total price of the selected restaurant, only if the menu status is pending
    let totalPrice = 0

    goFood.forEach((item) => {
      if (item.restaurant === restaurant.name) {
        item.menus.forEach((menu) => {
          if (menu.status === 'pending') totalPrice += menu.price
        })
      }
    })

    return totalPrice > 0 ? totalPrice : '-'
  }

  return (
    <ContextLayout
      page={`${restaurant.name} Restaurant`}
      description={`You're looking at the menu at ${restaurant.name} Restaurant`}
    >
      {confirmChoice && (
        <ModalBox
          setConfirmChoice={setConfirmChoice}
          onClickPay={pay}
          totalPrice={calculateTotalPrice()}
        >
          <MenuModalItems restaurant={restaurant.name} selectedMenu={goFood} />
        </ModalBox>
      )}

      <ConfirmBoxWrapper
        isDataEmpty={goFood.length > 0 ? true : false}
        setConfirmChoice={setConfirmChoice}
        helperText={'Please begin by selecting one of our restaurant menu.'}
      />
      <MenuList
        restaurant={restaurant}
        goFoodData={goFood}
        updateGoFoodState={setGoFood}
      />
    </ContextLayout>
  )
}

export default MenuContent
