export default function ModalContent(props) {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-zinc-800 bg-opacity-40 z-[1999]'>
      <div className='h-full flex flex-col justify-center items-center mx-5 sm:mx-0'>
        <div className='ban-scrollbar h-1/2 w-full sm:w-3/4 lg:w-2/5 overflow-y-auto flex flex-col justify-between bg-white border border-[#eaeaea] rounded-md'>
          <div className='space-y-4'>
            <div className='sticky top-0 flex justify-between items-center bg-white border-b border-[#eaeaea] pb-2 p-4'>
              <h1 className='text-xl font-semibold'>payment</h1>
              <button
                className='transistion ease-in-out duration-200 bg-rose-200 hover:bg-rose-300 rounded-md p-0.5'
                onClick={() => props.setIsConfirmed(false)}
              >
                <img src='/icons/close.svg' className='transform scale-[.65]' />
              </button>
            </div>
            {props.children}
          </div>
          <div className='border-t border-[#eaeaea] space-y-4 mt-4 mx-4 py-4'>
            <div className='flex justify-between font-semibold text-xl'>
              <span>Total:</span>
              <span>Rp. {props.totalPrice}</span>
            </div>
            <div className='flex justify-end'>
              <button
                className='text-white bg-[#00d18b] rounded-md transistion ease-in-out duration-200 hover:bg-[#00a770] px-10 py-1.5'
                onClick={props.onClickPay}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
