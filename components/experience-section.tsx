"use client"

import { useEffect, useRef, useState } from "react"

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  const experiences = [
    {
      company: "SW•AI 개발 교육",
      role: "삼성 청년 SW•AI아카데미 (SSAFY 13기)",
      period: "2025.01 - 2025.12",
      // description: "Next.js와 React를 활용한 대규모 프로젝트 개발 및 팀 리딩",
    },
    {
      company: "웹 애플리케이션 개발 교육",
      role: "한국소프트웨어기술진흥협회",
      period: "2024.02 - 2024.07",
      // description: "웹 서비스 설계부터 배포까지 전체 개발 프로세스 담당",
    },
  ]

  const achievements = [
    { type: "certification", name: "정보처리기사", year: "2023.11" },
    { type: "certification", name: "SQLD", year: "2024.06" },
    { type: "certification", name: "리눅스마스터 2급", year: "2023.03" },
    { type: "certification", name: "컴퓨터활용능력 1급", year: "2022.02" },
    { type: "award", name: "SSAFY 자율 프로젝트 우수상 (3등)", organization: "APILog", year: "2024.11" },
    { type: "award", name: "SSAFY 특화 프로젝트 우수상 (2등)", organization: "See you letter", year: "2024.10" },
    { type: "award", name: "SSAFY 공통 프로젝트 우수상 (3등)", organization: "예매했냥", year: "2024.08" },
  ]

  const certifications = achievements.filter((item) => item.type === "certification")
  const awards = achievements.filter((item) => item.type === "award")

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen relative py-20 snap-start overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Experience */}
          <div className="mb-16 lg:mb-24">
            <h2
              className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-8 lg:mb-12 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            >
              Experience
            </h2>

            <div className="space-y-6 lg:space-y-8">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className={`border-l-2 border-primary/30 pl-6 lg:pl-8 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
                  style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-base lg:text-lg text-primary">{exp.company}</p>
                    </div>
                    <span className="text-sm lg:text-base text-muted-foreground mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Awards */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Certifications */}
            <div>
              <h2
                className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                style={{ transitionDelay: "0.4s" }}
              >
                Certifications
              </h2>

              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className={`p-4 lg:p-5 rounded-lg bg-muted/30 backdrop-blur-sm transition-all duration-1000 hover:bg-muted/50 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                    style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
                  >
                    <h3 className="text-base lg:text-lg font-semibold mb-1">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h2
                className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                style={{ transitionDelay: "0.4s" }}
              >
                Awards
              </h2>

              <div className="space-y-4">
                {awards.map((award, i) => (
                  <div
                    key={i}
                    className={`p-4 lg:p-5 rounded-lg bg-muted/30 backdrop-blur-sm transition-all duration-1000 hover:bg-muted/50 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                    style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
                  >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-base lg:text-lg font-semibold">{award.name}</h3>
                    <span className="text-sm md:text-base text-muted-foreground">{award.organization}</span>
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground">{award.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
