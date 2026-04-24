# component-workshop

## 목적 및 컨텍스트

이 레포는 뱅카우 디자인 시스템의 컴포넌트를 피그마에서 tsx로 변환하고,
쇼케이스 사이트에서 시각적으로 검증하는 곳이다.

**작업 흐름:**
1. 피그마 컴포넌트 링크를 받는다
2. Figma MCP로 디자인을 분석한다
3. tsx로 구현한다
4. 쇼케이스 사이트에 추가해서 모든 variant를 시각적으로 확인한다
5. 검증 완료된 tsx는 prototype-template 레포의 `src/components/`로 복붙한다

**사용자:** 뱅카우 프로덕트 디자이너.
디자인 시스템을 기반으로 컴포넌트를 코드로 구현하고 검증하는 것이 목적이다.

---

## 기술 스택

- **프레임워크**: React + Vite + TypeScript
- **스타일링**: Tailwind CSS + CSS 변수 (tokens.css)
- **폰트**: Pretendard (src/styles/fonts.css에서 CDN 로드)
- **배포**: Vercel

---

## 핵심 원칙

- 퀄리티 우선. 이동 편의성보다 완성도가 중요하다.
- 피그마 디자인과 픽셀 수준으로 동일하게 구현한다.
- Figma MCP로 디자인을 분석하고 코드를 직접 작성한다.
- tsx 파일 하나에 모두 담는다. 외부 ts 유틸 파일 분리 금지.
- 외부 패키지 최소화. framer-motion 대신 CSS transition, Lottie 대신 CSS 애니메이션.
- 색상은 반드시 `src/styles/tokens.css`의 CSS 변수를 사용한다. (`var(--color-primary-600)`)
- 폰트는 Pretendard만 사용한다.

---

## 컴포넌트 제작 워크플로우

### Step 1. 피그마 링크 전달 (1개씩)
- 반드시 1개 컴포넌트씩 전달한다.
- 컴포넌트 선택 → 우클릭 → Copy link to selection

### Step 2. 분석 + 역질문
Figma MCP로 컴포넌트를 읽고 아래 항목을 파악한다.
- 컴포넌트 이름 및 역할
- variant 종류 (size, type, state 등)
- 포함된 하위 요소 (아이콘, 텍스트 등)
- 사용 토큰 (색상, 타이포, 간격)
- 인터랙션 (hover, pressed, transition 등)
- 불명확한 부분 → 역질문

### Step 3. tsx 생성
- 컴포넌트 파일 생성
- 쇼케이스 페이지에 모든 variant 렌더링

### Step 4. 확인 체크리스트

시각 동일성 (최우선)
- [ ] Figma 디자인과 픽셀 수준으로 동일한가
- [ ] 폰트(Pretendard), 크기, 굵기가 정확한가
- [ ] 색상 토큰이 올바르게 적용됐는가
- [ ] 간격, 패딩, 정렬이 Figma와 동일한가
- [ ] 모든 상태(default, disabled 등)가 정상인가

인터랙션
- [ ] Figma에 정의된 인터랙션이 모두 구현됐는가
- [ ] hover / pressed / focus 상태가 자연스러운가
- [ ] 애니메이션 / 트랜지션 타이밍이 Figma와 유사한가
- [ ] 터치 영역이 충분한가 (최소 44px)

### Step 5. prototype-template으로 이동
검증 완료 후 아래 경로로 복붙한다.

```
component-workshop                        prototype-template
src/components/{category}/{Name}.tsx  →  src/components/{category}/{Name}.tsx
```

---

## 파일 구조

```
src/
├── components/
│   ├── button/
│   │   ├── Button.tsx
│   │   └── IconButton.tsx
│   ├── control/
│   │   ├── Toggle.tsx
│   │   ├── Radio.tsx
│   │   └── Checkbox.tsx
│   └── ...
├── pages/
│   ├── button/
│   │   ├── ButtonPage.tsx
│   │   └── IconButtonPage.tsx
│   ├── control/
│   │   └── ...
│   └── ...
├── styles/
│   ├── fonts.css   ← Pretendard CDN
│   └── tokens.css  ← 색상/타이포 CSS 변수
├── App.tsx         ← 레이아웃 + 라우터 + COMPONENTS 레지스트리
├── index.css       ← Tailwind + fonts/tokens import
└── main.tsx
```

---

## 쇼케이스 사이트 구조

```
탑 네비게이션
├── 좌측: 뱅카우 로고 (public/logo-blue.svg)
└── 우측: 컴포넌트 검색창

좌측 사이드바 (카테고리 > 컴포넌트 목록)
└── Button
    ├── Button
    └── Icon Button
└── Control
    ├── Toggle
    ├── Radio
    └── Checkbox

우측 콘텐츠 영역
└── 1. 컴포넌트명 + 한 줄 설명
    2. Variant 시각화 (모든 상태 한눈에)
```

---

## 새 컴포넌트 추가 시 순서

1. `src/components/{category}/{Name}.tsx` 생성
2. `src/pages/{category}/{Name}Page.tsx` 생성
3. `src/App.tsx`의 `COMPONENTS` 배열에 항목 추가 (라우터·사이드바 자동 반영)
4. Vercel 배포 후 확인

---

## 배포

"배포해줘" 명령 시:
1. `git add .`
2. `git commit -m "update"`
3. `git push`
4. Vercel 자동 배포
