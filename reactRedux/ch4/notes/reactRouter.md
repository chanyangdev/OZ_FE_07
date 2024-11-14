# React Router
> React에서 **SPA 방식**으로 **라우팅** 할 수 있게 해주는 라이브러리

웹개발에서 라우팅이란 : 
**요청 주소**에 맞는 **화면**을 보여주는 것

*라우팅을 SPA방식으로 할수 있게 해준다는것?*
SPA :
single page application
(CSR, client side rendering)
![spa screenshot](../images/Screenshot%202024-11-14%20at%2011.31.06 AM.png)

MPA : 
multipage application
(SSR, server side rendering)
페이지 전환 시 **플리커(Flicker)** 현상 발생!
![mpa screenshot](../images/Screenshot%202024-11-14%20at%2011.29.52 AM.png)

## 사용방법 알아보자!
설치~
`npm i react-router-dom`

### 주요 컴포넌트
- `<BrowserRouter>`
React Router를 사용하고 싶은 곳을 `<BrowserRouter>`컴포넌트로 감싼다 => `<App>`컴포넌트를 감싸버리면 **어디서든** 사용 가능!
![main.jsx picture](../images/Screenshot%202024-11-14%20at%2011.37.19 AM.png)
- `<Link>`
`<Link>`컴포넌트와 `to` 속성을 사용해서 이동하고 싶은 주소로 이동할 수 있다 => 이떄 `<Link>`component는 `<a>`요소로 표시되지만 새로고침은 발생하지 않고 **주소만 변경**된다!
![link component picture](../images/Screenshot%202024-11-14%20at%2011.41.11 AM.png)
- `<Routes>`
- `<Route>`
`<Routes>`컴포넌트는 `<Route>`컴포넌트들을 **묶어주는** 역할
`<Route>`컴포넌트는 **특정 주소**에서 **어떤 컴포넌트**를 보여줄지 정해주는 역할
![라우트 사진](../images/Screenshot%202024-11-14%20at%2011.43.11 AM.png)

## 주요 components 정리!
![overall pic](../images/Screenshot%202024-11-14%20at%2011.43.55 AM.png)

### 실습
App.jsx
```js
import { Link } from "react-router-dom";

function App() {
  return (
    <>
    <div>
    <Link to="/main">메인</Link>
    <Link to="/mypage">마이페이지</Link>
    <Link to="/test">테스트</Link>
    </div>
    <Routes>
      <Route path="/main" element={<div>메인 페이지</div>} />
      <Route path="/mypage" element={<div>마이 페이지</div> }/>
      <Route path="/test" element={<div>테스트 페이지</div> }/>
    </Routes>
    </>
  );
}
```
## React Route 주요 함수
- `useNavigate()`
특정 **주소**로 **이동**할 수 있게 해주는 **함수**를 생성
`const navigate = useNavigate()`
`navigate(/main)` /main으로 이동
`navigate(1)` 앞으로 가기
`navigate(-1)` 뒤로 가기
- `useLocation()`
현재 **페이지의 위치 정보**를 담고있는 **객체**를 생성
`const location = useLocation()`
`location.pathname` 현재 경로면
`location.search` 쿼리 문자열
- `useParams()`
주소의 `쿼리 파라미터 값`을 담은 `객체` 생성
`const params = useParams()`
`params.param1` param1이라는 이름으로 들어온 값
`params.name` name이라는 이름으로 들어온 값
- `useSearchParams()`
주소의 **쿼리 스트링 값**을 가져올 수 있는 **객체**와 쿼리 스트링을 **수정**할 수 있는 **함수** 생성
`const [searchParams, setSearchParams] = useSearchParams()`
`searchParams.get('name)` name으로 들어온 쿼리 스트링
`setSearchParams({name: 'Chanyang'})` name쿼리 스트링 수정

## 예시 
```js
import { Link } from "react-router-dom";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  // navigate (?)
  const useLocation()
  
  return (
    <>
      <div>
      <button onClick={() => navigate("/main")}>메인</button>
      <button onClick={() => navigate("/mypage")}>마이 페이지</button>
      <button onClick={() => navigate("/test")}>테스트</button>
      </div>
      <div>
      <button onClick={() => navigate(-1)}>{`<- 뒤로 한번 가기`}</button>
      <button onClick={() => navigate(1)}>{`앞으로 한번 가기 ->`}</button>
    </div>
    </>
  );
}
```



