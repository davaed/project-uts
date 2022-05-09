import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function NavigationTab({ router, routerList }) {
  return (
    <div className='grid place-items-center'>
      <div className='h-full pt-12'>
        <div className='h-full grid grid-cols-2 gap-8'>
          <NavigationTabList router={router} routerList={routerList} />
        </div>
      </div>
    </div>
  )
}

function NavigationTabList({ router, routerList }) {
  return routerList.map((tab, index) => {
    return (
      <div
        className={`grid place-items-center cursor-pointer ${tab.background} bg-opacity-80 hover:bg-opacity-100 transition ease-in-out duration-200 p-20`}
        key={index}
        onClick={() => router.push(`/${tab.path}`)}
      >
        <img src={`/icons/icon-${tab.icon}.svg`} className='w-20 h-20' />
      </div>
    )
  })
}

function SectionLeftComponent({ activeSession, router, routerList }) {
  return (
    <section
      className={`${activeSession ? 'col-span-2' : 'col-span-1'} h-full`}
    >
      {/* wrapper */}
      <div className='h-section-left sticky top-8'>
        {/* component */}
        <div className='h-section-left flex flex-col justify-between m-8'>
          {/* navigation home */}
          <div className='flex justify-between items-center'>
            <h1
              className='cursor-pointer uppercase text-2xl hover:underline'
              onClick={() => router.push('/')}
            >
              食べたい
            </h1>
          </div>
          {/* navgation tab */}
          <NavigationTab router={router} routerList={routerList} />
          {/* navigation footer */}
          <div className='flex justify-end space-x-8'>
            <div>github</div>
            <div>about</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionLeftComponent
