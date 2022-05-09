import MultiRef from 'react-multi-ref'

function MenuCard({ props, functions }) {
  return (
    <div
      className={`${functions.isMenuSelectedMenu(
        props.menu
      )} cursor-pointer border border-[#eaeaea] rounded-md transition ease-in-out duration-200 p-4 hover:border-[#0070f3] hover:text-[#0070f3]`}
      ref={props.multiRef.ref(props.index)}
      aria-label={props.index}
      onClick={() => functions.selectMenuByUser(props.index, props.menu)}
    >
      <h2 className='capitalize font-semibold text-xl'>
        {props.menu.name}
      </h2>
      <div className='space-x-1'>
        <span>Rp. {props.menu.price}</span>
        <small>/pcs</small>
      </div>
    </div>
  )
}

function MenuList({ restaurant, goFoodData, updateGoFoodState }) {
  const menuListRef = new MultiRef()

  function updateMenu(index, menuName, menuPrice) {
    updateGoFoodState([
      ...goFoodData,
      {
        restaurant: restaurant.name,
        menus: [{ index, name: menuName, price: menuPrice, status: 'pending' }],
      },
    ])
  }

  function filterMenu(menuIndex) {
    const updated = []

    goFoodData.forEach((item) => {
      const menus = item.menus.filter(({ index }) => {
        return item.restaurant === restaurant.name
          ? index !== menuIndex
          : item.menus
      })

      // if menus in item is empty, remove the item
      if (menus.length === 0) return null

      // if menus in item is not empty, return the item
      updated.push({ ...item, menus })
    })

    updateGoFoodState(updated)
  }

  function appendOrUpdateMenu(menuIndex, menuName, menuPrice) {
    goFoodData.filter((item) => {
      if (item.restaurant === restaurant.name) {
        item.menus.push({
          index: menuIndex,
          name: menuName,
          price: menuPrice,
          status: 'pending',
        })
        updateGoFoodState([...goFoodData])
      } else {
        updateMenu(menuIndex, menuName, menuPrice)
      }
    })
  }

  function selectMenuByUser(index, menu) {
    const { name: menuName, price: menuPrice } = menu

    // handle select menu by user (add menu, remove menu) from goFoodDat
    menuListRef.map.forEach((element) => {
      const containClass = element.classList.contains('active')
      const ariaLabelVal = element.attributes['aria-label'].value

      if (ariaLabelVal !== index.toString()) return

      // remove selected menu, if user click on same menu
      if (goFoodData.length > 0 && containClass) {
        element.classList.toggle('active')
        filterMenu(index)
        return
      }

      // add selected menu, if user click on different menu (if only data is empty)
      if (goFoodData.length === 0 && !containClass) {
        element.classList.toggle('active')
        updateMenu(index, menuName, menuPrice)
        return
      }

      // add selected menu, if user click on different menu (if data is not empty)
      if (goFoodData.length > 0 && !containClass) {
        element.classList.toggle('active')
        appendOrUpdateMenu(index, menuName, menuPrice)
        return
      }
    })
  }

  function isMenuSelectedMenu(menu) {
    // if data is empty, return empty class
    if (typeof goFoodData[goFoodData.length - 1] === null) return ''

    // return style 'active' if user menu is been selected by user
    const setSelected = goFoodData.some((item) => {
      if (item.restaurant === restaurant.name)
        return item.menus.some((ctx) => ctx.name === menu.name)
    })
    return setSelected ? 'active' : ''
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-8 mx-5 lg:mx-10'>
      {restaurant.menus.map((menu, index) => (
        <MenuCard
          key={index}
          props={{ index, menu, multiRef: menuListRef }}
          functions={{ isMenuSelectedMenu, selectMenuByUser }}
        />
      ))}
    </div>
  )
}

export default MenuList
