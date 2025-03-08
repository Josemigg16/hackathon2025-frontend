import { create } from "zustand"
import { persist } from "zustand/middleware"

type MessageState = { message: string }

type MessageActions = {
  setMessage: (value: string) => void
}

type MessageStore = MessageState & MessageActions

// the store itself does not need any change
export const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      message: "Do an activity with your pet!",
      setMessage: (value: string) => set({ message: value }),
    }),
    {
      name: "message-store", // unique name
    }
  )
)
