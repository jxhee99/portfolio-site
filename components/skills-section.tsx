"use client"

import { useEffect, useRef, useState } from "react"

const skills = [
  {
    category: "Backend",
    items: [
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      {
        name: "Spring Boot",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      },
      { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "JPA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "REST API", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openapi/openapi-original.svg" },
      { name: "MyBatis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      {
        name: "InfluxDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/influxdb/influxdb-original.svg",
      },
    ],
  },
  {
    category: "Infra",
    items: [
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      {
        name: "EC2",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "JIRA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
    ],
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardWidth = container.offsetWidth * 0.75
    const newIndex = Math.round(container.scrollLeft / cardWidth)
    setCurrentIndex(Math.min(newIndex, skills.length - 1))
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="h-screen relative overflow-hidden bg-muted/30 flex items-center snap-start py-12 md:py-0"
    >
      <div className="w-full">
        <div className="container mx-auto px-6 mb-6 lg:mb-12 overflow-hidden">
          <h2
            className={`text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
          >
            Skills & <span className="text-muted-foreground">Expertise</span>
          </h2>
          <p
            className={`text-sm md:text-xl text-muted-foreground mt-4 md:mt-6 max-w-2xl mx-auto text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            다양한 기술 스택과 도구를 활용하여 최고의 결과물을 만들어냅니다
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex lg:hidden overflow-x-auto gap-4 px-6 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className={`flex-shrink-0 w-[75vw] snap-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative p-4 rounded-2xl bg-card border border-border/50 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 opacity-50" />

                <h3 className="text-lg font-bold mb-3 relative">{skill.category}</h3>

                <ul className="space-y-2 relative">
                  {skill.items.map((item) => (
                    <li key={item.name} className="text-muted-foreground text-xs flex items-center gap-2">
                      <img src={item.logo || "/placeholder.svg"} alt={item.name} className="w-5 h-5" />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicators */}
        <div className="flex lg:hidden justify-center gap-2 mt-3 px-6">
          {skills.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cardWidth = scrollContainerRef.current.offsetWidth * 0.75 + 16
                  scrollContainerRef.current.scrollTo({
                    left: cardWidth * index,
                    behavior: "smooth",
                  })
                }
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-foreground w-5" : "bg-foreground/30"
              }`}
            />
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto container px-6">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className={`group relative transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative p-6 rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-secondary/50 hover:shadow-2xl hover:shadow-secondary/10 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <h3 className="text-xl font-bold mb-4 relative">{skill.category}</h3>

                <ul
                  className={`relative ${skill.category === "Backend" ? "grid grid-cols-2 gap-x-4 gap-y-2.5" : "space-y-2.5"}`}
                >
                  {skill.items.map((item, itemIndex) => (
                    <li
                      key={item.name}
                      className="text-muted-foreground text-sm transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default flex items-center gap-3"
                      style={{ transitionDelay: `${itemIndex * 0.05}s` }}
                    >
                      <img src={item.logo || "/placeholder.svg"} alt={item.name} className="w-6 h-6" />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
