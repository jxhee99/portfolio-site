"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"

type ProjectDetail = {
  id: string
  title: string
  description: string
  overview: string
  problem: string
  tags: string[]
  image: string
  color: string
  duration: string
  keyFeatures: string
  myRole: string
  myContributions: {
    title: string
    percentage: number
    description: string
    demoMedia?: {
      src: string
      alt: string
    }
    demoMediaGallery?: {
      src: string
      alt: string
    }[]
  }[]
  teamStructure: {
    area: string
    members: number
    tasks: string
  }[]
  implementation: {
    title: string
    details: string[]
  }[]
  techContext: {
    tech: string
    context: string
  }[] 
  challengesAndSolutions: {
    title: string
    problem: string
    analysis?: string
    solution: string
    result: string
  }[]
  outcomes: string[]
  learned: {
    drawback: string
    insight: string
  }
  techStack: {
    name: string
    description: string
  }[]
  liveUrl: string | null
  githubUrl: string
}

const splitIntoParagraphs = (text: string) => {
  const trimmed = text.trim()
  if (!trimmed) return []

  const parts = trimmed.split(/(?<=[.!?])\s+/)
  if (parts.length <= 1) {
    return [trimmed]
  }

  return parts.map((part) => part.trim()).filter(Boolean)
}

const splitTasks = (tasks: string) => {
  return tasks
    .split(/[,/]/)
    .map((task) => task.trim())
    .filter(Boolean)
}

const outcomeIcons = ["📈", "✨", "🎯", "⚡"]

const getOutcomeIcon = (text: string, index: number) => {
  if (text.includes("수상")) {
    return "🏆"
  }
  return outcomeIcons[index % outcomeIcons.length]
}

