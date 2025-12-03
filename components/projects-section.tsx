"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const projects = [
  {
    id: "apilog",
    title: "APILog",
    description: "서비스 로그를 수집해 AI 리포트와 커스텀 위젯을 자동으로 생성하는 오픈소스 로그 분석 플랫폼",
    tags: ["Python", "FastAPI", "InfluxDB", "Pydantic", "OpenAI SDK", "Docker", "LLM"],
    image: "/opensource.png",
    color: "rgb(59, 130, 246)",
    githubUrl: "https://github.com/APIL0g/APILog",
  },
  {
    id: "see-you-letter",
    title: "See you letter",
    description: "음성으로 일상을 기록하면 AI가 감정을 분석해 편지를 만들고, NFT 형태의 디지털 타임캡슐로 선물할 수 있는 서비스",
    tags: ["Spring Boot", "JPA", "MySQL", "FastAPI", "Docker", "Jenkins", "AWS EC2", "IPFS", "Ethereum(NFT)"],
    image: "/see_you_letter.png",
    color: "rgb(99, 102, 241)",
    githubUrl: "https://github.com/SeeY0uLetter/SeeYouLetter",
  },
  {
    id: "ymhn",
    title: "예매했냥",
    description: "예매 일정 놓침 방지와 예매 내역 관리, 관극 일정 관리까지 지원하는 All-in-One 공연 일정 플랫폼",
    tags: ["Spring Boot", "JPA", "MySQL", "Redis", "MinIO", "Firebase FCM", "Jenkins", "Docker", "AWS EC2"],
    image: "/ymhn.png",
    color: "rgb(139, 92, 246)",
    githubUrl: "https://github.com/jxhee99/YMHN",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [cardWidth, setCardWidth] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth
      setIsMobile(vw < 768)
      let newCardWidth = vw - 48
      if (vw >= 1024) {
        newCardWidth = vw * 0.6
      } else if (vw >= 768) {
        newCardWidth = vw * 0.7
      }
      setCardWidth(newCardWidth)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current || cardWidth === 0) return
    const newIndex = Math.max(0, Math.min(index, projects.length - 1))
    setCurrentIndex(newIndex)
    const gap = isMobile ? 16 : 32
    carouselRef.current.scrollTo({
      left: newIndex * (cardWidth + gap),
      behavior: "smooth",
    })
  }

  const nextSlide = () => scrollToIndex(currentIndex + 1)
  const prevSlide = () => scrollToIndex(currentIndex - 1)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    if (!carouselRef.current || cardWidth === 0) return
    setIsDragging(false)
    const gap = isMobile ? 16 : 32
    const newIndex = Math.round(carouselRef.current.scrollLeft / (cardWidth + gap))
    scrollToIndex(newIndex)
  }

  const handleScroll = () => {
    if (!carouselRef.current || isDragging || cardWidth === 0) return
    const gap = isMobile ? 16 : 32
    const newIndex = Math.round(carouselRef.current.scrollLeft / (cardWidth + gap))
    if (newIndex !== currentIndex) {
      setCurrentIndex(Math.max(0, Math.min(newIndex, projects.length - 1)))
    }
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative h-screen overflow-hidden snap-start flex flex-col"
      style={{ paddingTop: "80px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, rgb(99, 102, 241, 0.15) 0%, transparent 70%)`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      <div className="container mx-auto px-6 mb-2 md:mb-4 flex-shrink-0">
        <div
          className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
        >
          <div>
            <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-1 md:mb-2">
              Selected Works
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                Projects
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border items-center justify-center transition-all duration-300 hover:bg-muted hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex === projects.length - 1}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border items-center justify-center transition-all duration-300 hover:bg-muted hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div
          ref={carouselRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-6 md:px-[20vw] snap-x snap-mandatory h-full items-center"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onScroll={handleScroll}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative flex-shrink-0 transition-all duration-700 snap-center ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
              style={{
                transitionDelay: `${0.2 + index * 0.1}s`,
                width: cardWidth > 0 ? `${cardWidth}px` : "calc(100vw - 3rem)",
              }}
            >
              <div className="relative aspect-[16/8] md:aspect-[16/7] rounded-xl md:rounded-2xl overflow-hidden mb-2 md:mb-3">
                <div
                  className="absolute -inset-4 rounded-[2rem] blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-40"
                  style={{ backgroundColor: project.color }}
                />
                <div className="relative h-full overflow-hidden rounded-xl md:rounded-2xl bg-muted">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 mix-blend-overlay transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${project.color} 0%, transparent 60%)`,
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-xl md:rounded-2xl ring-1 ring-inset ring-white/10" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-sm rounded-xl md:rounded-2xl">
                  <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                    <button
                      className="flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 bg-white text-black"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/projects/${project.id}`)
                      }}
                    >
                      <span>View Project</span>
                      <ExternalLinkIcon />
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium border border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        const url = project.githubUrl
                        if (url) {
                          window.open(url, "_blank", "noopener,noreferrer")
                        }
                      }}
                    >
                      <GithubIcon />
                      <span>Code</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1 px-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold tracking-tight mb-0.5">{project.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                  <span
                    className="text-2xl md:text-4xl font-bold leading-none opacity-10 group-hover:opacity-30 transition-opacity"
                    style={{ color: project.color }}
                  >
                    0{index + 1}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 pt-0.5">
                  {project.tags.slice(0, isMobile ? 3 : project.tags.length).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-medium border border-border/50 bg-background/50 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                  {isMobile && project.tags.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-medium text-muted-foreground">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 pb-4 flex-shrink-0">
        <div className="flex justify-center gap-1.5">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-5 md:w-6 bg-foreground"
                  : "w-1 md:w-1.5 bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
        {isMobile && <p className="text-[9px] text-muted-foreground animate-pulse">스와이프하여 더 보기</p>}
      </div>
    </section>
  )
}
