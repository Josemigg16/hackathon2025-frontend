import { IPet } from "@/stores/usePetStatsStore"

export const play = async (pet: IPet) => {
  try {
    const res = await fetch("/api/pet/play", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pet.pet_name,
        play_with: "ball",
        mood: pet.mood,
        hunger: pet.hunger,
      }),
    })
    const data = await res.json()
    return data
  } catch {
    alert("No se pudo completar la acción de jugar")
  }
}

export const feed = async (pet: IPet, food_value: "bg" | "md" | "sm") => {
  try {
    const res = await fetch("/api/pet/feed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pet.pet_name,
        food_value: food_value,
        mood: pet.mood,
      }),
    })
    const data = await res.json()
    return data
  } catch {
    alert("No se pudo completar la acción de alimentar")
  }
}

export const train = async (pet: IPet, train_tier: "lw" | "md" | "st") => {
  try {
    const res = await fetch("/api/pet/train", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pet.pet_name,
        mood: pet.mood,
        hunger: pet.hunger,
        train_tier,
      }),
    })
    const data = await res.json()
    return data
  } catch {
    alert("No se pudo completar la acción de entrenar")
  }
}

export const petting = async (pet: IPet) => {
  try {
    const res = await fetch("/api/pet/pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pet.pet_name,
        mood: pet.mood,
      }),
    })
    const data = await res.json()
    return data
  } catch {
    alert("No se pudo completar la acción de acariciar")
  }
}

export const scold = async (pet: IPet) => {
  try {
    const res = await fetch("/api/pet/scold", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pet.pet_name,
        mood: pet.mood,
      }),
    })
    const data = await res.json()
    return data
  } catch {
    alert("No se pudo completar la acción de regañar")
  }
}

export const rest = async (pet: IPet) => {
  try {
    const res = await fetch("/api/pet/rest")
    const data = await res.json()
    return data
  } catch {
    alert("No se pudo completar la acción de descansar")
  }
}
