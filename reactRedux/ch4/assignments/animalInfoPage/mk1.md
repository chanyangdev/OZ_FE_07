# 동물 정보 사이트

## 메인 페이지에서 동물 목록 화면에 표시하기

### 1. 라우팅 정의 및 라우팅 생성 방법

사용자가 요청한 URL에 따라, 페이지를 화면에 보여주는 것을 `routing`이라고 한다.

- 컴포넌트 기반 라우팅 library `react router`을 사용하여 동물 정보 사이트 화면 구현
- 직관적으로 라우트 정의 `BrowserRouter`을 이용

### 2. 페이지 별 라우팅 과정

1. index.jsx or main.jsx에서 App Component를 BrowserRouter Component로 감싼다.

```js
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

2. App component에서 route and route을 감싸는 routes 컴포넌트를 생성

```js
import Search from "./components/Search";
import Main from "./components/Main";
import Detail from "./components/Detail";

function App() {
  return (
    <>
      <header>
        <h1>💚 동물 조아 💚</h1>
      </header>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
      <footer>all rights reserved to OZ</footer>
    </>
  );
}

export default App;
```

### 🗝️ key words

> Routes component
> 라우트를 정의하는 컴포넌트, 자식 컴포넌트 (Route) 중에서 매칭되는 첫 번쨰 요소만 렌더링한다
> Route component
> 항상 Routes 컴포넌트 내부에 위치, 경로 (`path`)와 매칭될 component (`element`)를 지정

### 3. 메인 페이지를 구현하는 Main component에서 data.js파일 내 데이터를 렌더링

```js
export default function Main() {
  return (
    <Wrapper>
      {data.map((el) => {
        const { id, name, img, description } = el;
        return (
          <Link to={`/detail/${id}`} key={id}>
            <Card>
              <Image src={img} alt={name} />
              <p>동물 이름 : {name}</p>
              <p>설명 : {description}</p>
            </Card>
          </Link>
        );
      })}
    </Wrapper>
  );
}
```

Link component을 이용하여 동물 카드 클릭시, 특정 경로로 이동할 수 있다록, 동물의 `id`를 동적으로 반영하여 `/detail/id`형식으로 경로를 설정.
`Route path="/detail/id" element={<DetailPage />}/>`

> 🔗 Link Component

- 다른 페이지로 이동하는 링크 기능을 제공하는 component
- HTML `<a>` tag와 동일한 기능을 하지만, 페이지 새로고침을 안한다. 페이지 새로고침 없이, history API를 통해 브라우저의 주소의 경로만 바꾸는 기능을 제공.
