import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

function Provider({ children }) {
  const [globalLocation, setGlobalLocation] = useState([])

  return (
    <GlobalContext.Provider value={[globalLocation, setGlobalLocation]}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Provider
