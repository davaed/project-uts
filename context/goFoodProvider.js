import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

function Provider({ children }) {
  const [goFood, setGoFood] = useState([])

  return (
    <GlobalContext.Provider value={[goFood, setGoFood]}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Provider
