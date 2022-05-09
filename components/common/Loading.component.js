import { Fragment } from 'react'
import styles from './Loading.module.css'

export default function Loading(props) {
  return (
    <Fragment>
      <div className='flex flex-col justify-center items-center space-y-12 py-32'>
        <div className={styles.rippleLoader}>
          <div></div>
          <div></div>
        </div>
        {props.children}
      </div>
    </Fragment>
  )
}
