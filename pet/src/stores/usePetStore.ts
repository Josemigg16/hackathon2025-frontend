// useBearStore.ts

import { create } from "zustand"
import { persist } from "zustand/middleware"

type PetStoreState = {
  isThereAPet: boolean
  resting: number
  isOnline: boolean
  sincronizando: boolean
}

type PetStoreActions = {
  setIsThereAPet: (value: boolean) => void
  setResting: (value: number) => void
  setIsOnline: (value: boolean) => void
  setIsSincronizando: (value: boolean) => void
}

type PositionStore = PetStoreState & PetStoreActions

// the store itself does not need any change
export const usePetStore = create<PositionStore>()(
  persist(
    (set, get) => ({
      isThereAPet: false,
      resting: 0,
      isOnline: navigator.onLine,
      sincronizando: false,
      setIsThereAPet: (value: boolean) => set({ isThereAPet: value }),
      setResting: (value: number) => set({ resting: value }),
      setIsOnline: (value: boolean) => set({ isOnline: value }),
      setIsSincronizando: (value: boolean) => set({ sincronizando: value }),
    }),
    {
      name: "pet-store", // unique name
    }
  )
)
