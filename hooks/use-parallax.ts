"use client"

import { useEffect, useState, useRef, useCallback } from "react"

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      setOffset(scrollProgress * speed * 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return { ref, offset }
}

export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      // Calculate how far through the element we've scrolled
      const start = viewportHeight
      const end = -elementHeight
      const current = elementTop
      const scrollProgress = 1 - (current - end) / (start - end)

      setProgress(Math.max(0, Math.min(1, scrollProgress)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { ref, progress }
}

export function useSmoothScroll() {
  const [scrollY, setScrollY] = useState(0)
  const targetScrollY = useRef(0)
  const animationFrame = useRef<number>()

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateScroll = () => {
      targetScrollY.current = window.scrollY
      setScrollY((prev) => lerp(prev, targetScrollY.current, 0.1))
      animationFrame.current = requestAnimationFrame(updateScroll)
    }

    animationFrame.current = requestAnimationFrame(updateScroll)
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  return scrollY
}

export function useMagneticEffect() {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    setPosition({
      x: distanceX * 0.3,
      y: distanceY * 0.3,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  return { ref, position, handleMouseMove, handleMouseLeave }
}
