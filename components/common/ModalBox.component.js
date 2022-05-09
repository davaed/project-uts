function ModalButton(props) {
  const style = {
    default: 'rounded-md transistion ease-in-out duration-200',
    color: props.style.color,
    padding: props.style.padding,
  }

  return (
    <button
      className={`${style.default} ${style.color} ${style.padding}`}
      onClick={props.ClickFunction}
    >
      {props.children}
    </button>
  )
}

function ModalTopSection({ setConfirmChoice }) {
  return (
    <div className='sticky top-0 flex justify-between items-center bg-white border-b border-[#eaeaea] pb-2 p-4'>
      <h2 className='font-semibold text-xl'>payment</h2>
      <ModalButton
        style={{ color: 'bg-rose-200 hover:bg-rose-300', padding: 'p-0.5' }}
        ClickFunction={() => setConfirmChoice(false)}
      >
        <img src='/icons/close.svg' className='transform scale-[.65]' />
      </ModalButton>
    </div>
  )
}

function ModalBottomSection({ totalPrice, onClickPay }) {
  return (
    <div className='border-t border-[#eaeaea] space-y-4 mt-4 mx-4 py-4'>
      <div className='flex justify-between font-semibold text-xl'>
        <span>Total:</span>
        <span>Rp. {totalPrice}</span>
      </div>
      <div className='flex justify-end'>
        <ModalButton
          style={{
            color: 'text-white bg-[#00d18b] hover:bg-[#00a770]',
            padding: 'px-10 py-1.5',
          }}
          ClickFunction={onClickPay}
        >
          Pay
        </ModalButton>
      </div>
    </div>
  )
}

function ModalBox(props) {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-zinc-800 bg-opacity-40 z-[2000]'>
      <div className='h-full flex flex-col justify-center items-center mx-5 sm:mx-0'>
        <div className='ban-scrollbar h-1/2 w-full sm:w-3/4 lg:w-2/5 overflow-y-auto flex flex-col justify-between bg-white border border-[#eaeaea] rounded-md'>
          <div className='space-y-4'>
            <ModalTopSection setConfirmChoice={props.setConfirmChoice} />
            {props.children}
          </div>
          <ModalBottomSection
            totalPrice={props.totalPrice}
            onClickPay={props.onClickPay}
          />
        </div>
      </div>
    </div>
  )
}

export default ModalBox
