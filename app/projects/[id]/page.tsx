"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"

type ProjectDetail = {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  color: string
  duration: string
  myRole: string
  myContributions: {
    title: string
    percentage: number
    description: string
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
    analysis: string
    solution: string
    result: string
  }[]
  outcomes: string[]
  learned: string
  techStack: {
    name: string
    description: string
  }[]
  liveUrl: string
  githubUrl: string
}

const projectsData: ProjectDetail[] = [
  {
    id: "apilog",
    title: "APILog",
    description: "서비스 로그를 수집해 AI 리포트와 커스텀 위젯을 자동으로 생성하는 오픈소스 로그 분석 플랫폼",
    tags: ["Python", "FastAPI", "InfluxDB", "Pydantic", "OpenAI SDK", "Docker", "LLM"],
    image: "/apilog-portlet.gif",
    color: "rgb(59, 130, 246)",
    duration: "2025.10.13 - 2025.11.20 (5주)",
    myRole: "백엔드 / AI",
    myContributions: [
      {
        title: "AI 리포트 파이프라인 구축",
        percentage: 100,
        description: "FastAPI 라우터 스캔 → 응답 샘플 수집 → LLM 컨텍스트 전달 → 리포트 생성 파이프라인 설계",
      },
      {
        title: "로그 분석 위젯 개발",
        percentage: 35,
        description: "세션 기반 브라우저 통계, 페이지별 이탈률, 인기 페이지 순위 등 기본 위젯 구현",
      },
      {
        title: "AI 위젯 생성 구현",
        percentage: 35,
        description: "자연어 입력 → DB 스키마 분석 → 쿼리/위젯 스펙 자동 생성 흐름 설계",
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
          "InfluxDB 로그를 그대로 LLM에 전달하는 방식이 아닌, FastAPI 라우터를 코드 레벨에서 스캔하고 각 엔드포인트에 자동 요청 → 응답 샘플 수집 → 컨텍스트로 전달하는 파이프라인 구축",
          "리포트가 항상 동일한 구조로 반환되도록 응답 스키마를 먼저 정의하고, LLM 응답을 해당 스키마 기준으로 파싱 → 파싱 에러율 감소",
          "일부 필드가 스키마와 다르게 오더라도 전체 실패 대신 해당 항목만 목업 데이터로 보완하는 리포트를 완성하도록 구현",
        ],
      },
      {
        title: "기본 위젯 개발 및 AI 위젯 생성 기능",
        details: [
          "세션 기반 브라우저 통계 / 페이지별 이탈률 / 인기 페이지 순위 등 기본 분석 위젯 설계·구현",
          "사용자가 자연어로 원하는 통계 분석 입력 → 내부 DB 스키마와 함께 LLM에 전달 → 필요한 쿼리와 위젯 스펙(지표, 차트 타입, 축 정보 등) 자동 생성 → 대시보드에서 바로 사용 가능하도록 구현",
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
      { tech: "FastAPI ", context: "사용자 로컬 환경에서 실행되어야 하므로 경량화 및 빠른 구동 필수. Java VM 같은 무거운 환경 없이 빠르게 구동 가능" },
      { tech: "OpenAI SDK", context: " AI위젯/리포트 기능 구현 시 단순 API 호출을 넘어 AI 모모델 출력을 원하는 형태로 튜닝하거나 특정 기능을 적용하기 위해 사용" },
    ],
    challengesAndSolutions: [
      {
        title: "내장 LLM(Ollama) JSON 파싱 길이 반환 문제",
        problem:
          "로컬 내장 LLM(Ollama)로 AI 리포트 생성 시도 → 양자화 모델에서 긴 JSON 응답이 중간에 잘림 → 응답 형식 불일치로 fallback 함수로 넘어가는 상황 발생",
        analysis:
          "AI 리포트는 긴 JSON 응답과 일관된 구조가 필수. Ollama에서 안정적으로 긴 응답을 생성하려면 48GB VRAM 필요 → 일반 개발환경에서 확보 불가능",
        solution:
          "로컬 LLM 자원 한계로 단순 튜닝으로는 해결 불가 → AI 리포트 생성 엔진을 OpenAI SDK 기반으로 마이그레이션",
        result:
           "고품질 자연어 응답과 긴 보고서 생성 시 잘림 현상 없이 안정적 반환 확인",
      },
      {
        title: "AI 리포트 조회 타임아웃 및 CPU 과부하",
        problem:
          "리포트 생성 요청 시 3분 타임아웃 초과, CPU 100% 점유로 응답 실패 → fallback 로직으로 빠지며 정상 리포트 생성 불가",
        analysis:
          "InfluxDB의 path_raw가 태그가 아닌 필드로 저장 → 페이지별 필터링 시 인덱스 사용 불가 → 전체 스캔 발생. FastAPI 라우터 전체 스캔 후 모든 GET 엔드포인트에 개별 HTTP 요청 → 페이지 수 × 필드 스캔으로 부하 급증",
        solution:
          "path_raw를 필드 → 태그로 스키마 변경 → 쿼리당 full scan에서 인덱스 조회로 전환",
        result:
          "타임아웃 내 정상 응답 반환, CPU 과부하 해결, AI 리포트 생성 정상화",
      },
    ],
    outcomes: [
      "SSAFY 프로젝트 우수상(3등) 수상 (2025.11)",
      "AI 리포트 파이프라인 구축으로 안정적인 리포트 생성 달성",
      "InfluxDB 스키마 최적화로 타임아웃 및 CPU 과부하 문제 해결",
      "오픈소스 플러그인 아키텍처 설계로 프로젝트 확장성 확보",
    ],
    learned:
      "Next.js의 SSR과 SSG를 실무에서 적용하면서 각각의 장단점과 적절한 사용 사례를 깊이 이해하게 되었습니다. 특히 결제 시스템을 처음 통합하면서 보안과 에러 핸들링의 중요성을 배웠고, Webhook을 통한 비동기 이벤트 처리 패턴을 익힐 수 있었습니다. 또한 이미지 최적화가 사용자 경험에 미치는 영향이 크다는 것을 실제 데이터로 확인하며, 성능 최적화의 중요성을 체감했습니다.",
    techStack: [
      { name: "Python", description: "React 프레임워크" },
      { name: "FastAPI", description: "타입 안정성" },
      { name: "TypeScript", description: "스타일링" },
      { name: "InfluxDB", description: "결제 처리" },
      { name: "Docker", description: "상태 관리" },
      { name: "OpenAI SDK", description: "데이터베이스" },
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "ai-chat-application",
    title: "AI Chat Application",
    description: "실시간 AI 채팅 서비스",
    tags: ["Next.js", "OpenAI", "WebSocket", "PostgreSQL"],
    image: "/ai-chatbot-interface.png",
    color: "rgb(99, 102, 241)",
    duration: "2023.11 - 2024.02 (4개월)",
    myRole: "백엔드 개발자",
    myContributions: [
      {
        title: "OpenAI API 통합",
        percentage: 100,
        description: "GPT-4 모델 연동 및 스트리밍 응답 처리 구현",
      },
      {
        title: "WebSocket 실시간 통신",
        percentage: 80,
        description: "Socket.io 기반 양방향 채팅 시스템 구축",
      },
      {
        title: "대화 히스토리 관리",
        percentage: 60,
        description: "PostgreSQL 기반 대화 저장/조회 API 개발",
      },
    ],
    teamStructure: [
      { area: "Frontend", members: 2, tasks: "React 개발, WebSocket 통합" },
      { area: "Backend", members: 1, tasks: "Node.js 서버 개발, API 엔드포인트 구축" },
    ],
    implementation: [
      {
        title: "실시간 메시지 전송",
        details: ["React의 상태 관리와 WebSocket을 활용한 실시간 메시지 전송"],
      },
      {
        title: "스트리밍 응답 구현",
        details: ["OpenAI API의 스트리밍 응답을 활용한 사용자 경험 개선"],
      },
      {
        title: "대화 히스토리 캐싱",
        details: ["Redis를 활용한 대화 히스토리 캐싱"],
      },
      {
        title: "API 비용 최적화",
        details: ["요청 큐 시스템과 토큰 카운팅으로 API 비용 최적화"],
      },
      {
        title: "AI 리포트 파이프라인 구축 및 응답 신뢰도/성능 향상",
        details: [
          "InfluxDB 로그를 그대로 LLM에 전달하는 방식이 아닌, FastAPI 라우터를 코드 레벨에서 스캔하고 각 엔드포인트에 자동 요청 → 응답 샘플 수집 → 컨텍스트로 전달하는 파이프라인 구축",
          "리포트가 항상 동일한 구조로 반환되도록 응답 스키마를 먼저 정의하고, LLM 응답을 해당 스키마 기준으로 파싱 → 파싱 에러율 감소",
          "일부 필드가 스키마와 다르게 오더라도 전체 실패 대신 해당 항목만 목업 데이터로 보완하는 리포트를 완성하도록 구현",
        ],
      },
      {
        title: "기본 위젯 개발 및 AI 위젯 생성 기능",
        details: [
          "세션 기반 브라우저 통계 / 페이지별 이탈률 / 인기 페이지 순위 등 기본 분석 위젯 설계·구현",
          "사용자가 자연어로 원하는 통계 분석 입력 → 내부 DB 스키마와 함께 LLM에 전달 → 필요한 쿼리와 위젯 스펙(지표, 차트 타입, 축 정보 등) 자동 생성 → 대시보드에서 바로 사용 가능하도록 구현",
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
      { tech: "React 18", context: "UI 프레임워크로 사용자 인터페이스 개발을 담당" },
      { tech: "Node.js", context: "백엔드 서버로 WebSocket 연결을 처리" },
      { tech: "OpenAI API", context: "AI 모델로 자연스러운 대화 구현" },
      { tech: "WebSocket", context: "실시간 메시지 전송을 위한 프로토콜 선택" },
      { tech: "Redis", context: "대화 히스토리 캐싱을 위한 빠른 데이터 저장소 사용" },
      { tech: "Express", context: "서버 프레임워크로 API 엔드포인트 구축" },
    ],
    challengesAndSolutions: [
      {
        title: "OpenAI API의 스트리밍 응답을 실시간으로 처리",
        problem: "OpenAI API의 스트리밍 응답을 실시간으로 처리하는 과정에서 데이터의 지연이나 손실이 발생했습니다.",
        analysis: "서버와 클라이언트 간의 데이터 전송이 원활하지 않아 스트리밍 응답이 지연되거나 손실되었습니다.",
        solution: "Server-Sent Events를 활용한 스트리밍 응답 구현",
        result: "평균 응답 시간이 2초 이내로 단축되었고, 사용자 경험 개선이 이루어졌습니다.",
      },
      {
        title: "긴 대화 히스토리 관리와 컨텍스트 유지",
        problem: "긴 대화 히스토리가 많아서 메모리 사용량이 증가하고, 컨텍스트가 일관되지 않았습니다.",
        analysis:
          "대화 히스토리를 메모리에 저장하면서 메모리 사용량이 증가했고, 여러 사용자 간의 컨텍스트 관리가 어려웠습니다.",
        solution: "Redis를 활용한 대화 히스토리 캐싱",
        result: "메모리 사용량이 줄었고, 사용자 간의 컨텍스트 일관성이 유지되었습니다.",
      },
      {
        title: "API 비용 최적화와 요청 제한 관리",
        problem: "API 요청이 많아 비용이 높아졌고, 요청 제한으로 인해 일부 요청이 거절되었습니다.",
        analysis: "API 요청이 많아 비용이 높아졌고, 요청 제한으로 인해 일부 요청이 거절되었습니다.",
        solution: "요청 큐 시스템과 토큰 카운팅으로 비용 최적화",
        result: "API 비용이 30% 절감되었고, 요청 제한으로 인한 거절 사례가 줄어들었습니다.",
      },
    ],
    outcomes: ["평균 응답 시간 2초 이내 달성", "API 비용 30% 절감", "사용자 만족도 4.8/5.0 달성"],
    learned:
      "WebSocket을 활용한 실시간 통신의 중요성과 OpenAI API의 스트리밍 응답을 활용한 사용자 경험 개선 방법을 배웠습니다. 또한 Redis를 활용한 데이터 캐싱 전략의 효과를 직접 경험하며 성능 최적화의 필요성을 깨달았습니다.",
    techStack: [
      { name: "Next.js", description: "프레임워크" },
      { name: "OpenAI API", description: "AI 모델" },
      { name: "WebSocket", description: "실시간 통신" },
      { name: "PostgreSQL", description: "데이터베이스" },
      { name: "TanStack Query", description: "데이터 페칭" },
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "task-management-tool",
    title: "Task Management Tool",
    description: "팀 협업을 위한 프로젝트 관리 도구",
    image: "/project-management-dashboard.png",
    tags: ["Vue.js", "Express", "MySQL", "Docker"],
    color: "rgb(139, 92, 246)",
    duration: "2023.07 - 2023.10 (4개월)",
    myRole: "프론트엔드 개발자",
    myContributions: [
      {
        title: "칸반 보드 UI 구현",
        percentage: 100,
        description: "Drag & Drop 기반 태스크 이동 및 상태 관리 시스템 개발",
      },
      {
        title: "실시간 협업 기능",
        percentage: 70,
        description: "WebSocket 기반 멀티 유저 동시 편집 기능 구현",
      },
      {
        title: "알림 시스템",
        percentage: 50,
        description: "태스크 할당/변경 시 실시간 알림 UI 개발",
      },
    ],
    teamStructure: [{ area: "Frontend", members: 2, tasks: "Vue.js 개발, WebSocket 통합" }],
    implementation: [
      {
        title: "UI 개발",
        details: ["Vue.js를 활용한 UI 개발"],
      },
      {
        title: "백엔드 서버 개발",
        details: ["Express를 활용한 백엔드 서버 개발"],
      },
      {
        title: "데이터베이스 구축",
        details: ["MySQL 기반 데이터베이스 구축"],
      },
      {
        title: "컨테이너화 배포",
        details: ["Docker를 활용한 컨테이너화 배포"],
      },
      {
        title: "AI 리포트 파이프라인 구축 및 응답 신뢰도/성능 향상",
        details: [
          "InfluxDB 로그를 그대로 LLM에 전달하는 방식이 아닌, FastAPI 라우터를 코드 레벨에서 스캔하고 각 엔드포인트에 자동 요청 → 응답 샘플 수집 → 컨텍스트로 전달하는 파이프라인 구축",
          "리포트가 항상 동일한 구조로 반환되도록 응답 스키마를 먼저 정의하고, LLM 응답을 해당 스키마 기준으로 파싱 → 파싱 에러율 감소",
          "일부 필드가 스키마와 다르게 오더라도 전체 실패 대신 해당 항목만 목업 데이터로 보완하는 리포트를 완성하도록 구현",
        ],
      },
      {
        title: "기본 위젯 개발 및 AI 위젯 생성 기능",
        details: [
          "세션 기반 브라우저 통계 / 페이지별 이탈률 / 인기 페이지 순위 등 기본 분석 위젯 설계·구현",
          "사용자가 자연어로 원하는 통계 분석 입력 → 내부 DB 스키마와 함께 LLM에 전달 → 필요한 쿼리와 위젯 스펙(지표, 차트 타입, 축 정보 등) 자동 생성 → 대시보드에서 바로 사용 가능하도록 구현",
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
      { tech: "Vue.js", context: "UI 프레임워크로 사용자 인터페이스 개발을 담당" },
      { tech: "Express", context: "백엔드 서버로 API 엔드포인트 구축" },
      { tech: "MySQL", context: "데이터베이스로 관계형 데이터를 저장 및 관리" },
      { tech: "Docker", context: "컨테이너화로 배포 및 확장성을 높임" },
    ],
    challengesAndSolutions: [
      {
        title: "Vue.js와 WebSocket 통합",
        problem: "Vue.js와 WebSocket을 통합하는 과정에서 실시간 데이터 업데이트가 제대로 이루어지지 않았습니다.",
        analysis:
          "Vue.js의 반응성 시스템과 WebSocket의 이벤트 처리 방식이 맞지 않아 데이터 업데이트가 지연되거나 누락되었습니다.",
        solution: "Vue.js의 컴포넌트와 WebSocket을 활용한 실시간 데이터 업데이트 구현",
        result: "실시간 업데이트 지연 시간이 100ms 이하로 단축되었고, 데이터 누락 사례가 줄어들었습니다.",
      },
      {
        title: "실시간 협업 기능의 동시 편집 처리",
        problem: "실시간 협업 기능에서 여러 사용자가 동시에 편집할 때 데이터 충돌이 발생했습니다.",
        analysis: "WebSocket을 활용한 실시간 데이터 전송 시 데이터 충돌 방지 로직이 부족했습니다.",
        solution: "WebSocket을 활용한 멀티 유저 동시 편집 기능 구현",
        result: "데이터 충돌 사례가 0건으로 감소했고, 사용자 협업 효율성이 향상되었습니다.",
      },
      {
        title: "알림 시스템의 UI 개발",
        problem: "알림 시스템의 UI 개발 과정에서 사용자에게 명확한 피드백이 제공되지 않았습니다.",
        analysis: "알림 시스템의 UI가 부족해 사용자에게 명확한 피드백이 제공되지 않았습니다.",
        solution: "Vue.js를 활용한 실시간 알림 UI 개발",
        result: "알림 시스템의 UI가 개선되어 사용자에게 명확한 피드백이 제공되었습니다.",
      },
    ],
    outcomes: [
      "실시간 업데이트 지연 시간 100ms 이하",
      "태스크 이동 및 상태 변경 시 실시간 알림 제공",
      "월간 활성 사용자 5,000명 달성",
    ],
    learned:
      "Vue.js와 WebSocket을 활용한 실시간 애플리케이션 개발 방법을 배웠습니다. 또한 실시간 협업 기능의 복잡성과 알림 시스템의 중요성을 이해하게 되었습니다.",
    techStack: [
      { name: "Vue.js", description: "UI 프레임워크" },
      { name: "Express", description: "백엔드 서버" },
      { name: "MySQL", description: "데이터베이스" },
      { name: "Docker", description: "컨테이너화" },
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "healthcare-monitoring",
    title: "Healthcare Monitoring System",
    description: "환자 건강 데이터 실시간 모니터링",
    image: "/healthcare-dashboard.png",
    tags: ["React", "Python", "TensorFlow", "Redis"],
    color: "rgb(34, 197, 94)",
    duration: "2023.03 - 2023.06 (4개월)",
    myRole: "백엔드 / AI 개발자",
    myContributions: [
      {
        title: "데이터 수집 파이프라인",
        percentage: 100,
        description: "IoT 센서 데이터 수집 및 Redis 기반 실시간 처리 시스템 구축",
      },
      {
        title: "이상 탐지 모델 개발",
        percentage: 80,
        description: "TensorFlow 기반 환자 상태 이상 탐지 ML 모델 개발 및 배포",
      },
      {
        title: "REST API 개발",
        percentage: 90,
        description: "Flask 기반 데이터 조회/분석 API 구현",
      },
    ],
    teamStructure: [
      { area: "Frontend", members: 2, tasks: "React 개발, WebSocket 통합" },
      { area: "Backend", members: 2, tasks: "Python 서버 개발, ML 모델 개발" },
      { area: "AI", members: 1, tasks: "TensorFlow 모델 개발 및 배포" },
    ],
    implementation: [
      {
        title: "UI 개발",
        details: ["React를 활용한 UI 개발"],
      },
      {
        title: "백엔드 서버 개발",
        details: ["Python Flask를 활용한 백엔드 서버 개발"],
      },
      {
        title: "AI 모델 개발 및 배포",
        details: ["TensorFlow를 활용한 AI 모델 개발 및 배포"],
      },
      {
        title: "실시간 데이터 처리 시스템 구축",
        details: ["Redis를 활용한 실시간 데이터 처리 시스템 구축"],
      },
      {
        title: "AI 리포트 파이프라인 구축 및 응답 신뢰도/성능 향상",
        details: [
          "InfluxDB 로그를 그대로 LLM에 전달하는 방식이 아닌, FastAPI 라우터를 코드 레벨에서 스캔하고 각 엔드포인트에 자동 요청 → 응답 샘플 수집 → 컨텍스트로 전달하는 파이프라인 구축",
          "리포트가 항상 동일한 구조로 반환되도록 응답 스키마를 먼저 정의하고, LLM 응답을 해당 스키마 기준으로 파싱 → 파싱 에러율 감소",
          "일부 필드가 스키마와 다르게 오더라도 전체 실패 대신 해당 항목만 목업 데이터로 보완하는 리포트를 완성하도록 구현",
        ],
      },
      {
        title: "기본 위젯 개발 및 AI 위젯 생성 기능",
        details: [
          "세션 기반 브라우저 통계 / 페이지별 이탈률 / 인기 페이지 순위 등 기본 분석 위젯 설계·구현",
          "사용자가 자연어로 원하는 통계 분석 입력 → 내부 DB 스키마와 함께 LLM에 전달 → 필요한 쿼리와 위젯 스펙(지표, 차트 타입, 축 정보 등) 자동 생성 → 대시보드에서 바로 사용 가능하도록 구현",
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
      { tech: "React", context: "UI 프레임워크로 사용자 인터페이스 개발을 담당" },
      { tech: "Python Flask", context: "백엔드 서버로 API 엔드포인트 구축" },
      { tech: "TensorFlow", context: "AI 모델로 환자 상태 이상 탐지 구현" },
      { tech: "Redis", context: "실시간 데이터 처리를 위한 빠른 데이터 저장소 사용" },
    ],
    challengesAndSolutions: [
      {
        title: "IoT 센서 데이터 수집 및 처리",
        problem: "IoT 센서 데이터를 수집하고 실시간으로 처리하는 과정에서 데이터 손실이나 지연이 발생했습니다.",
        analysis: "데이터 수집 및 처리 로직이 부족해 데이터 손실이나 지연이 발생했습니다.",
        solution: "Redis를 활용한 실시간 데이터 처리 시스템 구축",
        result: "실시간 데이터 처리 지연 시간이 50ms 이하로 단축되었고, 데이터 손실 사례가 줄어들었습니다.",
      },
      {
        title: "TensorFlow 모델의 개발 및 배포",
        problem: "TensorFlow 모델의 개발 및 배포 과정에서 모델의 정확도와 성능이 저하되었습니다.",
        analysis: "모델 개발 및 배포 로직이 부족해 모델의 정확도와 성능이 저하되었습니다.",
        solution: "TensorFlow를 활용한 AI 모델 개발 및 배포",
        result: "이상 탐지 모델 정확도가 95% 이상으로 향상되었고, 모델의 성능이 개선되었습니다.",
      },
      {
        title: "REST API의 성능 최적화",
        problem: "REST API의 성능이 저하되어 데이터 조회/분석 속도가 느려졌습니다.",
        analysis: "API 구현 로직이 부족해 성능이 저하되었습니다.",
        solution: "Flask를 활용한 효율적인 API 구현",
        result: "REST API의 성능이 개선되어 데이터 조회/분석 속도가 향상되었습니다.",
      },
    ],
    outcomes: [
      "실시간 데이터 처리 지연 시간 50ms 이하",
      "이상 탐지 모델 정확도 95% 이상",
      "월간 활성 사용자 3,000명 달성",
    ],
    learned:
      "IoT 센서 데이터 처리와 TensorFlow 기반 AI 모델 개발 방법을 배웠습니다. 또한 Flask를 활용한 REST API 개발의 효율성과 Redis의 성능을 직접 경험하며 데이터 처리의 중요성을 깨달았습니다.",
    techStack: [
      { name: "React", description: "UI 프레임워크" },
      { name: "Python Flask", description: "백엔드 서버" },
      { name: "TensorFlow", description: "AI 모델" },
      { name: "Redis", description: "캐싱" },
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border hover:bg-muted transition-colors duration-300"
              >
                <span className="font-medium text-sm">{tech.name}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{tech.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Overview</h2>
          <p className="text-base leading-relaxed text-foreground/90" style={{ lineHeight: "1.8" }}>
            {project.description}
          </p>
        </div>
      </section>

      {/* Problem 섹션 */}
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Problem</h2>
          <p className="text-base leading-relaxed text-foreground/90" style={{ lineHeight: "1.8" }}>
            {project.description}
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
            <h3 className="text-2xl font-bold mb-4">Team Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.teamStructure.map((team, i) => (
                <div key={i} className="p-5 rounded-xl border border-border bg-muted/30">
                  <div className="flex items-baseline gap-3 mb-3">
                    <h4 className="text-xl font-bold">{team.area}</h4>
                    <span className="text-sm text-muted-foreground">({team.members}명)</span>
                  </div>
                  <p className="text-base leading-relaxed text-foreground/80">{team.tasks}</p>
                </div>
              ))}
            </div>
          </div>

          {/* My Contribution */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">My Contribution</h3>
            <div className="space-y-6">
              {project.myContributions.map((contribution, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold">{contribution.title}</h4>
                    <span className="text-sm font-semibold text-primary flex-shrink-0">
                      ({contribution.percentage}%)
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${contribution.percentage}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-base text-foreground/80 leading-relaxed">{contribution.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Details */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Implementation Details</h3>
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
                          {detail}
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
                <div key={i} className="p-4 rounded-lg border border-border bg-muted/30">
                  <h4 className="font-bold text-base mb-1" style={{ color: project.color }}>
                    {item.tech}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ lineHeight: "1.7" }}>
                    {item.context}
                  </p>
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
                  <div className="space-y-2">
                    <div className="inline-block px-4 py-1.5 rounded-md bg-red-100 text-red-700 text-sm font-semibold">
                      Problem
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700" style={{ lineHeight: "1.8" }}>
                      {item.problem}
                    </p>
                  </div>

                  {/* Cause */}
                  <div className="space-y-2">
                    <div className="inline-block px-4 py-1.5 rounded-md bg-orange-100 text-orange-700 text-sm font-semibold">
                      Cause
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700" style={{ lineHeight: "1.8" }}>
                      {item.analysis}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2">
                    <div className="inline-block px-4 py-1.5 rounded-md bg-blue-100 text-blue-700 text-sm font-semibold">
                      Solution
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700" style={{ lineHeight: "1.8" }}>
                      {item.solution}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="space-y-2">
                    <div className="inline-block px-4 py-1.5 rounded-md bg-green-100 text-green-700 text-sm font-semibold">
                      Result
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700" style={{ lineHeight: "1.8" }}>
                      {item.result}
                    </p>
                  </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.outcomes.map((outcome, i) => (
              <div key={i} className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2"
                    style={{ borderColor: project.color, color: project.color }}
                  >
                    {i === 0 && "📈"}
                    {i === 1 && "✨"}
                    {i === 2 && "🎯"}
                    {i === 3 && "⚡"}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ lineHeight: "1.75" }}>
                    {outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Learned 섹션 */}
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">What I Learned</h2>
          <p className="text-base leading-relaxed text-foreground/90" style={{ lineHeight: "1.8" }}>
            {project.learned}
          </p>
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
