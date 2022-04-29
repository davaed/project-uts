import { Fragment } from 'react'

export default function Modal({ selectedMenus, setConfirmed }) {
  function closeModal() {
    setConfirmed(false)
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-stone-900 bg-opacity-10'>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='rounded-md border border-[#eaeaea] bg-white space-y-4 p-4'>
          <div className='flex justify-between border-b border-[#eaeaea] pb-2'>
            <h1 className='text-xl font-semibold'>payment</h1>
            <button
              className='bg-rose-200 hover:bg-rose-300 transistion ease-in-out duration-200 rounded-md p-0.5'
              onClick={closeModal}
            >
              <img src='/close.svg' className='transform scale-[.65]' />
            </button>
          </div>
          {selectedMenus.map((item, index) => (
            <div key={index} className='grid grid-cols-2'>
              <div className='col-span-1 flex justify-start space-x-2'>
                <span>1</span>
                <span>&#215;</span>
                <span>{item.name}</span>
              </div>
              <div className='col-span-1 flex justify-end'>{item.price}$</div>
            </div>
          ))}
          <div className='flex justify-between font-semibold'>
            <span >Total:</span>
            <span>
              {selectedMenus.reduce((acc, item) => acc + item.price, 0)}${' '}
            </span>
          </div>
          <div className='flex justify-end'>
              <button className='text-white bg-[#00d18b] hover:bg-[#00a770] transistion ease-in-out duration-200 rounded-md px-8 py-1'>Pay</button>
          </div>
        </div>
      </div>
    </div>
  )
}
