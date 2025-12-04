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

  const words = "스펀지 실험맨 같은 개발자".split(" ")

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
              <span className="text-blue-400 inline-block overflow-hidden">
                <span
                  className={`inline-block transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                  style={{ transitionDelay: "0.6s" }}
                >
                  김주희입니다
                </span>
              </span>
            </h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div
              className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: "0.4s" }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                <span className="font-bold">AI, 인프라, 백엔드</span>를 가리지 않고 직접 부딪혀 보며 배워왔습니다. 
                <br />
                <span className="font-bold">"저 팀은 뭘 하지?"라는 호기심이</span> 새로운 기술 스택을 익히는 동력이 되었고,
                <br />
                낯선 영역에서도 빠르게 <span className="font-bold">1인분 이상의 성과</span>를 내는 것이 제 강점입니다. 
              </p>
            </div>

            <div
              className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: "0.5s" }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                어디에 배치되든 <span className="font-bold">팀이 필요한 역할을 빠르게 찾아 즉시 기여</span>하는 개발자가 되겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
