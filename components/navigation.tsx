"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ["hero", "about", "experience", "skills", "projects", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 96
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const navItems = ["About", "Experience", "Skills", "Projects", "Contact"]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled ? "bg-background/60 backdrop-blur-2xl border-b border-border/50" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-semibold tracking-tight hover:opacity-70 transition-all duration-300 relative group"
          >
            <span className="relative z-10">Portfolio</span>
            <span
              className="absolute inset-0 bg-secondary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"
              style={{ transform: "translate(-4px, -2px)", padding: "4px 8px" }}
            />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.toLowerCase()

              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="relative z-10">{item}</span>

                  {/* Active/hover indicator */}
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full transition-all duration-300",
                      isActive
                        ? "bg-muted scale-100"
                        : hoveredItem === item
                          ? "bg-muted/50 scale-100"
                          : "bg-transparent scale-0",
                    )}
                  />

                  {/* Active dot */}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary transition-all duration-300",
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-0",
                    )}
                  />
                </button>
              )
            })}
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            <span>Get in Touch</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
