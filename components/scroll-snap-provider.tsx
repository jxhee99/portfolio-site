"use client"

import type React from "react"

import { useEffect, useRef, useCallback, useState } from "react"

export function ScrollSnapProvider({ children }: { children: React.ReactNode }) {
  const isScrolling = useRef(false)
  const currentSection = useRef(0)
  const sections = useRef<HTMLElement[]>([])
  const lastScrollTime = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.current.length) return
    if (isScrolling.current) return

    isScrolling.current = true
    currentSection.current = index

    const section = sections.current[index]
    if (section) {
      section.scrollIntoView({ behavior: "auto", block: "start" })
    }

    setTimeout(() => {
      isScrolling.current = false
    }, 300)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const sectionElements = document.querySelectorAll("section[id]")
    sections.current = Array.from(sectionElements) as HTMLElement[]

    const findCurrentSection = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      for (let i = 0; i < sections.current.length; i++) {
        const section = sections.current[i]
        const rect = section.getBoundingClientRect()

        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          currentSection.current = i
          break
        }
      }
    }

    findCurrentSection()

    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return

      const now = Date.now()

      if (now - lastScrollTime.current < 300) {
        e.preventDefault()
        return
      }

      if (Math.abs(e.deltaY) < 30) return

      e.preventDefault()
      lastScrollTime.current = now

      if (e.deltaY > 0) {
        scrollToSection(currentSection.current + 1)
      } else {
        scrollToSection(currentSection.current - 1)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile) return

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault()
        scrollToSection(currentSection.current + 1)
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        scrollToSection(currentSection.current - 1)
      } else if (e.key === "Home") {
        e.preventDefault()
        scrollToSection(0)
      } else if (e.key === "End") {
        e.preventDefault()
        scrollToSection(sections.current.length - 1)
      }
    }

    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isMobile) return

      const now = Date.now()
      if (now - lastScrollTime.current < 300) return

      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY - touchEndY

      if (Math.abs(diff) > 50) {
        lastScrollTime.current = now
        if (diff > 0) {
          scrollToSection(currentSection.current + 1)
        } else {
          scrollToSection(currentSection.current - 1)
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("resize", checkMobile)
    }
  }, [scrollToSection, isMobile])

  return <>{children}</>
}
