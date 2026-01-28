"use client"
import { createContext, useContext, useState } from "react"

const RobotContext = createContext()

export function RobotProvider({ children }) {
  const [action, setAction] = useState("idle")

  return (
    <RobotContext.Provider value={{ action, setAction }}>
      {children}
    </RobotContext.Provider>
  )
}

export const useRobot = () => useContext(RobotContext)
