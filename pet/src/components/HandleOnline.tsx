"use client"
import { useMessageStore } from "@/stores/messageStore"
import { useActionsQueueStore } from "@/stores/offlineQueue"
import { usePetStatsStore } from "@/stores/usePetStatsStore"
import { usePetStore } from "@/stores/usePetStore"
import { useEffect, useState } from "react"
import { useStore } from "zustand"

export default function HandleOnline() {
  const isOnline = useStore(usePetStore, (state) => state.isOnline)
  const setIsOnline = useStore(usePetStore, (state) => state.setIsOnline)
  const setMessage = useStore(useMessageStore, (state) => state.setMessage)
  const setResting = useStore(usePetStore, (state) => state.setResting)
  const setSincronizando = useStore(
    usePetStore,
    (state) => state.setIsSincronizando
  )

  const feed = useStore(usePetStatsStore, (state) => state.feed)
  const petting = useStore(usePetStatsStore, (state) => state.petting)
  const scold = useStore(usePetStatsStore, (state) => state.scold)
  const rest = useStore(usePetStatsStore, (state) => state.rest)

  const actionsQueue = useStore(
    useActionsQueueStore,
    (state) => state.offlineQueue
  )
  const clearQueue = useStore(
    useActionsQueueStore,
    (state) => state.resetOfflineQueue
  )

  useEffect(() => {
    window.addEventListener("online", () => setIsOnline(true))
    window.addEventListener("offline", () => setIsOnline(false))
  }, [])
  useEffect(() => {
    if (isOnline) {
      setSincronizando(true)
      actionsQueue.map((action) => {
        setTimeout(() => {
          action.type === "feed" &&
            feed(action.payload).then((msj) => setMessage(msj))
          action.type === "petting" && petting().then((msj) => setMessage(msj))
          action.type === "scold" && scold().then((msj) => setMessage(msj))
          action.type === "rest" &&
            rest().then((restObj) => {
              setMessage(restObj.msj)
              setResting(Math.floor(restObj.resting * 60))
            })
        }, 1000)
      })
      clearQueue()
      setSincronizando(false)
    }
    console.log("isOnline", isOnline)
  }, [isOnline])
  return (
    <h3 className="text-center mb-20">
      Modo:{" "}
      {isOnline ? (
        <span className="text-green-400">Online</span>
      ) : (
        <span className="text-red-400"> Offline</span>
      )}
    </h3>
  )
}
