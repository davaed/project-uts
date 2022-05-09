export default function Layout(props) {
  return (
    <div className='flex flex-col mt-20 sm:mt-10'>
      {!props.skips && (
        <div className='space-x-1 space-y-2 pt-8 px-5 lg:px-8'>
          <h1 className='text-4xl'>
            You are in,{' '}
            <span className='capitalize font-semibold text-[#d4e157]'>
              {props.page}
            </span>{' '}
          </h1>
          {props.description && <p className='text-lg'>{props.description}</p>}
        </div>
      )}
      {props.children}
    </div>
  )
}
