"use client"
import { IPet, usePetStatsStore } from "@/stores/usePetStatsStore"
import React, { useEffect, useState } from "react"
import { useStore } from "zustand"
import "@/styles/stats.css"
import { usePetStore } from "@/stores/usePetStore"

export default function PetStats() {
  const pet = useStore(usePetStatsStore, (state) => state.pet) as IPet
  const updatePet = useStore(usePetStatsStore, (state) => state.updatePet)
  const decreaseFeed = () => {
    if (pet?.hunger <= 0) return
    updatePet({
      hunger: pet?.hunger - 1,
    })
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (pet.hunger <= 0) {
        if (pet.health > 0)
          updatePet({
            health: pet.health - 1,
          })
      }
      decreaseFeed()
    }, 60000)
    return () => clearInterval(interval)
  }, [pet.hunger, pet.health])
  return (
    <div className="pt-8 flex flex-col items-center">
      <div className="flex gap-2">
        <h3>Health</h3>
        <span>{pet?.health}</span>
      </div>
      <div className="flex gap-2">
        <h3>Hunger</h3>
        <span>{pet.hunger}</span>
      </div>
      <div className="flex gap-2">
        <h3>Mood</h3>
        <span>{pet?.mood}</span>
      </div>
      <div className="flex gap-2">
        <h3>Physical</h3>
        <span>{pet?.physical}</span>
      </div>
    </div>
  )
}
