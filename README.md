# MBTiD

MBTiD는 친구들과 함께 MBTI 명함을 만들어 공유하고, 친구들과 투표를 통해 서로에 대한 인식을 비교해보는 웹 서비스입니다.

React + TypeScript 기반으로 구현되었으며, **상태 관리와 API 호출을 최적화하여 즉각적인 반응성과 불필요한 렌더링 제거에 집중했습니다.**


<table width="100%">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/b6c96f94-697a-4451-8706-d27e76e31efc" alt="screenshot 1" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/d847e49d-b837-4058-b226-208271c48d7e" alt="screenshot 2" width="100%"/></td>
  </tr>
  <tr>
     <td><img src="https://github.com/user-attachments/assets/4a926abf-a71a-4651-ba24-c9a0258a1804" alt="screenshot 3" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/f2c2e306-dacf-4c71-9c04-751002d98424" alt="screenshot 4" width="100%"/></td>
  </tr>
</table>

---

## 🚀 주요 기능

- 🧠 간단한 MBTI 검사  
- 🪪 결과 기반 명함 생성  
- 👥 친구 명함 추가 및 확인  
- 🗳️ 친구가 보는 나의 MBTI 투표 기능  
- 📊 투표 결과 통계 시각화  
- 🔗 QR 공유, 카카오톡 공유  
- 📲 PWA 설치 지원


---

## ⚙️ 기술 스택

| 분류        | 기술                        |
|-------------|-----------------------------|
| UI          | **React 18** (with Vite)    |
| 언어        | **TypeScript**              |
| 상태 관리   | **Zustand**, **React Query** |
| 스타일링    | SCSS                        |
| 배포        | Vercel                      |
| CI          | GitHub Actions              |

---

## 🧠 상태 관리 & 캐싱 전략

MBTiD는 전역 상태(Zustand)와 서버 상태(React Query)를 분리해 관리하며,  
불필요한 렌더링과 API 호출을 줄이기 위해 다음과 같은 전략을 사용했습니다:

| 항목         | 사용 도구             | 전략 요약                                      |
|--------------|------------------------|------------------------------------------------|
| 로그인 정보   | Zustand                | 전역 저장, 항상 유지                           |
| 프로필 정보   | React Query → Zustand  | staleTime: 30분, shallow 비교 후 Zustand 저장   |
| 친구 목록     | React Query            | staleTime: 30분, gcTime: 1시간                 |
| 투표 결과     | React Query            | staleTime: 0, refetchOnFocus: true             |

추가로,  
- `React.memo`를 통해 동일 props 전달 시 재렌더링 방지  
- `shallow` 비교로 상태 업데이트 여부를 선별  
- `setQueryData()`를 활용해 UX 반응성을 높임



