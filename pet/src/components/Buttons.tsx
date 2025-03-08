"use client"
import React, { useEffect, useRef } from "react"
import { useStore } from "zustand"
import { IPet, usePetStatsStore } from "@/stores/usePetStatsStore"
import { useMessageStore } from "@/stores/messageStore"
import { usePetStore } from "@/stores/usePetStore"
import { useActionsQueueStore } from "@/stores/offlineQueue"

export default function Buttons() {
  const setMessage = useStore(useMessageStore, (state) => state.setMessage)
  const play = useStore(usePetStatsStore, (state) => state.play)
  const feed = useStore(usePetStatsStore, (state) => state.feed)
  const train = useStore(usePetStatsStore, (state) => state.train)
  const petting = useStore(usePetStatsStore, (state) => state.petting)
  const scold = useStore(usePetStatsStore, (state) => state.scold)
  const rest = useStore(usePetStatsStore, (state) => state.rest)

  const feedOptions = useRef<HTMLDivElement>(null)
  const trainOptions = useRef<HTMLDivElement>(null)

  const resting = useStore(usePetStore, (state) => state.resting)
  const setResting = useStore(usePetStore, (state) => state.setResting)

  const isOnline = useStore(usePetStore, (state) => state.isOnline)

  const sincronizando = useStore(usePetStore, (state) => state.sincronizando)

  const addQueuedAction = useStore(
    useActionsQueueStore,
    (state) => state.addQueuedAction
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (resting > 0) setResting(resting - 1)
    }, 1000)
    return () => clearInterval(interval)
  })

  return !sincronizando ? (
    <>
      <div className="w-[300px] [&>button,div]:w-[140px] max-w-[97vw] mx-auto flex flex-wrap gap-4 pt-10">
        <button
          onClick={() => play().then((msj) => setMessage(msj))}
          disabled={resting > 0 || !isOnline}
          className="bg-blue-700 disabled:bg-blue-300 px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Play
        </button>
        <div>
          <div
            className="hidden absolute -translate-y-[100%] w-full"
            ref={feedOptions}
          >
            <button
              className="rounded mr-4 cursor-pointer hover:opacity-95"
              style={{
                background: 'url("/sprites/food.png") 0px -128px',
                width: "32px",
                height: "32px",
              }}
              onClick={() => {
                if (isOnline) feed("bg").then((msj) => setMessage(msj))
                else {
                  addQueuedAction({ type: "feed", payload: "bg" })
                  setMessage("Añadido a la cola")
                }
                feedOptions.current.classList.toggle("hidden")
              }}
            ></button>
            <button
              className="rounded mr-4 cursor-pointer hover:opacity-95"
              style={{
                background: 'url("/sprites/food.png") -32px -64px',
                width: "32px",
                height: "32px",
              }}
              onClick={() => {
                if (isOnline) feed("md").then((msj) => setMessage(msj))
                else {
                  addQueuedAction({ type: "feed", payload: "md" })
                  setMessage("Añadido a la cola")
                }
                feedOptions.current.classList.toggle("hidden")
              }}
            ></button>
            <button
              className="rounded cursor-pointer hover:opacity-95"
              style={{
                background: 'url("/sprites/food.png") 0px 0px',
                width: "32px",
                height: "32px",
              }}
              onClick={() => {
                if (isOnline) feed("sm").then((msj) => setMessage(msj))
                else {
                  addQueuedAction({ type: "feed", payload: "sm" })
                  setMessage("Añadido a la cola")
                }
                feedOptions.current.classList.toggle("hidden")
              }}
            ></button>
          </div>
          <button
            disabled={resting > 0}
            onClick={() => {
              feedOptions.current.classList.toggle("hidden")
            }}
            className="bg-blue-700 disabled:bg-blue-300 px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors w-full"
          >
            Feed
          </button>
        </div>
        <div>
          <div
            className="hidden absolute -translate-y-[100%] w-full"
            ref={trainOptions}
          >
            <button
              className="rounded mx-4 cursor-pointer hover:opacity-95 scale-200 mb-4"
              style={{
                background: 'url("/sprites/emotions.png") -160px -48px',
                width: "16px",
                height: "16px",
              }}
              onClick={() => {
                train("st").then((msj) => setMessage(msj))
                trainOptions.current.classList.toggle("hidden")
              }}
            ></button>
            <button
              className="rounded mx-4 cursor-pointer hover:opacity-95 scale-200 mb-4"
              style={{
                background: 'url("/sprites/emotions.png") -160px -0px',
                width: "16px",
                height: "16px",
              }}
              onClick={() => {
                train("md").then((msj) => setMessage(msj))
                trainOptions.current.classList.toggle("hidden")
              }}
            ></button>
            <button
              className="rounded ml-4 cursor-pointer hover:opacity-95 scale-200 mb-4"
              style={{
                background: 'url("/sprites/emotions.png") -160px -16px',
                width: "16px",
                height: "16px",
              }}
              onClick={() => {
                train("lw").then((msj) => setMessage(msj))
                trainOptions.current.classList.toggle("hidden")
              }}
            ></button>
          </div>
          <button
            disabled={resting > 0 || !isOnline}
            onClick={() => {
              if (trainOptions.current) {
                trainOptions.current.classList.toggle("hidden")
              }
            }}
            className="bg-blue-700 disabled:bg-blue-300 px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors w-full"
          >
            Train
          </button>
        </div>
        <button
          disabled={resting > 0}
          onClick={() => {
            if (isOnline) petting().then((msj) => setMessage(msj))
            else {
              addQueuedAction({ type: "petting", payload: null })
              setMessage("Añadido a la cola")
            }
          }}
          className="bg-blue-700 disabled:bg-blue-300 px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Pet
        </button>
        <button
          disabled={resting > 0}
          onClick={() => {
            if (isOnline) scold().then((msj) => setMessage(msj))
            else {
              addQueuedAction({ type: "petting", payload: null })
              setMessage("Añadido a la cola")
            }
          }}
          className="bg-blue-700 disabled:bg-blue-300 px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Scold
        </button>
        <button
          disabled={resting > 0}
          onClick={() => {
            if (isOnline)
              rest().then((restObj) => {
                setMessage(restObj.msj)
                setResting(Math.floor(restObj.resting * 60))
              })
            else {
              addQueuedAction({ type: "rest", payload: null })
              setMessage("Añadido a la cola")
            }
          }}
          className="bg-blue-700 disabled:bg-blue-300 px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Rest
        </button>
      </div>
      <div className="w-[300px] h-[150px] mx-auto mt-4 rounded">
        {resting > 0 && (
          <button
            onClick={() => {
              setMessage("Buenos días!")
              setResting(0)
            }}
            className="bg-amber-950 px-3 py-2 w-full cursor-pointer hover:bg-amber-900 transition-colors"
          >
            {resting} Wake up!
          </button>
        )}
      </div>
    </>
  ) : (
    <h1>Sincronizando...</h1>
  )
}
