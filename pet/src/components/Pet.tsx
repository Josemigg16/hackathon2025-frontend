"use client"
import { useEffect } from "react"
import "@/animations/animations.css"
import { useStore } from "zustand"
import { usePetStatsStore } from "@/stores/usePetStatsStore"

interface PetProps {
  initX: number
  initY: number
}

const SPRITE_SIZE = 24 // Tamaño de cada frame en píxeles

export default function Pet({ initX, initY }: PetProps) {
  const x = initX * SPRITE_SIZE - SPRITE_SIZE
  const y = initY * SPRITE_SIZE - SPRITE_SIZE
  

  return (
    <div className="flex justify-center pt-32">
      <div
        className="init scale-[10]"
        style={{
          width: SPRITE_SIZE,
          height: SPRITE_SIZE,
          background: `url('/sprites/slime_monster_spritesheet.png') -${x}px -${y}px`,
          imageRendering: "pixelated", // Opcional para sprites retro
        }}
      />
    </div>
  )
}
