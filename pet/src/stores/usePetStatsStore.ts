import { feed, petting, play, rest, scold, train } from "@/utils/fetchInteracts"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface IPet {
  pet_name: string
  health: number
  hunger: number
  mood: number
  physical: number
}

interface Rest {
  msj: string
  resting: number
}

type PetStoreState = {
  pet: IPet | null
}

type PetStoreActions = {
  play: () => Promise<string>
  feed: (food_value: "bg" | "md" | "sm") => Promise<string>
  train: (train_tier: "lw" | "md" | "st") => Promise<string>
  petting: () => Promise<string>
  scold: () => Promise<string>
  rest: () => Promise<Rest>
  setPet: (pet: IPet) => void
  updatePet: (updates: Partial<IPet>) => void
  resetPet: () => void
}

type PetStore = PetStoreState & PetStoreActions

export const usePetStatsStore = create<PetStore>()(
  persist(
    (set, get) => ({
      pet: null, // Estado inicial sin mascota
      play: async () => {
        const pet = get().pet
        const result = await play(pet as IPet)
        const { hunger_mod, mood_mod, physical_mod } = result.result
        set((state) => ({
          pet: state.pet
            ? {
                ...state.pet,
                hunger:
                  state.pet.hunger + hunger_mod > 0
                    ? state.pet.hunger + hunger_mod
                    : 0,
                mood:
                  state.pet.mood + mood_mod < 100
                    ? state.pet.mood + mood_mod
                    : 100,
                physical: state.pet.physical + physical_mod,
              }
            : null,
        }))
        return result.result.msj
      },
      feed: async (food_value) => {
        const pet = get().pet
        const result = await feed(pet as IPet, food_value)
        const { hunger_mod, mood_mod } = result.result
        set((state) => ({
          pet: state.pet
            ? {
                ...state.pet,
                hunger:
                  state.pet.hunger + hunger_mod < 100
                    ? state.pet.hunger + hunger_mod
                    : 100,
                mood:
                  state.pet.mood + mood_mod < 100
                    ? state.pet.mood + mood_mod
                    : 100,
              }
            : null,
        }))
        return result.result.msj
      },
      train: async (train_tier) => {
        const pet = get().pet
        const result = await train(pet as IPet, train_tier)
        const { hunger_mod, mood_mod, physical_mod } = result.result
        set((state) => ({
          pet: state.pet
            ? {
                ...state.pet,
                hunger:
                  state.pet.hunger + hunger_mod > 0
                    ? state.pet.hunger + hunger_mod
                    : 0,
                mood:
                  state.pet.mood + mood_mod < 100
                    ? state.pet.mood + mood_mod
                    : 100,
                physical: state.pet.physical + physical_mod,
              }
            : null,
        }))
        return result.result.msj
      },
      petting: async () => {
        const pet = get().pet
        const result = await petting(pet as IPet)
        const { mood_mod } = result.result
        set((state) => ({
          pet: state.pet
            ? {
                ...state.pet,
                mood:
                  state.pet.mood + mood_mod < 100
                    ? state.pet.mood + mood_mod
                    : 100,
              }
            : null,
        }))
        return result.result.msj
      },
      scold: async () => {
        const pet = get().pet
        const result = await scold(pet as IPet)
        const { mood_mod } = result.result
        set((state) => ({
          pet: state.pet
            ? {
                ...state.pet,
                mood:
                  state.pet.mood + mood_mod > 0 ? state.pet.mood + mood_mod : 0,
              }
            : null,
        }))
        return result.result.msj
      },
      rest: async () => {
        const pet = get().pet
        const result = await rest(pet as IPet)
        console.log(result)
        const { mood_mod } = result
        set((state) => ({
          pet: state.pet
            ? {
                ...state.pet,
                mood:
                  state.pet.mood + mood_mod < 100
                    ? state.pet.mood + mood_mod
                    : 100,
              }
            : null,
        }))
        return {
          msj: result.msj,
          resting: result.rest_time,
        }
      },
      setPet: (pet: IPet) => set({ pet }), // Guarda el objeto completo de la mascota
      updatePet: (updates: Partial<IPet>) =>
        set((state) => ({
          pet: state.pet ? { ...state.pet, ...updates } : null, // Actualiza solo las propiedades enviadas
        })),
      resetPet: () => set({ pet: null }), // Restablece la mascota a null
    }),
    {
      name: "pet-stats-store", // Nombre único para el persist
    }
  )
)