const projectsData: ProjectDetail[] = [
  {
    id: "apilog",
    title: "APILog",
    description: "서비스 로그를 수집해 AI 리포트와 커스텀 위젯을 자동으로 생성하는 오픈소스 로그 분석 플랫폼",
    overview:"서비스 로그를 수집해 **AI 리포트**와 **커스텀 위젯**을 자동으로 만들어주는 **오픈소스 로그 분석 플랫폼**입니다.운영자가 직접 쿼리를 짜고 지표를 조합하던 일을, LLM 기반 에이전트가 대신 수행하도록 설계했습니다. '그래서 지금 서비스가 어떤 상태인지, 뭐가 문제인지'를 에이전트가 알려줍니다.",
    problem:"운영자는 수많은 로그와 대시보드를 가지고 있지만, '그래서 지금 서비스가 어떤 상태인지, 뭐가 문제인지'를 이해하기 위해 **매번 수동으로 쿼리를 짜고 지표를 조합**해야 했습니다. 이 과정을 **에이전트가 대신해 줄 수 없을까?**라는 질문에서 APILog를 시작했습니다.",
    tags: ["Python", "FastAPI", "InfluxDB", "Pydantic", "OpenAI SDK", "Docker", "LLM"],
    image: "/apilog-portlet.gif",
    color: "rgb(59, 130, 246)",
    duration: "2025.10.13 - 2025.11.20 (5주)",
    keyFeatures: "AI 위젯 생성, AI 리포트, 포틀릿 기능, 기본 위젯 13종",
    myRole: "백엔드 / AI",
    myContributions: [
      {
        title: "AI 리포트 파이프라인 구축",
        percentage: 100,
        description: "FastAPI 라우터 스캔 → 응답 샘플 수집 → LLM 컨텍스트 전달 → 리포트 생성 파이프라인 설계",
        demoMedia: {
          src: "/ai-report.gif",
          alt: "AI 리포트 파이프라인 흐름",
        },
      },
      {
        title: "로그 분석 위젯 개발",
        percentage: 35,
        description: "세션 기반 브라우저 통계, 페이지별 이탈률, 인기 페이지 순위 등 기본 위젯 구현",
        demoMedia: {
          src: "/widget-slide.gif",
          alt: "로그 분석 위젯 시연",
        },
      },
      {
        title: "AI 위젯 자동 생성 구현",
        percentage: 35,
        description: "자연어 입력 → DB 스키마 분석 → 쿼리/위젯 스펙 자동 생성 흐름 설계",
        demoMedia: {
          src: "/ai-widget-create.gif",
          alt: "AI 위젯 자동 생성 시연",
        },
      },
    ],
    teamStructure: [
      { area: "Frontend", members: 1, tasks: "마이크로사이트 개발, 포틀릿 환경 구성" },
      { area: "Backend", members: 3, tasks: "로그 수집, DB 설계, API 개발" },
      { area: "AI", members: 2, tasks: "AI 위젯 자동 생성, AI 리포트, AI 인사이트" },
    ],
    implementation: [
      {
        title: "AI 리포트 파이프라인 구축 및 응답 신뢰도/성능 향상",
        details: [
          "InfluxDB 로그를 그대로 LLM에 전달하는 방식이 아닌, **FastAPI 라우터를 코드 레벨에서 스캔**하고 각 엔드포인트에 **자동 요청 → 응답 샘플 수집 → 컨텍스트로 전달**하는 파이프라인 구축",
          "리포트가 항상 **동일한 구조로 반환**되도록 **응답 스키마를 먼저 정의**하고, LLM 응답을 해당 스키마 기준으로 파싱 → **파싱 에러율 감소**",
          "일부 필드가 스키마와 다르게 오더라도 **전체 실패 대신 해당 항목만 목업 데이터로 보완**하는 리포트를 완성하도록 구현",
        ],
      },
      {
        title: "기본 위젯 개발 및 AI 위젯 생성 기능",
        details: [
          "세션 기반 브라우저 통계 / 페이지별 이탈률 / 인기 페이지 순위 등 기본 분석 위젯 설계·구현",
          "사용자가 **자연어로 원하는 통계 분석 입력** → 내부 DB 스키마와 함께 LLM에 전달 → **필요한 쿼리와 위젯 스펙(지표, 차트 타입, 축 정보 등) 자동 생성** → 대시보드에서 바로 사용 가능하도록 구현",
        ],
      },
      {
        title: "오픈소스 및 플러그인 아키텍처 설계",
        details: [
          "코어 로직과 확장 기능을 분리하는 플러그인 아키텍처 설계 → 외부 기여자가 내부 코드 수정 없이 독립적인 위젯 모듈 제작·배포 가능",
          "컨트리뷰션 가이드 및 커밋 컨벤션 수립, 체계적인 PR 규칙 적용으로 코드 리뷰 효율 향상",
        ],
      },
    ],
    techContext: [
      { tech: "InfluxDB ", context: "로그 분석 특성상 대량의 로그 데이터를 지속적으로 Insert/Select 하는 작업이 빈번하게 발생하기 때문에 시계열 DB로 RDB 대비 압도적인 쓰기 및 조회 성능 제공 " },
      { tech: "FastAPI ", context: "사용자 로컬 환경에서 실행되어야 하므로 경량화 및 빠른 구동 필수, Java VM 같은 무거운 환경 없이 빠르게 구동 가능" },
      { tech: "OpenAI SDK", context: " AI위젯/리포트 기능 구현 시 단순 API 호출을 넘어 AI 모델 출력을 원하는 형태로 튜닝하거나 특정 기능을 적용하기 위해 사용" },
    ],
    challengesAndSolutions: [
      {
        title: "1. 내장 LLM(Ollama) JSON 파싱 길이 반환 문제",
        problem:
          "로컬 내장 LLM(Ollama)로 AI 리포트 생성 시도 → **양자화 모델에서 긴 JSON 응답이 중간에 잘림** → 응답 형식 불일치로 **fallback 함수로 넘어가는 상황** 발생",
        analysis:
          "AI 리포트는 **긴 JSON 응답과 일관된 구조가 필수**. Ollama에서 안정적으로 긴 응답을 생성하려면 **48GB VRAM 필요** → 일반 개발환경에서 확보 불가능",
        solution:
          "로컬 LLM 자원 한계로 단순 튜닝으로는 해결 불가 → **AI 리포트 생성 엔진을 OpenAI SDK 기반으로 마이그레이션**",
        result:
           "고품질 자연어 응답과 **긴 보고서 생성 시 잘림 현상 없이 안정적 반환** 확인",
      },
      {
        title: "2. AI 리포트 조회 타임아웃 및 CPU 과부하",
        problem:
          "리포트 생성 요청 시 **3분 타임아웃 초과**, **CPU 100% 점유**로 응답 실패 → fallback 로직으로 빠지며 정상 리포트 생성 불가",
        analysis:
          "InfluxDB의 **path_raw가 태그가 아닌 필드로 저장** → 페이지별 필터링 시 **인덱스 사용 불가 → 전체 스캔 발생**. FastAPI 라우터 전체 스캔 후 모든 GET 엔드포인트에 개별 HTTP 요청 → **페이지 수 × 필드** 스캔으로 부하 급증",
        solution:
          "**path_raw를 필드 → 태그로** 스키마 변경 → 쿼리당 full scan에서 인덱스 조회로 전환",
        result:
          "**타임아웃 내 정상 응답 반환**, **CPU 과부하 해결**, **AI 리포트 생성 정상화**",
      },
    ],
    outcomes: [
      "**SSAFY 프로젝트 우수상 수상** (2025.11)",
      "AI 리포트 파이프라인 구축으로 안정적인 리포트 생성 달성",
      "InfluxDB 스키마 최적화로 타임아웃 및 CPU 과부하 문제 해결",
      "오픈소스 플러그인 아키텍처 설계로 프로젝트 확장성 확보",
    ],
    learned: {
      drawback:
        "실제 운영 환경을 고려하면 로그가 지속적으로 증가해 스토리지 비용과 성능 문제가 발생할 수 있어, 로그 보관 주기와 삭제 정책을 도입했어야 했는데 그러지 못한 점이 아쉽습니다.",
      insight:
        "오픈소스 프로젝트는 다른 개발자가 기여할 수 있도록 진입 장벽을 낮추는 문서화가 핵심이라는 것을 깨달았고, 설치 및 기여 가이드, 데모 사이트 등 작업을 꼼꼼히 작업했습니다.",
    },
    techStack: [
      { name: "Python", description: "React 프레임워크" },
      { name: "FastAPI", description: "타입 안정성" },
      { name: "TypeScript", description: "스타일링" },
      { name: "InfluxDB", description: "결제 처리" },
      { name: "Docker", description: "상태 관리" },
      { name: "OpenAI SDK", description: "데이터베이스" },
    ],
    liveUrl: "https://apilog.kr/",
    githubUrl: "https://github.com/APIL0g/APILog",
  },
  {
    id: "see-you-letter",
    title: "See you letter",
    description: "음성으로 일상을 기록하면 AI가 감정을 분석해 편지를 만들고, NFT 형태의 디지털 타임캡슐로 선물할 수 있는 서비스",
    overview:"음성으로 일상을 기록하면 AI가 감정을 분석해 편지를 만들어주고, 이를 NFT 형태의 디지털 타임캡슐로 선물할 수 있는 서비스입니다.",
    problem:"'만약 당신이 내일 죽는다면?'이라는 질문에서 시작했습니다. **감정과 기억을 디지털로 보존**하고, **원하는 시점에 소중한 사람에게 전달**할 수 있는 방법이 필요했습니다.",
    tags: ["Spring Boot", "JPA", "MySQL", "FastAPI", "Docker", "Jenkins", "AWS EC2", "GPT-4.1 Nano", "Claude 3.7 Sonnet", "CosyVoice2", "IPFS", "Ethereum(NFT)"],
    image: "/see_you_letter.png",
    color: "rgb(99, 102, 241)",
    duration: "2025.08.25 - 2025.09.29 (5주)",
    keyFeatures: "워치 기반 음성 기록, AI 데일리 회고, 목소리 편지 생성, NFT 타임캡슐",
    myRole: "인프라 / AI / 디자인",
    myContributions: [
      {
        title: "인프라 및 배포 자동화",
        percentage: 100,
        description: " Docker/Jenkins 활용 CI/CD 파이프라인 구축 및 서비스 운영 환경 안정화",
      },
      {
        title: "AI 기반 기록 파이프라인 구축 (35%)",
        percentage: 35,
        description:
          "**음성 → STT → LLM 분석(감정/키워드) → 편지 생성** 파이프라인 설계, **Zero-shot 음성 복제** 구현",
        demoMediaGallery: [
          { src: "/voice.gif", alt: "음성 기록" },
          { src: "/retrospect.gif", alt: "AI 회고 생성" },
          { src: "/letter.gif", alt: "감성 편지 생성" },
        ],
      },
      {
        title: "UI/UX 디자인",
        percentage: 30,
        description: "와이어프레임 설계, 감성 콘셉트 기반 디자인 설계",
      },
    ],
    teamStructure: [
      { area: "Frontend", members: 1, tasks: "Kotlin 기반 UI 설계, 워치 연동" },
      { area: "Backend", members: 3, tasks: "DB 설계, API 개발, 블록체인 개발" },
      { area: "AI", members: 2, tasks: "음성 복제, 회고 생성(STT/TTS), 편지 생성" },
    ],
    implementation: [
      {
        title: "인프라 구축 및 배포 자동화",
        details: [
          "Docker 기반 서비스 컨테이너화로 환경 **일관성 확보**",
          "Jenkins 5단계 파이프라인 구성: Source → Build → Test → Dockerize → Deploy",
          "**배포 시간 15분 → 3분 단축 (80% 개선)**",
        ],
      },
      {
        title: "AI 기반 지능형 기록 파이프라인 구축",
        details: [
          "**기능별 LLM 모델 분리**로 응답 지연 개선",
          "키워드/감정 분석 + 질문 생성: GPT-4.1 Nano (빠른 응답)",
          "감성 편지 생성: Claude 3.7 Sonnet (고품질 글쓰기)",
          "**음성 입력 → STT → 감정/키워드 추출 → 맞춤형 질문 및 편지 생성** LLM 프롬프트 엔지니어링 설계",
          "**CosyVoice2 기반 Zero-shot 음성 복제** 구현 (10~30초 샘플로 목소리 편지 생성)",
        ],
      },
      {
        title: "UI/UX 패턴 분석 및 기능 요구사항 분석",
        details: [
          "디자인을 담당하며 각 화면에 필요한 API EndPoint와 데이터 구조를 백엔드 관점에서 정의 → FE/BE 간 커뮤니케이션 시간 최소화",
          "'디지털 타임캡슐' 콘셉트에 맞는 감성적 디자인 설계, 워치 기반 음성 기록을 핵심 플로우로 단순화",
        ],
      },
    ],
    techContext: [
      { tech: "NFT + IPFS", context: "편지/음성의 영속성 보장을 위해 블록체인에 영구 보존. 실제 콘텐츠는 대칭키 암호화 후 IPFS에 저장하여 공개 환경에서도 노출 방지" },
      { tech: "CosyVoice2 ", context: "한국어 억양/톤 재현 품질이 가장 우수. 별도 학습 없이 10~30초 샘플만으로 Zero-shot 음성 복제 가능" },
      { tech: "STT/TTS", context: " Whisper API로 음성 → 텍스트 변환 및 핵심 내용 요약 → GPT-4o mini TTS로 맞춤 회고 질문을 통화형식으로 제공 → CosyVoice2로 사용자 음성 복제하여 목소리 편지 생성" },
    ],
    challengesAndSolutions: [
      {
        title: "1. 편지 생성 품질 저하 및 응답 속도 문제",
        problem: "모든 회고고 데이터를 LLM에 주입 → 기계적인 ‘일간 회고 총정리’ 수준의 편지 생성. 응답시간 44초 소요",
        solution: "프롬프트 엔지니어링으로 LLM 역할 재정의(”진심이 담긴 편지를 작성하는 전문가”), 전체 회고 중 핵심 에피소드만 선택하여 편지 소재로 사용하고 나머지는 맥락 파악용으로 활용하도록 명시",
        result: "**API 응답 시간 44초 → 15초(66% 개선)**, 에피소드 나열식 → 핵심 감정에 집중한 진정성 있는 편지로 품질 향상",
      },
      {
        title: "2. 음성 복제 품질 및 비용 문제",
        problem: "**GPU 학습 방식**은 사용자마다 모델 학습 필요 → **서비스 비용 과다**, **학습 시간 30~1시간 소요**, **유사도 기대 미달**",
        solution: "**Zero-Shot TTS 방식으로 전환**, 여러 모델 테스트 후 한국어 억양과 톤이 가장 자연스러운 CosyVoice2 선택",
        result: "**대기 시간 30분 ~ 1시간 → 15초로 단축**하고 10초~30초 샘플만으로 자연스러운 목소리 구현 → 즉각적인 서비스 제공 ",
      },
    ],
    outcomes: ["**SSAFY 자율 프로젝트 우수상 수상** (2025.10)", "편지 생성 API 응답 속도 66% 개선 (44초 → 15초)", "음성 복제 대기 시간 99% 단축 (30분~1시간 → 15초)", "배포 시간 80% 단축 (15분 → 3분)"],
    learned: {
      drawback:
        "MR 요청 시 코드 리뷰 AI를 활용했다면 기본적인 구현 상의 이슈들을 빠르게 걸러내고, 코드 품질을 개선할 수 있었을 것 같습니다.",
      insight:
        "음성 입력부터 STT, LLM 분석, 회고 질문 생성, TTS·음성 복제까지 여러 단계를 거치는 흐름을 구현하면서, 개별 모델의 성능뿐 아니라 이들을 어떻게 하나의 안정적인 AI 파이프라인으로 설계·연결하느냐가 서비스 완성도를 좌우한다는 점을 깨달았습니다.",
    },
    techStack: [
      { name: "Spring Boot", description: "프레임워크" },
      { name: "JPA", description: "AI 모델" },
      { name: "MySQL", description: "실시간 통신" },
      { name: "FastAPI", description: "데이터베이스" },
      { name: "Docker", description: "데이터 페칭" },
      { name: "Jenkins", description: "데이터 페칭" },
      { name: "AWS EC2", description: "데이터 페칭" },
      { name: "IPFS", description: "데이터 페칭" },
      { name: "Ethereum(NFT)", description: "데이터 페칭" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/SeeY0uLetter/SeeYouLetter",
  },
  {
    id: "ymhn",
    title: "예매했냥",
    description: "예매 일정 놓침 방지와 예매 내역 관리, 관극 일정 관리까지 지원하는 All-in-One 공연 일정 플랫폼",
    overview:"예매 일정 놓침 방지와 예매 내역 관리, 관극 일정 관리까지 지원하는 **All-in-One 공연 일정 플랫폼**입니다. 파편화된 공연/뮤지컬 정보로 인해 불편함을 겪고 있는 **2030 여성들을 타겟**으로 개발했습니다.",
    problem:"**파편화된 공연/뮤지컬 정보**로 인해 불편함을 겪고 있는 2030 여성들이 많았습니다. 공연 정보 서비스를 **제한된 시간 내에 완성도 있게 구축**해야 했고, **이미지 리소스 처리로 인한 성능 문제**가 주요 과제였습니다.",
    image: "/ymhn.png",
    tags: ["Spring Boot", "JPA", "MySQL", "Redis", "MinIO", "Firebase FCM", "Jenkins", "Docker", "AWS EC2"],
    color: "rgb(139, 92, 246)",
    duration: "2025.07.14 - 2025.08.18 (5주)",
    keyFeatures: "예매 일정 알림, JWT 인증, 이미지 최적화, FCM 푸시",
    myRole: "팀장 / 백엔드 / 디자인",
    myContributions: [
      {
        title: "로그인 및 JWT 발급",
        percentage: 100,
        description: "Access/Refresh Token 분리 구조 설계 및 Spring Security 기반 인증 필터 구현",
      },
      {
        title: "API 개발 / 대용량 이미지 처리 및 성능 최적화",
        percentage: 35,
        description: "MinIO 스토리지 서버 연동 및 이미지 업로드/조회 REST API 구현",
      },
      {
        title: "Firebase 알림 구현",
        percentage: 35,
        description: "예매/공연 일정과 연동된 FCM 푸시 알림 발송 모듈 구현",
      },
    ],
    teamStructure: [
      { area: "Frontend", members: 3, tasks: "UI/UX 개발" },
      { area: "Backend", members: 2, tasks: "크롤링, DB 설계, API 개발, 알림 구현" },
      { area: "AI", members: 1, tasks: "OCR 기반 티켓 자동 등록" },
    ],
    implementation: [
      {
        title: "JWT 기반 보안 인증 시스템 구축",
        details: [
          "Access Token + Refresh Token 분리 발급 로직 설계",
          "**Stateless 인증 환경 구축**으로 서버 세션 저장소 부하 감소",
          "토큰 탈취 위험 최소화",
        ],
      },
      {
        title: "Object Storage(MinIO) 도입으로 이미지 렌더링 성능 70% 개선",
        details: [
          "외부 URL 의존성 제거 → 자체 서버로 Migration",
          "**이미지 렌더링 시간 11.4초 → 3.4초 단축**",
        ],
      },
      {
        title: "Firebase FCM 실시간 알림 서비스 구현",
        details: [
          "예매 일정, 공연 일정 등 이벤트 발생 시 푸시 알림 전송",
          "사용자 편의성 및 재방문율 향상 기여",
        ],
      },
    ],
    techContext: [
      { tech: "MinIO", context: "외부 URL 호출 시 외부 서버 의존성 문제, 11.4초 로딩 지연 문제 → 내부 Object Storage로 Migration하여 안정성 확보 및 70% 성능 개선" },
      { tech: "Firebase FCM", context: "Polling 방식의 불필요한 HTTP 요청 제거, 이벤트 기반 실시간 알림 보장"},
      { tech: "Redis", context: "디바이스 토큰을 memberId와 매핑하여 불필요한 RDB 호출을 줄이고 지연 없는 알림 환경 구축"},
    ],
    challengesAndSolutions: [
      {
        title: "1. JPA Fetch Join 페이지네이션 Count 쿼리 중복 계산 문제",
        problem: "선호 공연 목록 조회 시 실제 10개 데이터가 40개(4페이지)로 잘못 계산",
        analysis:"1:N 관계 컬렉션을 LEFT JOIN FETCH하면 부모 엔티티가 자식 수만큼 중복 조회 → **JPA 자동 Count 쿼리가 중복 행을 모두 합산**",
        solution: "데이터 조회와 개수 계산 로직 분리, 공연 ID만 카운팅하는 별도 쿼리 작성",
        result: "데이터 로딩 시 **Fetch Join은 유지하면서 N+1 문제 해결**하고 페이지네이션 정합성 확보",
      },
      {
        title: "2. 대용량 이미지 리소스 처리 성능 문제",
        problem: "공연 서비스 특성상 이미지가 많았고, 외부 URL 순차적 요청으로 **평균 11초 네트워크 지연** 발생, 사용자 이탈 유발 가능성",
        solution: "**MinIO 도입**으로 이미지 서비스 책임 분리, 클라이언트에게 **직접 전송**하는 구조로 변경. 추가 최적화: JPG/GIF → WEBP 변환 + 120×160 리사이징으로 용량 95.6% 감소",
        result: "**로딩 시간 11.4초 → 3.4초 (70% 개선)**",
      },
    ],
    outcomes: [
      "**SSAFY 공통 프로젝트 우수상 수상** (2025.08)",
      "이미지 렌더링 성능 70% 개선 (11.4초 → 3.4초)",
      "이미지 용량 90% 감소 (WEBP 변환 + 리사이징)",
    ],
    learned: {
      drawback:
        "웹/모바일 웹 환경에서 서비스 워커 기반의 웹 푸시까지는 적용하지 못해 사이트에 접속했을 때만 알림을 확인할 수 있었습니다. 카카오톡 알림 등 접속 여부와 상관없이 도달할 수 있는 채널을 추가하지 못한 점이 아쉽습니다.",
      insight:
        "렌더링이 느리면 이탈률이 높아지고, UX가 불편하면 기능이 좋아도 잘 사용되지 않습니다. 결국 사용자가 불편함을 느끼는 지점을 찾아 성능과 경험을 개선하는 부분이 중요하다고 생각합니다.",
    },
    techStack: [
      { name: "Spring Boot", description: "UI 프레임워크" },
      { name: "JPA", description: "백엔드 서버" },
      { name: "MySQL", description: "데이터베이스" },
      { name: "Redis", description: "컨테이너화" },
      { name: "MinIO", description: "컨테이너화" },
      { name: "Firebase FCM", description: "컨테이너화" },
      { name: "Jenkins", description: "데이터베이스" },
      { name: "Docker", description: "컨테이너화" },
      { name: "AWS EC2", description: "컨테이너화" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/jxhee99/YMHN",
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [expandedContribution, setExpandedContribution] = useState<string | null>(null)
  const [galleryIndexes, setGalleryIndexes] = useState<Record<string, number>>({})
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleContribution = (title: string, hasGallery?: boolean) => {
    setExpandedContribution((prev) => (prev === title ? null : title))
    if (hasGallery) {
      setGalleryIndexes((prev) => ({
        ...prev,
        [title]: prev[title] ?? 0,
      }))
    }
  }

  const handleGalleryNav = (title: string, direction: "prev" | "next", length: number) => {
    if (length <= 1) return
    setGalleryIndexes((prev) => {
      const current = prev[title] ?? 0
      const offset = direction === "next" ? 1 : -1
      const nextIndex = (current + offset + length) % length
      return {
        ...prev,
        [title]: nextIndex,
      }
    })
  }

  useEffect(() => {
    const foundProject = projectsData.find((p) => p.id === params.id)
    if (foundProject) {
      setProject(foundProject)
    }
  }, [params.id])

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const windowHeight = window.innerHeight
      const documentHeight = contentRef.current.scrollHeight
      const scrollTop = window.scrollY
      const progress = scrollTop / (documentHeight - windowHeight)
      setScrollProgress(Math.min(Math.max(progress, 0), 1))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [project])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">프로젝트를 찾을 수 없습니다</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" ref={contentRef}>
      {/* 스크롤 진행률 바 */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollProgress * 100}%`,
            background: `linear-gradient(90deg, ${project.color} 0%, rgb(139, 92, 246) 100%)`,
          }}
        />
      </div>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.push("/#projects")}
        className="fixed top-24 left-6 z-40 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center transition-all duration-300 hover:bg-muted hover:scale-110"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 히어로 섹션 */}
      <section className="relative pt-24 pb-12 px-6 overflow-hidden md:py-16">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${project.color} 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">{project.title}</h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>Live Demo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            <a
              href={project.githubUrl}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-medium transition-all duration-300 hover:bg-muted"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>View Code</span>
            </a>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{project.duration}</span>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 text-foreground/90">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3l2.09 6.26H20l-5.17 3.76L16.18 19 12 15.77 7.82 19l1.35-6L4 9.26h5.91L12 3z" />
                </svg>
                <span>주요 기능</span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {project.keyFeatures}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 이미지 */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-auto" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>
      </section>

      {/* Project Tech Stack */}
      <section className="px-4 md:px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Project Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, i) => (
              <div
                key={i}
                className="inline-flex items-center px-4 py-2 rounded-full bg-background border border-border hover:bg-muted transition-colors duration-300 text-sm font-medium"
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Overview</h2>
          <p className="text-base leading-relaxed text-foreground/90" style={{ lineHeight: "1.8" }}>
            {project.overview.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={idx}>{part.slice(2, -2)}</strong>
              }
              return <span key={idx}>{part}</span>
            })}
          </p>
        </div>
      </section>

      {/* Problem 섹션 */}
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Problem</h2>
          <p className="text-base leading-relaxed text-foreground/90" style={{ lineHeight: "1.8" }}>
            {project.problem.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={idx}>{part.slice(2, -2)}</strong>
              }
              return <span key={idx}>{part}</span>
            })}
          </p>
        </div>
      </section>

      {/* Approach & My Role 섹션 */}
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Approach & My Role</h2>

          {/* 담당 역할 */}
          <div className="mb-8 p-5 rounded-xl border-2" style={{ borderColor: project.color }}>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">담당 역할</span>
              <span className="text-xl font-bold" style={{ color: project.color }}>
                {project.myRole}
              </span>
            </div>
          </div>

          {/* Team Structure */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">팀 내 역할 분담</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.teamStructure.map((team, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border bg-muted/30 flex flex-col gap-3 h-full"
                >
                  <div className="flex items-baseline gap-3">
                    <h4 className="text-xl font-bold">{team.area}</h4>
                    <span className="text-sm text-muted-foreground">({team.members}명)</span>
                  </div>
                  <div className="flex-1">
                    <ul className="space-y-1 text-base text-foreground/80">
                      {splitTasks(team.tasks).map((task, idx) => (
                        <li key={idx} className="leading-relaxed">
                          • {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Contribution */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">개인 기여도</h3>
            <div className="space-y-6">
              {project.myContributions.map((contribution, index) => {
                const hasGallery = Boolean(contribution.demoMediaGallery?.length)
                const hasMedia = Boolean(contribution.demoMedia || hasGallery)
                const currentGalleryIndex = galleryIndexes[contribution.title] ?? 0
                const currentGalleryItem = contribution.demoMediaGallery?.[currentGalleryIndex]

                return (
                  <div key={index}>
                    <div className="flex flex-col gap-3 mb-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (hasMedia) {
                            toggleContribution(contribution.title, hasGallery)
                          }
                        }}
                        className={`flex flex-wrap items-center justify-between gap-3 w-full text-left ${
                          hasMedia ? "cursor-pointer" : ""
                        }`}
                        aria-expanded={
                          hasMedia ? expandedContribution === contribution.title : undefined
                        }
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-xl font-bold">{contribution.title}</h4>
                          {hasMedia && (
                            <span
                              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                                expandedContribution === contribution.title
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "border-border text-foreground/80 bg-background"
                              }`}
                            >
                              이미지 보기
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className={`transition-transform duration-300 ${
                                  expandedContribution === contribution.title ? "rotate-180" : ""
                                }`}
                              >
                                <path d="M6 9l6 6 6-6" />
                              </svg>
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-primary flex-shrink-0">
                          ({contribution.percentage}%)
                        </span>
                      </button>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-500"
                          style={{ width: `${contribution.percentage}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-base text-foreground/80 leading-relaxed">
                      {contribution.description.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={idx}>{part.slice(2, -2)}</strong>
                        }
                        return <span key={idx}>{part}</span>
                      })}
                    </p>
                    {contribution.demoMedia && expandedContribution === contribution.title && (
                      <div className="mt-4 rounded-xl border border-border bg-muted/30 overflow-hidden">
                        <img
                          src={contribution.demoMedia.src}
                          alt={contribution.demoMedia.alt}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    {hasGallery && expandedContribution === contribution.title && (
                      <div className="mt-4 rounded-2xl border border-border bg-muted/30 overflow-hidden">
                        <div className="relative">
                          <img
                            src={currentGalleryItem?.src}
                            alt={currentGalleryItem?.alt}
                            className="w-full h-auto object-cover"
                          />
                          {currentGalleryItem?.alt && (
                            <div className="absolute left-3 top-3 bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-1 text-xs font-semibold text-foreground shadow-sm">
                              {currentGalleryItem.alt}
                            </div>
                          )}
                          <button
                            type="button"
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full w-10 h-10 flex items-center justify-center hover:bg-background transition-colors"
                            onClick={() =>
                              handleGalleryNav(
                                contribution.title,
                                "prev",
                                contribution.demoMediaGallery?.length || 0,
                              )
                            }
                            aria-label="이전 이미지"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full w-10 h-10 flex items-center justify-center hover:bg-background transition-colors"
                            onClick={() =>
                              handleGalleryNav(
                                contribution.title,
                                "next",
                                contribution.demoMediaGallery?.length || 0,
                              )
                            }
                            aria-label="다음 이미지"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M9 6l6 6-6 6" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex justify-center gap-2 py-3">
                          {contribution.demoMediaGallery?.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              className={`h-2 w-2 rounded-full transition-colors ${
                                currentGalleryIndex === dotIdx ? "bg-foreground" : "bg-foreground/30"
                              }`}
                              onClick={() =>
                                setGalleryIndexes((prev) => ({
                                  ...prev,
                                  [contribution.title]: dotIdx,
                                }))
                              }
                              aria-label={`${dotIdx + 1}번째 이미지 보기`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Implementation Details */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">구현 내용</h3>
            <div className="space-y-6">
              {project.implementation.map((item, i) => (
                <div key={i} className="border rounded-xl p-6 bg-background hover:shadow-md transition-shadow">
                  {/* Title with number badge */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: project.color }}
                    >
                      {i + 1}
                    </div>
                    <h4 className="text-xl font-bold leading-tight pt-1.5">{item.title}</h4>
                  </div>

                  {/* Details with consistent check icons */}
                  <div className="pl-14 space-y-3">
                    {item.details.map((detail, j) => (
                      <div key={j} className="flex gap-3">
                        <svg
                          className="flex-shrink-0 w-5 h-5 mt-0.5"
                          style={{ color: project.color }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-base leading-relaxed flex-1" style={{ lineHeight: "1.75" }}>
                          {detail.split(/(\*\*.*?\*\*)/g).map((part, partIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={partIdx}>{part.slice(2, -2)}</strong>
                            }
                            return <span key={partIdx}>{part}</span>
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 사용 기술 / 적용 맥락 */}
          <div>
            <h3 className="text-2xl font-bold mb-4">사용 기술 / 적용 맥락</h3>
            <div className="space-y-4">
              {project.techContext.map((item, i) => (
                <div key={i} className="px-6 py-4 rounded-lg border border-border bg-muted/30">
                  <div className="space-y-2 text-base leading-relaxed px-2" style={{ lineHeight: "1.8" }}>
                    <h4 className="font-bold text-base mb-1" style={{ color: project.color }}>
                      {item.tech}
                    </h4>
                    {splitIntoParagraphs(item.context).map((paragraph, idx) => {
                      // **로 감싸진 부분을 bold 처리
                      const parts = paragraph.split(/(\*\*.*?\*\*)/g)
                      return (
                        <p key={idx}>
                          {parts.map((part, partIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={partIdx}>{part.slice(2, -2)}</strong>
                            }
                            return <span key={partIdx}>{part}</span>
                          })}
                        </p>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions 섹션 */}
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-10">Challenges & Solutions</h2>

          {/* Challenges & Solutions Grid */}
          <div className="space-y-12">
            {project.challengesAndSolutions.map((item, i) => (
              <div key={i} className="space-y-6">
                {/* Challenge Title */}
                <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>

                {/* Single Box with 4 sections */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 space-y-6">
                  {/* Problem */}
                  {item.problem && (
                    <div className="space-y-2">
                      <div className="inline-block px-4 py-1.5 rounded-md bg-red-100 text-red-700 text-sm font-semibold">
                        Problem
                      </div>
                      <p className="text-base leading-relaxed text-gray-700 ml-2" style={{ lineHeight: "1.9" }}>
                        {item.problem.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={idx}>{part.slice(2, -2)}</strong>
                          }
                          return <span key={idx}>{part}</span>
                        })}
                      </p>
                    </div>
                  )}

                  {/* Cause */}
                  {/* {item.analysis && (
                    <div className="space-y-2">
                      <div className="inline-block px-4 py-1.5 rounded-md bg-orange-100 text-orange-700 text-sm font-semibold">
                        Cause
                      </div>
                      <p className="text-base leading-relaxed text-gray-700 ml-2" style={{ lineHeight: "1.9" }}>
                        {item.analysis.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={idx}>{part.slice(2, -2)}</strong>
                          }
                          return <span key={idx}>{part}</span>
                        })}
                      </p>
                    </div>
                  )} */}
                  {item.analysis && (
                    <div className="space-y-2">
                      <div className="inline-block px-4 py-1.5 rounded-md bg-orange-100 text-orange-700 text-sm font-semibold">
                        Cause
                      </div>
                      <div className="text-base leading-relaxed text-gray-700 ml-2" style={{ lineHeight: "1.9" }}>
                        {item.analysis
                          .split(/(?<=\.)\s+/) // 마침표 뒤 공백 기준으로 분리
                          .map((sentence, idx) => (
                            <p key={idx}>{sentence}</p>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Solution */}
                  {item.solution && (
                    <div className="space-y-2">
                      <div className="inline-block px-4 py-1.5 rounded-md bg-blue-100 text-blue-700 text-sm font-semibold">
                        Solution
                      </div>
                      <p className="text-base leading-relaxed text-gray-700 ml-2" style={{ lineHeight: "1.9" }}>
                        {item.solution.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={idx}>{part.slice(2, -2)}</strong>
                          }
                          return <span key={idx}>{part}</span>
                        })}
                      </p>
                    </div>
                  )}

                  {/* Result */}
                  {item.result && (
                    <div className="space-y-2">
                      <div className="inline-block px-4 py-1.5 rounded-md bg-green-100 text-green-700 text-sm font-semibold">
                        Result
                      </div>
                      <p className="text-base leading-relaxed text-gray-700 ml-2" style={{ lineHeight: "1.9" }}>
                        {item.result.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={idx}>{part.slice(2, -2)}</strong>
                          }
                          return <span key={idx}>{part}</span>
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes 섹션 */}
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Outcomes</h2>
          <div className="space-y-4">
            {project.outcomes.map((outcome, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 overflow-x-auto"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-base border-2"
                  style={{ borderColor: project.color, color: project.color }}
                >
                  {getOutcomeIcon(outcome, i)}
                </div>
                <p className="text-base font-medium text-foreground whitespace-nowrap">
                  {outcome.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={idx}>{part.slice(2, -2)}</strong>
                    }
                    return <span key={idx}>{part}</span>
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Learned 섹션 */}
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">What I Learned</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border bg-muted/30">
              <div className="flex items-center gap-2 mb-3 text-rose-500 font-semibold text-sm">
                <span>아쉬웠던 부분</span>
              </div>
              <p className="text-base leading-relaxed text-foreground/90" style={{ lineHeight: "1.8" }}>
                {project.learned.drawback.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={idx}>{part.slice(2, -2)}</strong>
                  }
                  return <span key={idx}>{part}</span>
                })}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-muted/30">
              <div className="flex items-center gap-2 mb-3 text-emerald-500 font-semibold text-sm">
                <span>깨달은 점</span>
              </div>
              <p className="text-base leading-relaxed text-foreground/90" style={{ lineHeight: "1.8" }}>
                {project.learned.insight.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={idx}>{part.slice(2, -2)}</strong>
                  }
                  return <span key={idx}>{part}</span>
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 다른 프로젝트 보기 */}
      <section className="px-4 md:px-6 py-12 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">다른 프로젝트도 살펴보세요</h2>
          <button
            onClick={() => router.push("/#projects")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium transition-all duration-300 hover:scale-105"
          >
            <span>모든 프로젝트 보기</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  )
}
