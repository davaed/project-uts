import { useRef } from 'react'

function NavigationTabList({ router, routerList, showHiddenMenus }) {
  function redirect(path) {
    showHiddenMenus()
    router.push(`/${path}`)
  }

  return routerList.map((tab, index) => {
    return (
      <div
        className={`h-32 grid place-items-center cursor-pointer ${tab.background} bg-opacity-80 hover:bg-opacity-100 transition ease-in-out duration-200 p-5`}
        key={index}
        onClick={() => redirect(tab.path)}
      >
        <img src={`/icons/icon-${tab.icon}.svg`} className='w-16 h-16' />
      </div>
    )
  })
}

function SectionHiddenMenu({ router, routerList }) {
  const navigation = useRef(null)

  function showHiddenMenus() {
    navigation.current.classList.toggle('hidden')
  }

  return (
    <section className='relative h-auto z-[4000]'>
      <div className='fixed w-full flex justify-between items-center bg-white border-b p-5'>
        <h1
          className='cursor-pointer uppercase text-2xl hover:underline'
          onClick={() => router.push('/')}
        >
          食べたい
        </h1>
        <div className='cursor-pointer p-1.5' onClick={showHiddenMenus}>
          <img src='/icons/menu.svg' />
        </div>
      </div>
      <div
        className='hidden fixed top-[64px] h-screen w-full bg-white'
        ref={navigation}
      >
        <div className='space-y-4 py-12 mx-12'>
          <NavigationTabList
            router={router}
            routerList={routerList}
            showHiddenMenus={showHiddenMenus}
          />
        </div>
      </div>
    </section>
  )
}

export default SectionHiddenMenu
