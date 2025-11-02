# weatherApp
OpenWeatherMap API를 활용한 날씨 조회 애플리케이션

## 프로젝트 목적

#### 학습 목표
1. **API 사용 방법 복습**
  - RESTful API 호출 및 데이터 처리
  - 비동기 처리(async/await) 패턴 학습
2. **API 모듈화를 통한 확장성 확보**
  - API 로직과 UI 로직의 분리
  - 재사용 가능한 API 함수 작성
  - 실무 코드 패턴 학습 및 적용

## 기술 스택
- **FrontEnd**: React, Vite
- **Styling**: Tailwind CSS
- **API**: OpenWeatherMap API
- **상태 관리**: React Hooks (useState, useEffect)

## 프로젝트 구조
```
weather-app/
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── WeatherBox.jsx
│   │   │   └── WeatherButtons.jsx
│   │   └── services/
│   │       ├── api.js          # API 함수 모듈화
│   │       └── https.js        # API URL 관리
│   ├── App.jsx
│   └── index.css
├── .env                         # API 키 보관
├── tailwind.config.cjs
├── postcss.config.cjs
└── package.json
```

## 주요 기능

- **현재 위치 기반 날씨 조회**: Geolocation API 활용
- **도시별 날씨 조회**: Hamburg, New York, Tokyo(및 원하는 도시 추가 가능)
- **실시간 날씨 정보**: 온도, 날씨 상태, 도시명
- **로딩 상태 관리**: 사용자 경험 개선

## 주요 학습 내용

### 1. API 함수 분리

**Before (App.jsx에 모든 로직 포함)**
```javascript
async function getWeatherByCurrentLocation(lat, lon) {
  const url = `https://api.openweathermap.org/...`;
  const response = await fetch(url);
  const data = await response.json();
  setWeather(data);
}
```

**After (API 로직 분리)**
```javascript
// api.js - 재사용 가능한 API 함수
import { WEATHER_URL } from "./https.js";

export const weatherAPI = {
  // 현재 위치 기반 날씨 API 호출
  getWeatherByCurrentLocation: async (lat, lon) => {
    const url = WEATHER_URL.byCurrentLocation(lat, lon);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("날씨 정보를 불러오는데 실패했습니다.");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

// App.jsx - UI 로직에만 집중
const data = await weatherAPI.getWeatherByCurrentLocation(lat, lon);
setWeather(data);
```

**장점:**
- ✅ 재사용성: 다른 컴포넌트에서도 동일한 API 함수 사용 가능
- ✅ 유지보수성: API URL이나 로직 변경 시 한 곳만 수정
- ✅ 테스트 용이성: API 함수를 독립적으로 테스트 가능
- ✅ 관심사 분리: 컴포넌트는 UI에만 집중

### 2. 환경 변수를 통한 API 키 관리

**.env 파일**
```bash
VITE_API_KEY=your_api_key_here
```

**사용 방법**
```javascript
const API_KEY = import.meta.env.VITE_API_KEY;
```

**보안 고려사항**
- 클라이언트 측 환경 변수는 완전히 안전하지 않음
- 민감한 정보는 백엔드에서 처리하는 것이 권장됨
- '.gitignore'에 '.env' 추가하여 Git에 업로드 방지

### 3. Props를 통한 상태 관리

```javascript
// App.jsx - 상태를 최상위에서 관리
const [city, setCity] = useState("");
const [selectedCity, setSelectedCity] = useState(null);

// WeatherButtons.jsx - 전달받은 Prop을 onClick 이벤트로 바로 반영
<button
  className={`${
  selectedCity === null ? "bg-blue-500" : "bg-blue-100"
  } hover:bg-blue-500`}
  onClick={() => {
  setCity(""), setSelectedCity("");
  }}
>
```

**패턴**
- 상태는 상위 컴포넌트에서 관리 (Lifting State Up)
- 하위 컴포넌트는 Props로 데이터와 함수를 전달받음
- 단방향 데이터 흐름 유지

## 트러블 슈팅

### Issue 1: `module is not defined` 에러
**원인**: `package.json`에 `"type": "module"` 설정으로 인해 CommonJS 구문 사용 불가

**해결**: 파일 확장자를 `.cjs`로 변경
```bash
mv postcss.config.js postcss.config.cjs
mv tailwind.config.js tailwind.config.cjs
```

### Issue 2: Tailwind CSS v4 호환성 문제
**원인**: Tailwind CSS v4의 PostCSS 플러그인 분리

**해결**: Tailwind v3로 다운그레이드
```bash
npm uninstall tailwindcss
npm install -D tailwindcss@3
```

### Issue 3: 비동기 위치 정보 처리
**원인**: `getCurrentLocation()`이 비동기인데 State 업데이트 전에 API 호출

**해결**: Promise로 geolocation을 async/await으로 변환
```javascript
const position = await new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject);
});

const lat = position.coords.latitude;
const lon = position.coords.longitude;
```

## 배운 점
1. **API 모듈화의 중요성**
  - 코드 재사용성과 유지보수성이 크게 향상됨
  - 관심사의 분리로 각 파일의 역할이 명확해짐

2. **비동기 처리 패턴**
  - Promise와 async/await을 적절히 활용

3. **환경 변수 관리**
  - API 키와 같은 민감한 정보를 안전한 관리 방법
  - 클라이언트 측 보안의 한계 이해

4. **React 상태 관리**
  - Props drilling을 통한 상태 전달
  - 상위 컴포넌트에서의 상태 중앙 관리

## 향후 개선 사항

- Context API 또는 상태 관리 라이브러리 도입
- 에러 상태 UI 추가
- 반응형 디자인 개선

📚 참고 자료

OpenWeatherMap API Documentation
React Documentation
Vite Documentation
Tailwind CSS Documentation


만든 날짜: 2025년 10월
학습 목적: API 사용법 및 모듈화 패턴 학습




