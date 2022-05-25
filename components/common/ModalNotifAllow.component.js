function ModalNotificationAllow(props) {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-zinc-800 bg-opacity-40 z-[5000]'>
      <div className='h-full flex flex-col justify-center items-center mx-5 sm:mx-0'>
        <div className='h-auto w-full sm:w-1/3 overflow-y-auto bg-white rounded space-y-12 p-6'>
          <div className='flex flex-col justify-start text-lg'>
            <p className="font-satoshi">
              You need to allow the browser to access your location to use any
              of the features. Please click the button below to allow the
              browser to access your location. We will not use your location for
              any other purpose.
            </p>
            <span className="sm:text-sm lg:text-lg xl:text-xl 2xl:text-2xl">Notes : on some devices the location is not very accurate</span>
          </div>
          <div className='flex justify-end space-x-4'>
            <button
              onClick={() => props.allowAccessLocation(false)}
              className='rounded border hover:border-[#ef5350] hover:bg-box-rose hover:text-white transition ease-in-out duration-200 px-6 py-2'
            >
              Deny
            </button>
            <button
              onClick={() => props.allowAccessLocation(true)}
              className='rounded bg-opacity-80 bg-box-lime hover:bg-opacity-100 text-white transition ease-in-out duration-200 px-6 py-2'
            >
              Allow
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalNotificationAllow
