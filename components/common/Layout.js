import { Fragment } from 'react'

export default function Layout(props) {
  return (
    <Fragment>
      <div className='flex flex-col'>
        <div className='space-x-1 space-y-2 py-12'>
          <h1 className='text-4xl'>
            You are in,{' '}
            <span className='capitalize font-semibold text-[#00a770]'>
              {props.page}
            </span>{' '}
          </h1>
          <p className='text-lg'>{props.description}</p>
        </div>
        {props.children}
      </div>
    </Fragment>
  )
}
