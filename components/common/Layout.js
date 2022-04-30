import { Fragment } from 'react'

export default function Layout(props) {
  return (
    <Fragment>
      <main className='grid grid-cols-5 gap-12 mt-16 md:mt-32 mx-5 sm:mx-10 lg:mx-20 xl:mx-40 2xl:mx-72'>
        <div className='col-span-5 md:col-span-4 2xl:col-span-3 space-y-3 md:space-y-6 text-4xl md:text-5xl leading-tight'>
          <span>Welcome to </span>
          <span className='capitalize font-semibold text-[#00a770]'>
            {props.page}
          </span>
          {!props.skips && <span>! but not the real one.</span>}
          <p className='text-lg md:text-xl'>
            <span>{props.description}</span>
          </p>
        </div>
        <div className='hidden md:col-span-1 2xl:col-span-2'></div>
        <div className='col-span-5'>{props.children}</div>
      </main>
    </Fragment>
  )
}
