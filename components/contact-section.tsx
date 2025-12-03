"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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

// Solved.ac용 트로피 아이콘
const SolvedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

const ArrowUpRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
)

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    } finally {
      setIsLoading(false)
      // 3초 후 상태 메시지 숨기기
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const links = [
    { name: "Email", href: "wngml2666@gmail.com", icon: MailIcon, label: "wngml2666@gmail.com" },
    { name: "GitHub", href: "https://github.com/jxhee99", icon: GithubIcon, label: "github.com/jxhee99" },
    { name: "Solved.ac", href: "https://solved.ac/profile/wngml2666", icon: SolvedIcon, label: "solved.ac/profile/wngml2666" },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-muted/30 snap-start h-screen flex items-center overflow-hidden"
    >
      <div className="w-full px-4 md:px-6 py-8 md:py-0">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 lg:mb-10 overflow-hidden">
            <h2
              className={`text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
            >
              {"Let's"} <span className="text-muted-foreground">Connect</span>
            </h2>
            <p
              className={`text-xs sm:text-lg md:text-xl text-muted-foreground mt-2 md:mt-4 max-w-2xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: "0.2s" }}
            >
              새로운 프로젝트나 협업 기회에 대해 이야기 나누고 싶으시다면 언제든지 연락 주세요
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12">
            <div
              className={`space-y-1 md:space-y-2 transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
              style={{ transitionDelay: "0.3s" }}
            >
              <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mb-2 md:mb-4">
                Contact Info
              </h3>

              {links.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between py-2 md:py-3 border-b border-border/30 hover:border-foreground/30 transition-colors"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div
                      className="p-1.5 md:p-2 rounded-full bg-muted transition-all duration-300"
                      style={{
                        transform: hoveredLink === link.name ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
                        backgroundColor: hoveredLink === link.name ? "oklch(0.45 0.15 230 / 0.2)" : undefined,
                      }}
                    >
                      {link.icon()}
                    </div>
                    <div>
                      <div className="font-medium text-xs md:text-sm">{link.name}</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">{link.label}</div>
                    </div>
                  </div>
                  <div
                    className="transition-all duration-300"
                    style={{
                      transform: hoveredLink === link.name ? "translate(4px, -4px)" : "translate(0, 0)",
                      opacity: hoveredLink === link.name ? 1 : 0.5,
                    }}
                  >
                    <ArrowUpRightIcon />
                  </div>
                </a>
              ))}
            </div>

            <div
              className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
              style={{ transitionDelay: "0.4s" }}
            >
              <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mb-2 md:mb-4">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
                <Input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="h-8 md:h-10 text-xs md:text-base border-0 border-b-2 border-border/50 rounded-none bg-transparent focus:border-secondary px-0 transition-colors disabled:opacity-50"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="이메일"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="h-8 md:h-10 text-xs md:text-base border-0 border-b-2 border-border/50 rounded-none bg-transparent focus:border-secondary px-0 transition-colors disabled:opacity-50"
                />
                <Textarea
                  name="message"
                  placeholder="메시지를 입력하세요..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="min-h-12 md:min-h-20 text-xs md:text-base border-0 border-b-2 border-border/50 rounded-none bg-transparent focus:border-secondary px-0 resize-none transition-colors disabled:opacity-50"
                />
                
                {/* 상태 메시지 */}
                {status === "success" && (
                  <p className="text-sm text-green-500">✓ 메시지가 성공적으로 전송되었습니다!</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-500">✗ 전송에 실패했습니다. 다시 시도해주세요.</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full h-9 md:h-10 text-xs md:text-sm group rounded-full bg-foreground text-background hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      <span className="ml-2">전송 중...</span>
                    </>
                  ) : (
                    <>
                      <span>메시지 보내기</span>
                      <span className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <SendIcon />
                      </span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div
            className={`mt-4 md:mt-8 pt-3 md:pt-4 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-1 md:gap-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "0.6s" }}
          >
            <p className="text-[10px] md:text-xs text-muted-foreground">
              © 2025 Developer Portfolio. All rights reserved.
            </p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Designed & Built with passion</p>
          </div>
        </div>
      </div>
    </section>
  )
}