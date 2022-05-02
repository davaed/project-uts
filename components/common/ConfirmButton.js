export default function ConfirmButton({ itemsLength, setIsConfirmed, title }) {
  return (
    <div className='sticky top-[81px] md:top-0 bg-white border-b border-[#d6d6d6] mb-4 py-4 px-5 lg:px-10'>
      <div className='relative flex justify-end'>
        {itemsLength > 0 ? (
          <button
            className='rounded-md border border-[#d6d6d6] transition ease-in-out duration-200 hover:border-[#00a770] hover:text-[#ffffff] hover:bg-[#00a770] p-2 px-4'
            onClick={() => setIsConfirmed(true)}
          >
            Confirm choice
          </button>
        ) : (
          <button
            className='cursor-not-allowed rounded-md border border-[#d6d6d6] transition ease-in-out duration-200 p-2 px-4'
            title={title}
          >
            Confirm choice
          </button>
        )}
      </div>
    </div>
  )
}
