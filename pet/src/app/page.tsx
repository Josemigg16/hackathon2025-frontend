"use client"
import Buttons from "@/components/Buttons"
import PetStats from "@/components/PetStats"
import ShowPet from "@/components/ShowPet"
import { usePetStatsStore } from "@/stores/usePetStatsStore"
import { usePetStore } from "@/stores/usePetStore"
import { offlineCreate } from "@/utils/offlineInteract"
import { useEffect, useState } from "react"
import { useStore } from "zustand"

export default function Home() {
  const isThereAPet = useStore(usePetStore, (state) => state.isThereAPet)
  const setThereIsAPet = useStore(usePetStore, (state) => state.setIsThereAPet)
  const pet = useStore(usePetStatsStore, (state) => state.pet)
  const setPet = useStore(usePetStatsStore, (state) => state.setPet)
  const [loading, setLoading] = useState(true)
  const createPet = async () => {
    if (navigator.onLine) {
      try {
        const res = await fetch("/api/pet/create", {
          headers: {
            "Access-Control-Allow-Origin": "no-cors",
          },
        })
        const data = await res.json()
        setPet(data)
        console.log(data)
        if (setThereIsAPet) {
          setThereIsAPet(true)
        }
      } catch {
        alert("Unavailable to create pet")
      }
    } else {
      setPet(offlineCreate())
      if (setThereIsAPet) {
        setThereIsAPet(true)
      }
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [])
  return !loading ? (
    <main className="pt-12">
      <h1 className="text-5xl text-center font-bold">Eureka</h1>
      {isThereAPet ? (
        <>
          {(pet?.health as number) > 0 ? (
            <>
              <ShowPet />
              <PetStats />
              <Buttons />
            </>
          ) : (
            <div className="flex justify-center">
              <hgroup className="flex flex-col items-center mt-32 text-2xl font-bold text-red-400">
                <h2>{pet?.pet_name}</h2>
                <h2>murio :(</h2>
              </hgroup>
              <button
                onClick={() => {
                  createPet()
                }}
                className="absolute bottom-0 bg-blue-700 px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors mb-10"
              >
                Crear nueva mascota
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => {
              createPet()
            }}
            className="absolute bottom-0 bg-blue-700 px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Crear mascota
          </button>
        </div>
      )}
    </main>
  ) : (
    <div className="flex justify-center pt-32">Loading...</div>
  )
}
