import React, { createContext, useState } from 'react'

// you can set a default value inside createContext if you want
export const GlobalContext = createContext()

export default function HistoryProvider({ children }) {
  const [goRide, setGoRide] = useState([])
  const [goFood, setGoFood] = useState([])

  return (
    <GlobalContext.Provider value={[goFood, setGoFood, goRide, setGoRide]}>
      {children}
    </GlobalContext.Provider>
  )
}
