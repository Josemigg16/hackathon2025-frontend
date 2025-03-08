import { create } from "zustand"
import { persist } from "zustand/middleware"

interface QueuedAction {
  type: "feed" | "petting" | "scold" | "rest"
  payload: any
}

type PetStoreState = { offlineQueue: QueuedAction[] }

type PetStoreActions = {
  resetOfflineQueue: () => void
  addQueuedAction: (value: QueuedAction) => void
}

type ActionsQueueStore = PetStoreState & PetStoreActions

// the store itself does not need any change
export const useActionsQueueStore = create<ActionsQueueStore>()(
  persist(
    (set, get) => ({
      offlineQueue: [],
      resetOfflineQueue: () => set({ offlineQueue: [] }),
      addQueuedAction: (action: QueuedAction) =>
        set((state) => ({
          offlineQueue: [...state.offlineQueue, action],
        })),
    }),
    {
      name: "offline-queue", // unique name
    }
  )
)
