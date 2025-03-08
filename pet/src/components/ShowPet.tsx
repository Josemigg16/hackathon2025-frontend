"use client"
import Pet from "./Pet"

import { useStore } from "zustand"
import { usePetStatsStore } from "@/stores/usePetStatsStore"
import { useMessageStore } from "@/stores/messageStore"

export default function ShowPet() {
  const pet = useStore(usePetStatsStore, (state) => state.pet)
  const message = useStore(useMessageStore, (state) => state.message)
  return (
    <div className="relative min-h-[300px]">
      <h2 className="text-xl w-fit mx-auto mt-6 bg-blue-200 px-3 py-2 rounded text-black">
        {message}
      </h2>
      <div className="">
        <Pet initX={1} initY={3} />
        <h2 className="text-2xl pt-24 text-center">{pet?.pet_name}</h2>
      </div>
    </div>
  )
}
