# Responsive Work Order

## Goal

이 프로젝트는 `Desktop / Tablet / Mobile` 3가지 반응형 기준으로 메인 화면을 구현하는 것을 우선 목표로 합니다.

작업은 `공통 토대 → 공통 컴포넌트 → 페이지 조립 → 반응형 보정` 순서로 진행합니다.

## Recommended Order

### 1. Base 정리

먼저 스타일의 기준이 되는 공통 토대를 정리합니다.

- `css/base/reset.css`
- `css/base/typography.css`

작업 항목:

- 브라우저 기본 스타일 초기화
- `box-sizing`, `img`, `button`, `a` 기본 규칙
- 기본 폰트, 제목, 본문 스타일 정의
- 컬러, spacing, radius 등 공통 변수 정리
- 반응형 breakpoint 기준 정의

### 2. Layout 작업

페이지 전체 구조와 공통 레이아웃을 먼저 잡습니다.

- `css/layout/container.css`
- `css/layout/header.css`

작업 항목:

- 공통 `container` 폭 정의
- 섹션 간 여백 규칙
- 헤더 구조 및 네비게이션 정렬
- Desktop / Tablet / Mobile에서의 폭 변화 기준

### 3. Components 제작

마지막 시안에 정리된 컴포넌트들을 먼저 코드화합니다.

추천 우선순위:

1. 버튼
2. 서비스 카드
3. 뉴스 카드
4. FAQ 아코디언
5. 배너
6. 로고 아이템

관련 파일:

- `css/components/button.css`
- `css/components/card.css`

필요하면 컴포넌트 파일을 추가로 분리해도 됩니다.

### 4. Page Structure 작성

페이지 마크업을 조립합니다.

- `html/index.html`

추천 섹션 순서:

1. 헤더
2. 메인 비주얼
3. 서비스 카드 섹션
4. 배너 섹션
5. 상세 콘텐츠 섹션
6. 고객사 로고 섹션
7. 보안/인증 섹션
8. FAQ 섹션
9. 뉴스 섹션
10. CTA 배너
11. 푸터

### 5. Page Style 적용

공통 컴포넌트를 조립한 뒤, 페이지 전용 스타일을 작성합니다.

- `css/pages/home.css`

작업 항목:

- 섹션 배치
- 섹션별 배경
- 섹션 내부 grid
- 섹션 간 여백 조정

페이지 전용 스타일에서는 공통 컴포넌트 자체를 다시 정의하지 않고, 배치 중심으로 작성하는 것을 권장합니다.

### 6. JavaScript 최소 적용

동작이 필요한 부분만 최소한으로 붙입니다.

- `js/main.js`
- `js/modules/header.js`
- `js/pages/home.js`

우선 대상:

- 모바일 메뉴 토글
- FAQ 아코디언
- 슬라이더가 필요하면 해당 영역만 적용

## Responsive Rule

반응형은 한 번에 전체를 처리하지 말고, 섹션 단위로 마감합니다.

권장 순서:

1. Desktop 완성
2. Tablet 보정
3. Mobile 보정
4. 전체 재점검

권장 breakpoint 예시:

- Desktop: `1920px` 기준
- Tablet: `1024px` 전후
- Mobile: `375px ~ 430px` 전후

## Practical Checklist

### Step 1

- `reset.css` 작성
- `typography.css` 작성

### Step 2

- `container.css` 작성
- `header.css` 작성

### Step 3

- 버튼 컴포넌트
- 카드 컴포넌트
- FAQ 컴포넌트
- 배너 컴포넌트

### Step 4

- `index.html` 기본 구조 작성
- 홈 주요 섹션 마크업 구성

### Step 5

- `home.css`로 섹션 조립
- Desktop 기준 화면 완성

### Step 6

- Tablet 레이아웃 보정
- Mobile 레이아웃 보정

### Step 7

- 인터랙션 연결
- 간격 및 타이포 최종 점검
- 중복 스타일 정리

## Summary

이 프로젝트는 아래 순서로 진행하는 것이 가장 효율적입니다.

`Base → Layout → Components → Page Structure → Page Style → Responsive → Final QA`
