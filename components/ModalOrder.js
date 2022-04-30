export default function ModalOrder({ selectedCoordinates, setConfirmed }) {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-stone-900 bg-opacity-10 px-5 sm:px-10 lg:px-0 z-[9999]'>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='rounded-md border border-[#eaeaea] bg-white space-y-4 max-h-[75%] overflow-auto'>
          <div className='sticky top-0 flex justify-between border-b border-[#eaeaea] bg-white pb-2 p-4'>
            <h1 className='text-xl font-semibold'>payment</h1>
            <button
              className='bg-rose-200 hover:bg-rose-300 transistion ease-in-out duration-200 rounded-md p-0.5'
              onClick={() => setConfirmed(false)}
            >
              <img src='/close.svg' className='transform scale-[.65]' />
            </button>
          </div>
          {selectedCoordinates.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-1 sm:grid-cols-2 cursor-pointer border border-[#eaeaea] hover:border-[crimson] hover:text-[crimson] rounded-md p-2 px-3 m-4'
            >
              <div className='col-span-1 flex flex-col justify-start'>
                <p>
                  <span className='font-semibold'>From:</span> Your Home
                </p>
                <p className='font-semibold'>Destination:</p>
                <p className="space-x-1">
                  <span>{item.destination.address}</span>
                  <span className='italic'>Street/Place</span>
                </p>
              </div>
              <div className='col-span-1 flex justify-end font-semibold sm:font-normal mt-3 sm:mt-0'>
                Rp. {item.price}
              </div>
            </div>
          ))}

          <div className='flex justify-between font-semibold text-xl m-4'>
            <span>Total:</span>
            <span>
              Rp.{' '}
              {selectedCoordinates.reduce((acc, item) => acc + item.price, 0)}
            </span>
          </div>
          <div className='flex justify-end m-4 pb-8'>
            <button className='text-white bg-[#00d18b] hover:bg-[#00a770] transistion ease-in-out duration-200 rounded-md px-10 py-2'>
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
