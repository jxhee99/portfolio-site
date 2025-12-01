"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  const words = "디테일에 집중하는 개발자".split(" ")

  return (
    <section
      id="about"
      ref={sectionRef}
      className="h-screen relative flex items-center pt-20 snap-start overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Large reveal text */}
          <div className="mb-8 lg:mb-16">
            <p className="text-muted-foreground text-lg md:text-2xl mb-4 md:mb-8 overflow-hidden">
              <span
                className={`block transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                style={{ transitionDelay: "0.1s" }}
              >
                안녕하세요,
              </span>
            </p>

            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 md:mb-12">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                  <span
                    className={`inline-block transition-all duration-700 ${isVisible ? "translate-y-0 rotate-0 opacity-100" : "translate-y-full rotate-[5deg] opacity-0"}`}
                    style={{
                      transitionDelay: `${0.2 + i * 0.1}s`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
              <br />
              <span className="text-muted-foreground inline-block overflow-hidden">
                <span
                  className={`inline-block transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                  style={{ transitionDelay: "0.6s" }}
                >
                  개발자입니다
                </span>
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-16">
            <div
              className={`space-y-4 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: "0.4s" }}
            >
              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                저는 사용자 경험을 최우선으로 생각하며, 아름답고 직관적인 인터페이스를 구현하는 것을 즐깁니다. 최신 웹
                기술을 활용하여 성능과 접근성을 모두 고려한 솔루션을 제공합니다.
              </p>
            </div>

            <div
              className={`space-y-4 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: "0.5s" }}
            >
              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                React, Next.js, TypeScript를 주로 사용하며, 애니메이션과 인터랙션을 통해 사용자에게 즐거운 경험을
                선사하는 것이 목표입니다.
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-3 gap-4 md:gap-8 mt-8 lg:mt-16 pt-8 lg:pt-16 border-t border-border/30 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            style={{ transitionDelay: "0.7s" }}
          >
            {[
              { number: "5+", label: "Years Experience" },
              { number: "50+", label: "Projects Completed" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center transition-all duration-700"
                style={{ transitionDelay: `${0.8 + i * 0.1}s` }}
              >
                <div className="text-2xl md:text-5xl font-bold tracking-tight mb-1 md:mb-2">{stat.number}</div>
                <div className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
