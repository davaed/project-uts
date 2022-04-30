import { Fragment } from 'react'
import styles from './Loading.module.css'

export default function Loading() {
  return (
    <Fragment>
      <div className='flex justify-center items-center py-32'>
        <div className={styles.rippleLoader}>
          <div></div>
          <div></div>
        </div>
      </div>
    </Fragment>
  )
}
