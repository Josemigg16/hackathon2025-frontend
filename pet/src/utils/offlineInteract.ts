import { IPet } from "@/stores/usePetStatsStore"

export const offlineCreate = ():IPet => {
  return {
    pet_name: "Offline Pet",
    health: 5,
    mood: 45,
    hunger: 60,
    physical: 40,
  }
}

export const offlineFeed = () => {

}