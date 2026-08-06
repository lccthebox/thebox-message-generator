# 더박스 도구 모음 Design System

## 1. Atmosphere & Identity

빠르게 정확한 안내문과 계산 결과를 만드는 차분한 운영 도구다. 밝은 웜 그레이 바탕, 흰 카드, 검정 중심의 높은 정보 대비가 시그니처이며 새 기능은 기존 입력 흐름 안에서 자연스럽게 이어져야 한다.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---|---|
| Background | `--bg` | `#F5F4F0` | 페이지 배경 |
| Surface | `--surface` | `#FFFFFF` | 카드 |
| Surface secondary | `--surface2` | `#F9F8F5` | 입력, 보조 영역 |
| Border | `--border` | `#E8E5DC` | 카드와 입력 구분 |
| Text primary | `--text` | `#1A1A1A` | 결과와 본문 |
| Text secondary | `--text-2` | `#5A5A5A` | 라벨과 설명 |
| Text tertiary | `--text-3` | `#9A9A9A` | 도움말 |
| Accent | `--accent` | `#1A1A1A` | 선택과 주요 버튼 |
| Success | `--green` | `#2D7D4F` | 체크된 섹션 |
| Error | `--red` | `#C0392B` | 오류와 경고 |

색상은 기존 CSS 토큰만 사용하며 새 의미가 생기기 전에는 추가하지 않는다.

## 3. Typography

- Primary: `Noto Sans KR`, Apple/system sans-serif
- Card title: 15px / 700
- Body and controls: mobile 16px, desktop 13px / 400–600
- Form label and help: 11–12px / 600–700
- Preview: 13px / 1.75
- 한글 안내문은 의미 단위가 한 글자만 다음 줄에 남지 않도록 충분한 폭과 자연스러운 줄바꿈을 유지한다.

## 4. Spacing & Layout

- Base unit: 4px
- Compact gap: 4–8px
- Form gap: 12px
- Card padding: 16px mobile, 20–24px desktop
- Page grid: 1 column below 860px, 2 equal columns from 860px
- Content max width: 1240px
- Primary content must fit at 375px without horizontal scrolling.

## 5. Components

### Card
- Structure: header + body
- States: default
- Surface: white, border, existing subtle shadow

### Chip
- Structure: hidden radio/checkbox + visible indicator + label
- States: default, hover, checked, focus
- Accessibility: the enclosing label remains clickable; state is carried by the native input.

### Form row
- Structure: label + native input/select
- Layout: stacked on narrow screens, 120px label column from 480px
- States: default, focus, readonly, disabled
- Accessibility: labels must visibly identify each input.

### Preview
- Structure: generated plain-text message in a `pre`
- States: populated and empty guidance
- Layout: long Korean text wraps within the card.

### Conversion result
- Structure: selection inputs followed by readonly calculated outputs
- States: valid combination and manually adjusted prior payment
- Accessibility: calculated fields use explicit visible labels and remain keyboard-readable.

## 6. Motion & Interaction

- Existing 180ms transition only for interactive state feedback.
- No decorative motion.
- Date, select, and payment changes update calculated outputs and preview immediately.
- Reduced-motion users receive the same state changes without added animation.

## 7. Depth & Surface

Mixed strategy: cards use the existing subtle shadow and border; inputs use borders and tonal background shifts. No new elevation level is introduced for the conversion feature.

## 8. Accessibility Constraints & Accepted Debt

- Target: WCAG 2.2 AA.
- Native inputs and selects remain keyboard-operable.
- Focus must remain visibly indicated.
- Body text contrast must meet 4.5:1.
- Touch controls retain at least the existing control height.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| Existing emoji icons and single-file architecture | `index.html` | Predates this scoped functional addition; replacing it would broaden the request. | Address during a dedicated design/accessibility refactor. |
