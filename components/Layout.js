import { Fragment } from 'react'

export default function Layout(props) {
  return (
    <Fragment>
      <main className='grid grid-cols-5 gap-12 mt-32 mx-72'>
        <div className='col-span-3 space-y-6 text-5xl leading-tight'>
          <span>Welcome to </span>
          <span className='capitalize font-semibold text-[#00a770]'>
            {props.page}
          </span>
          {!props.skips && <span>! but not the real one.</span>}
          <p className='text-xl'>
            <span>{props.description}</span>
          </p>
        </div>
        <div className='col-span-2'></div>
        <div className='col-span-5'>{props.children}</div>
      </main>
    </Fragment>
  )
}
