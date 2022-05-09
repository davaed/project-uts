import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

function Provider({ children }) {
  const [goRide, setGoRide] = useState([])

  return (
    <GlobalContext.Provider value={[goRide, setGoRide]}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Provider
