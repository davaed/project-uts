function MenuModalItems({
  restaurant: restaurantName,
  selectedMenu: selectedRestaurant,
}) {
  // filter the selected menu by the restaurant name, and get only if the menu status is pending
  const selectedMenus = selectedRestaurant.filter(
    (item) => item.restaurant === restaurantName
  )[0].menus.filter((menu) => menu.status === 'pending')

  return selectedMenus.map((item) => (
    <div className='grid grid-cols-3 gap-8 mx-4' key={item.index}>
      <div className='col-span-2 flex justify-start break-all'>
        <span>1 &#215; {item.name}</span>
      </div>
      <div className='col-span-1 flex justify-end'>
        <span>Rp. {item.price}</span>
      </div>
    </div>
  ))
}

export default MenuModalItems
