import type React from "react"
import type { Metadata } from "next"
import { Sora, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
})

export const metadata: Metadata = {
  title: "김주희 포트폴리오 | Juhee Portfolio",
  description: "감각적인 디자인과 애니메이션으로 구현된 개발자 포트폴리오",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={`${sora.variable} ${plusJakarta.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
