function Button({ isDataEmpty, helperText, setConfirmChoice }) {
  const style = {
    default:
      'rounded-md border border-[#d6d6d6] transition ease-in-out duration-200 p-2 px-4',
    hovering: 'hover:border-[#00a770] hover:text-[#ffffff] hover:bg-[#00a770]',
    disable: 'cursor-not-allowed',
  }
  return isDataEmpty ? (
    <button
      className={`${style.default} ${style.hovering}`}
      onClick={() => setConfirmChoice(true)}
    >
      Confirm choice
    </button>
  ) : (
    <button className={`${style.disable} ${style.default}`} title={helperText}>
      Confirm choice
    </button>
  )
}

function ConfirmBoxWrapper({ isDataEmpty, setConfirmChoice, helperText }) {
  return (
    <div className='sticky top-[77px] md:top-0 bg-white border-b border-[#d6d6d6] py-4 px-5 lg:px-10 mb-8'>
      <div className='relative flex justify-end'>
        <Button
          isDataEmpty={isDataEmpty}
          helperText={helperText}
          setConfirmChoice={setConfirmChoice}
        />
      </div>
    </div>
  )
}

export default ConfirmBoxWrapper
