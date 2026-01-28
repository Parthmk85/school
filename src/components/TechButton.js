"use client"
import { useRobot } from "../context/RobotContext"

export default function TechButton({ children, className = "" }) {
  const { setAction } = useRobot()

  return (
    <button
      onMouseEnter={() => setAction("happy")} // Trigger happy animation
      onMouseLeave={() => setAction("idle")}  // Reset to idle
      onClick={() => setAction("wave")}       // Trigger wave on click
      className={`px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )
}
