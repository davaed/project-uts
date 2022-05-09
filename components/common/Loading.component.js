import { Fragment } from 'react'
import styles from './Loading.module.css'

export default function Loading(props) {
  return (
    <Fragment>
      <div className='h-full grid place-items-center'>
        <div className='flex flex-col justify-center items-center space-y-12'>
          <div className={styles.rippleLoader}>
            <div></div>
            <div></div>
          </div>
          {props.children}
        </div>
      </div>
    </Fragment>
  )
}
