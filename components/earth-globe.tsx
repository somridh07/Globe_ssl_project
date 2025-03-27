"use client"

import { useState, useRef, useEffect } from "react"
import TemperatureDisplay from "./temperature-display"

// Mock temperature data for different regions
const temperatureData = {
  "North America": { temp: 15, lat: 40, lng: -100 },
  "South America": { temp: 25, lat: -20, lng: -60 },
  Europe: { temp: 10, lat: 50, lng: 10 },
  Africa: { temp: 30, lat: 0, lng: 20 },
  Asia: { temp: 20, lat: 40, lng: 100 },
  Australia: { temp: 28, lat: -25, lng: 135 },
  Antarctica: { temp: -30, lat: -90, lng: 0 },
}

// Map coordinates to position on the globe
const regions = [
  { id: "north-america", name: "North America", x: 25, y: 30, temp: 15 },
  { id: "south-america", name: "South America", x: 30, y: 65, temp: 25 },
  { id: "europe", name: "Europe", x: 48, y: 30, temp: 10 },
  { id: "africa", name: "Africa", x: 50, y: 50, temp: 30 },
  { id: "asia", name: "Asia", x: 65, y: 35, temp: 20 },
  { id: "australia", name: "Australia", x: 75, y: 65, temp: 28 },
  { id: "antarctica", name: "Antarctica", x: 50, y: 85, temp: -30 },
]

export default function EarthGlobe() {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef(null)

  // Auto-rotation effect
  useEffect(() => {
    let animationId

    const autoRotate = () => {
      if (!isDragging) {
        setRotation((prev) => (prev + 0.1) % 360)
      }
      animationId = requestAnimationFrame(autoRotate)
    }

    animationId = requestAnimationFrame(autoRotate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isDragging])

  // Mouse event handlers for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startX
      setRotation((prev) => (prev + deltaX * 0.5) % 360)
      setStartX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (isDragging) {
      const deltaX = e.touches[0].clientX - startX
      setRotation((prev) => (prev + deltaX * 0.5) % 360)
      setStartX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Handle region selection
  const handleRegionClick = (region) => {
    const regionData = temperatureData[region.name]
    setSelectedRegion({
      region: region.name,
      temperature: region.temp,
      lat: regionData.lat,
      lng: regionData.lng,
    })
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Earth image with rotation */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden bg-blue-300 shadow-lg"
          style={{
            backgroundImage: "url('/earth-map-2d.jpg')",
            backgroundSize: "cover",
            backgroundPosition: `${rotation}% center`,
            transition: isDragging ? "none" : "background-position 0.1s ease-out",
          }}
        >
          {/* Clickable regions */}
          {regions.map((region) => {
            // Adjust position based on rotation
            const adjustedX = (region.x + rotation / 3.6) % 100

            // Only show regions that are "visible" on the current rotation
            const isVisible = adjustedX > 0 && adjustedX < 100

            if (!isVisible) return null

            return (
              <button
                key={region.id}
                className="absolute w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                style={{
                  left: `${adjustedX}%`,
                  top: `${region.y}%`,
                  opacity: adjustedX > 20 && adjustedX < 80 ? 1 : 0.5,
                  zIndex: Math.floor(adjustedX > 50 ? 100 - adjustedX : adjustedX),
                }}
                onClick={() => handleRegionClick(region)}
                aria-label={`Show temperature for ${region.name}`}
              />
            )
          })}
        </div>
      </div>

      {selectedRegion && (
        <TemperatureDisplay
          region={selectedRegion.region}
          temperature={selectedRegion.temperature}
          lat={selectedRegion.lat}
          lng={selectedRegion.lng}
        />
      )}
    </div>
  )
}

