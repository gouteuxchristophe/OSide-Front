import { useEffect, useRef } from "react"

export const useSound = (sound: string) => {
  const audioElm = useRef<HTMLAudioElement | null>(null)

  const playSound = () => {
    if (audioElm.current) {
      audioElm.current.currentTime = 0
      audioElm.current.play()
    }
  }
  useEffect(() => {
    audioElm.current = new Audio(sound)
  }, [sound])

  return playSound
}