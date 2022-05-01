export default function ModalMenus({ selectedMenus, setConfirmed }) {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-stone-900 bg-opacity-10 z-[9999]'>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='component rounded-md border border-[#eaeaea] bg-white h-1/2 overflow-y-auto space-y-4'>
          <div className='sticky top-0 flex justify-between border-b border-[#eaeaea] bg-white pb-2 p-4 z-[99]'>
            <h1 className='text-xl font-semibold'>payment</h1>
            <button
              className='bg-rose-200 hover:bg-rose-300 transistion ease-in-out duration-200 rounded-md p-0.5'
              onClick={() => setConfirmed(false)}
            >
              <img src='/icon/close.svg' className='transform scale-[.65]' />
            </button>
          </div>
          {selectedMenus.map((item, index) => (
            <div key={index} className='grid grid-cols-2 px-4'>
              <div className='col-span-1 flex justify-start space-x-2'>
                <span>1</span>
                <span>&#215;</span>
                <span>{item.name}</span>
              </div>
              <div className='col-span-1 flex justify-end'>{item.price}$</div>
            </div>
          ))}
          <div className='flex justify-between font-semibold text-xl border-t border-[#d6d6d6] mx-4 pt-4'>
            <span>Total:</span>
            <span>
              {selectedMenus.reduce((acc, item) => acc + item.price, 0)}${' '}
            </span>
          </div>
          <div className='flex justify-end px-4 pb-4'>
            <button className='text-white bg-[#00d18b] hover:bg-[#00a770] transistion ease-in-out duration-200 rounded-md px-8 py-1'>
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
