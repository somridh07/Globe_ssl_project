"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer } from "lucide-react"

export default function TemperatureDisplay({ region, temperature, lat, lng }) {
  const [unit, setUnit] = useState("C") // C for Celsius, F for Fahrenheit

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C")
  }

  const convertTemperature = (temp, targetUnit) => {
    if (targetUnit === "F") {
      return (temp * 9) / 5 + 32
    }
    return temp
  }

  const displayTemp = Math.round(convertTemperature(temperature, unit))

  // Determine temperature color
  const getTemperatureColor = (temp, unit) => {
    const celsius = unit === "C" ? temp : ((temp - 32) * 5) / 9

    if (celsius <= 0) return "text-blue-600"
    if (celsius <= 10) return "text-blue-400"
    if (celsius <= 20) return "text-green-500"
    if (celsius <= 30) return "text-yellow-500"
    return "text-red-500"
  }

  const tempColor = getTemperatureColor(displayTemp, unit)

  return (
    <Card className="absolute bottom-4 right-4 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border-blue-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-blue-500" />
          {region}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span>Temperature:</span>
            <span className={`text-2xl font-bold ${tempColor}`}>
              {displayTemp}°{unit}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Coordinates:</span>
            <span>
              {lat.toFixed(2)}°, {lng.toFixed(2)}°
            </span>
          </div>
          <button
            onClick={toggleUnit}
            className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition-colors"
          >
            Switch to °{unit === "C" ? "F" : "C"}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

