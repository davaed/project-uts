import { useRouter } from 'next/router'

import ContextLayout from '../common/Layout.component'

function RestaurantCard({ router, restaurantName, restaurantMenusLength }) {
  return (
    <div
      className='cursor-pointer rounded-md border border-[#eaeaea] hover:border-[#0070f3] hover:text-[#0070f3] transition ease-in-out duration-200 p-4'
      onClick={() => router.push(`/go-food/${restaurantName}`)}
    >
      <h2 className='capitalize font-semibold text-xl'>
        {restaurantName} Restaurant
      </h2>
      <small>{restaurantMenusLength} menus in total</small>
    </div>
  )
}

function RestaurantContent({ restaurantList }) {
  const router = useRouter()
  return (
    <ContextLayout
      page={'go food application'}
      description={
        'You may get the greatest deal on food by purchasing it from our fictitious restaurant list below! '
      }
    >
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 py-8 md:pb-0 mx-5 lg:mx-10'>
        {restaurantList.map((item) => (
          <RestaurantCard
            key={item.id}
            router={router}
            restaurantName={item.name}
            restaurantMenusLength={item.menus}
          />
        ))}
      </div>
    </ContextLayout>
  )
}

export default RestaurantContent
