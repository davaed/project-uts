import { useState, useEffect } from 'react'
import useWindowDimensions from '../../hooks/useWindowDimension'

import SectionBlockMenu from './SectionBlock.component'
import SectionHiddenMenu from './SectionHidden.component'

function SectionLeftComponent({ activeSession, router, routerList }) {
  const { width } = useWindowDimensions()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(width ? false : true)
  }, [width])

  return !loading && width > 640 ? (
    <SectionBlockMenu
      activeSession={activeSession}
      router={router}
      routerList={routerList}
    />
  ) : (
    <SectionHiddenMenu
      activeSession={activeSession}
      router={router}
      routerList={routerList}
    />
  )
}

export default SectionLeftComponent
