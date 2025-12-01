"use client"

import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rawMousePosition, setRawMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isAnimationComplete) return

      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
      setRawMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isAnimationComplete])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (!entry.isIntersecting) {
          setIsAnimationComplete(false)
          setMousePosition({ x: 0, y: 0 })
        }
      },
      { threshold: 0.3 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsAnimationComplete(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  const tiltX = mousePosition.y * 10
  const tiltY = mousePosition.x * -10

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen overflow-hidden snap-start"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Mouse glow effect - 애니메이션 완료 후에만 표시 */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-screen transition-opacity duration-300"
        style={{
          left: rawMousePosition.x,
          top: rawMousePosition.y,
          transform: "translate(-50%, -50%)",
          opacity: isHovering && isAnimationComplete ? 1 : 0,
        }}
      >
        <div
          className="w-64 h-64 rounded-full blur-[60px]"
          style={{
            background: "radial-gradient(circle, rgba(100, 150, 255, 0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Mouse dot - 애니메이션 완료 후에만 표시 */}
      <div
        className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-blue-400 transition-transform duration-100"
        style={{
          left: rawMousePosition.x,
          top: rawMousePosition.y,
          transform: `translate(-50%, -50%) scale(${isHovering && isAnimationComplete ? 1 : 0})`,
        }}
      />

      <div className="h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient orbs with mouse tracking */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full blur-[120px]"
            style={{
              background: "radial-gradient(circle, oklch(0.45 0.15 230 / 0.4) 0%, transparent 70%)",
              transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px) translateZ(0)`,
              transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[50rem] h-[50rem] rounded-full blur-[150px]"
            style={{
              background: "radial-gradient(circle, oklch(0.42 0.18 240 / 0.3) 0%, transparent 70%)",
              transform: `translate(${mousePosition.x * -60}px, ${mousePosition.y * -60}px) translateZ(0)`,
              transition: "transform 1s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full blur-[100px]"
            style={{
              background: "radial-gradient(circle, oklch(0.5 0.12 260 / 0.2) 0%, transparent 70%)",
              transform: `translate(calc(-50% + ${mousePosition.x * 30}px), calc(-50% + ${mousePosition.y * 30}px)) translateZ(0)`,
              transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        <div
          className="container mx-auto px-6 text-center"
          style={{
            transform: isAnimationComplete
              ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
              : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
            transformStyle: "preserve-3d",
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="overflow-hidden mb-4">
            <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter leading-[0.85]">
              <span className="block overflow-hidden">
                <span
                  className={`block transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                  style={{
                    transitionDelay: "0.1s",
                    transform: isVisible
                      ? `translateY(0) translateX(${isAnimationComplete ? mousePosition.x * -20 : 0}px) translateZ(50px)`
                      : "translateY(100%)",
                    textShadow: isAnimationComplete
                      ? `${mousePosition.x * 5}px ${mousePosition.y * 5}px 30px rgba(0,0,0,0.1)`
                      : "none",
                  }}
                >
                  Creative
                </span>
              </span>
              <span className="block overflow-hidden mt-2">
                <span
                  className={`block bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                  style={{
                    transitionDelay: "0.3s",
                    backgroundImage:
                      "linear-gradient(135deg, oklch(0.45 0.15 230), oklch(0.42 0.18 240), oklch(0.55 0.15 250))",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 8s ease infinite",
                    transform: isVisible
                      ? `translateY(0) translateX(${isAnimationComplete ? mousePosition.x * 20 : 0}px) translateZ(80px)`
                      : "translateY(100%)",
                    filter: isAnimationComplete
                      ? `drop-shadow(${mousePosition.x * 3}px ${mousePosition.y * 3}px 20px rgba(100, 130, 200, 0.3))`
                      : "none",
                  }}
                >
                  Developer
                </span>
              </span>
            </h1>
          </div>

          <div className="overflow-hidden">
            <p
              className={`text-lg md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-16 font-light tracking-wide transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{
                transitionDelay: "0.5s",
                transform: isVisible
                  ? `translateY(${isAnimationComplete ? mousePosition.y * 10 : 0}px) translateZ(30px)`
                  : "translateY(48px)",
              }}
            >
              감각적인 디자인과 최적화된 코드로
              <br />
              사용자 경험을 창조합니다
            </p>
          </div>

          <div
            className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: "0.7s", transform: "translateZ(20px)" }}
          >
            <button
              onClick={scrollToAbout}
              className="group relative inline-flex flex-col items-center gap-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-500"
              style={{
                transform: isAnimationComplete
                  ? `scale(${1 + Math.abs(mousePosition.x) * 0.05 + Math.abs(mousePosition.y) * 0.05})`
                  : "scale(1)",
                transition: "transform 0.3s ease-out",
              }}
            >
              <span className="tracking-widest uppercase text-xs">Scroll to explore</span>
              <div className="relative w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1 group-hover:border-blue-400 transition-colors">
                <div className="w-1 h-2 bg-current rounded-full animate-scroll-indicator group-hover:bg-blue-400" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />
    </section>
  )
}
